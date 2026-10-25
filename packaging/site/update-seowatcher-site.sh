#!/usr/bin/env bash
set -Eeuo pipefail
umask 022

[[ $EUID -eq 0 ]] || { printf 'Run with sudo: sudo bash ./update-seowatcher-site.sh\n' >&2; exit 1; }
bundle=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)
base=/var/www/seowatcher
current=$base/current
enabled=/etc/nginx/sites-enabled/seowatcher.io.conf
available=/etc/nginx/sites-available/seowatcher.io.conf
cert=/etc/letsencrypt/live/seowatcher.io/fullchain.pem
key=/etc/letsencrypt/live/seowatcher.io/privkey.pem
release=$base/releases/20261026-0.7.1-alpha
archive=$bundle/site.tar.gz

for path in "$base" "$current" "$enabled" "$available" "$cert" "$key"; do
  [[ -e "$path" || -L "$path" ]] || { printf 'STOP: expected existing deployment path is missing: %s\n' "$path" >&2; exit 1; }
done
[[ -L "$current" ]] || { printf 'STOP: current must be a symlink; no files were changed.\n' >&2; exit 1; }
[[ -L "$enabled" ]] || { printf 'STOP: enabled nginx vhost must be a symlink; no files were changed.\n' >&2; exit 1; }
[[ $(readlink -f "$enabled") == "$available" ]] || { printf 'STOP: enabled seowatcher vhost points to an unexpected file.\n' >&2; exit 1; }
[[ -f "$archive" && ! -L "$archive" ]] || { printf 'STOP: package site.tar.gz is missing or a symlink.\n' >&2; exit 1; }
[[ ! -e "$release" && ! -L "$release" ]] || { printf 'STOP: release already exists: %s\n' "$release" >&2; exit 1; }

(cd "$bundle" && sha256sum --check SHA256SUMS.txt)
nginx -t
stage=$(mktemp -d /var/tmp/seowatcher-update.XXXXXXXX)
chmod 700 "$stage"
old_target=$(readlink -f "$current")
case "$old_target" in
  "$base"/releases/*) [[ -d "$old_target" ]] || { printf 'STOP: current points to a missing release.\n' >&2; exit 1; } ;;
  *) printf 'STOP: current points outside the managed releases directory: %s\n' "$old_target" >&2; exit 1 ;;
esac
switched=0
rollback() {
  result=$?
  trap - ERR
  if [[ $switched -eq 1 ]]; then
    rollback_link="$base/current.rollback.$$"
    ln -s "$old_target" "$rollback_link"
    mv -Tf "$rollback_link" "$current"
    nginx -t && systemctl reload nginx || true
  fi
  printf 'Update stopped (exit %s). New files preserved at %s; previous release remains at %s.\n' "$result" "$stage" "$old_target" >&2
  exit "$result"
}
trap rollback ERR

python3 - "$archive" <<'PY'
import pathlib, sys, tarfile, urllib.parse, xml.etree.ElementTree as ET
with tarfile.open(sys.argv[1], 'r:gz') as archive:
    files = {}
    for entry in archive.getmembers():
        path = pathlib.PurePosixPath(entry.name)
        if path.is_absolute() or '..' in path.parts or not (entry.isfile() or entry.isdir()):
            raise SystemExit(f'Unsafe archive member: {entry.name}')
        if entry.isfile():
            name = path.as_posix().removeprefix('./')
            if name in files:
                raise SystemExit(f'Duplicate archive member: {name}')
            files[name] = entry
    required = {'index.html', 'docs/index.html', '404.html', 'assets/consent.js', 'assets/consent.css', 'sitemap.xml'}
    if not required.issubset(files):
        raise SystemExit('Required site files are missing')
    html_count = sum(name.endswith('.html') for name in files)
    if html_count != 149:
        raise SystemExit(f'Unexpected HTML page count: {html_count}')
    sitemap = ET.fromstring(archive.extractfile(files['sitemap.xml']).read())
    urls = sitemap.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')
    if len(urls) != 144:
        raise SystemExit(f'Unexpected sitemap target count: {len(urls)}')
    for node in urls:
        location = node.findtext('{http://www.sitemaps.org/schemas/sitemap/0.9}loc', '')
        url = urllib.parse.urlsplit(location)
        if url.scheme != 'https' or url.netloc != 'seowatcher.io' or url.query or url.fragment:
            raise SystemExit(f'Unexpected sitemap URL: {location}')
        target = url.path.lstrip('/')
        target = f'{target}index.html' if not target or target.endswith('/') else target
        if target not in files:
            raise SystemExit(f'Sitemap target missing: {location}')
    print(f'Archive verified: {len(files)} files, {html_count} HTML pages, {len(urls)} sitemap targets')
PY

install -d -m 755 "$release"
tar --extract --gzip --file "$archive" --directory "$release" --no-same-owner --no-same-permissions
find "$release" -type d -exec chmod 755 {} +
find "$release" -type f -exec chmod 644 {} +
test -f "$release/index.html"
test -f "$release/sitemap.xml"
switched=1
next_link="$base/current.next.$$"
ln -s "$release" "$next_link"
mv -Tf "$next_link" "$current"
nginx -t
systemctl reload nginx
curl --fail --silent --show-error --head --max-time 20 --resolve seowatcher.io:443:127.0.0.1 https://seowatcher.io/
curl --fail --silent --show-error --max-time 20 --resolve seowatcher.io:443:127.0.0.1 https://seowatcher.io/sitemap.xml -o "$stage/sitemap.xml"
grep -q '<loc>https://seowatcher.io/gizlilik/</loc>' "$stage/sitemap.xml"
grep -q '<loc>https://seowatcher.io/de/datenschutz/</loc>' "$stage/sitemap.xml"
switched=0
trap - ERR
printf '\nSEOWATCHER_UPDATE_OK\nRelease: %s\nPrevious release retained: %s\n' "$release" "$old_target"
