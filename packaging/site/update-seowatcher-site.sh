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
release=$base/releases/20261027-0.8.1-alpha
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
from html.parser import HTMLParser
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
    required = {
        'index.html', 'kilavuz/index.html', 'en/docs/index.html',
        'de/dokumentation/index.html', 'fr/guides/index.html',
        'it/guide/index.html', 'pt/guias/index.html', 'docs/index.html',
        'de/dokumentation/installation-unter-windows/index.html',
        'de/dokumentation/datenanalyse/index.html',
        'de/dokumentation/installation-windows/index.html',
        'fr/guides/installation-sous-windows/index.html',
        'fr/guides/statistiques/index.html',
        'fr/guides/installation-windows/index.html',
        'it/guide/installazione-su-windows/index.html',
        'it/guide/analisi/index.html',
        'it/guide/installazione-windows/index.html',
        'it/guide/rapporti/index.html',
        'it/guide/report/index.html',
        'pt/guias/instalar-no-windows/index.html',
        'pt/guias/analise/index.html',
        'pt/guias/instalar-windows/index.html',
        'kilavuz/analitik/index.html',
        'kilavuz/analytics/index.html',
        'gizlilik/index.html', 'en/privacy/index.html',
        'de/datenschutz/index.html', 'fr/confidentialite/index.html',
        'it/privacy/index.html', 'pt/privacidade/index.html',
        'assets/og.png', 'assets/og-en.png', 'assets/og-de.png',
        'assets/og-fr.png', 'assets/og-it.png', 'assets/og-pt.png',
        '404.html', 'assets/consent.js',
        'assets/consent.css', 'sitemap.xml', 'llms.txt'
    }
    if not required.issubset(files):
        raise SystemExit('Required site files are missing')
    audit_pages = (
        'kilavuz/denetim-kurallari/index.html',
        'en/docs/audit-rules/index.html',
        'de/dokumentation/audit-regeln/index.html',
        'fr/guides/regles-d-audit/index.html',
        'it/guide/regole-del-controllo/index.html',
        'pt/guias/regras-de-auditoria/index.html'
    )
    stale_counts = ('201 kuralla', '201 audit rules', '201 Regeln', '201 règles', '201 regole', '201 regras')
    for name in audit_pages:
        if name not in files:
            raise SystemExit(f'Missing localized audit guide: {name}')
        content = archive.extractfile(files[name]).read().decode('utf-8')
        if '202' not in content or any(stale in content for stale in stale_counts):
            raise SystemExit(f'Outdated audit-rule count in {name}')
    release_notes = (
        'kilavuz/surum-notlari/index.html',
        'en/docs/release-notes/index.html',
        'de/dokumentation/versionshinweise/index.html',
        'fr/guides/notes-de-version/index.html',
        'it/guide/note-di-rilascio/index.html',
        'pt/guias/notas-da-versao/index.html'
    )
    for name in release_notes:
        if name not in files:
            raise SystemExit(f'Missing localized release notes: {name}')
        content = archive.extractfile(files[name]).read().decode('utf-8')
        if '202' not in content or any(stale in content for stale in stale_counts):
            raise SystemExit(f'Outdated audit-rule count in {name}')
    llms = archive.extractfile(files['llms.txt']).read().decode('utf-8')
    if '202 audit rules' not in llms or any(stale in llms for stale in stale_counts):
        raise SystemExit('The published quick facts have an outdated audit-rule count')
    privacy_pages = {
        'gizlilik/index.html': ('https://seowatcher.io/gizlilik/', 'og.png', 'tr_TR'),
        'en/privacy/index.html': ('https://seowatcher.io/en/privacy/', 'og-en.png', 'en_US'),
        'de/datenschutz/index.html': ('https://seowatcher.io/de/datenschutz/', 'og-de.png', 'de_DE'),
        'fr/confidentialite/index.html': ('https://seowatcher.io/fr/confidentialite/', 'og-fr.png', 'fr_FR'),
        'it/privacy/index.html': ('https://seowatcher.io/it/privacy/', 'og-it.png', 'it_IT'),
        'pt/privacidade/index.html': ('https://seowatcher.io/pt/privacidade/', 'og-pt.png', 'pt_BR')
    }
    og_locales = ('tr_TR', 'en_US', 'de_DE', 'fr_FR', 'it_IT', 'pt_BR')
    class MetadataParser(HTMLParser):
        def __init__(self):
            super().__init__()
            self.metas = []
            self.canonicals = []
            self.title = ''
            self.in_title = False
        def handle_starttag(self, tag, attrs):
            attributes = dict(attrs)
            if tag == 'meta':
                self.metas.append(attributes)
            elif tag == 'link' and 'canonical' in attributes.get('rel', '').split():
                self.canonicals.append(attributes.get('href', ''))
            elif tag == 'title':
                self.in_title = True
        def handle_endtag(self, tag):
            if tag == 'title':
                self.in_title = False
        def handle_data(self, data):
            if self.in_title:
                self.title += data
    for name, (canonical, image, locale) in privacy_pages.items():
        content = archive.extractfile(files[name]).read().decode('utf-8')
        metadata = MetadataParser()
        metadata.feed(content)
        def values(attribute, key):
            return [item.get('content', '') for item in metadata.metas if item.get(attribute) == key]
        expected_property = {
            'og:type': 'website',
            'og:site_name': 'seowatcher',
            'og:url': canonical,
            'og:locale': locale,
            'og:image': f'https://seowatcher.io/assets/{image}',
            'og:image:type': 'image/png',
            'og:image:width': '1200',
            'og:image:height': '630'
        }
        expected_name = {
            'twitter:card': 'summary_large_image',
            'twitter:image': f'https://seowatcher.io/assets/{image}'
        }
        for key, expected in expected_property.items():
            if values('property', key) != [expected]:
                raise SystemExit(f'Missing or incorrect {key} in {name}')
        for key, expected in expected_name.items():
            if values('name', key) != [expected]:
                raise SystemExit(f'Missing or incorrect {key} in {name}')
        if metadata.canonicals != [canonical]:
            raise SystemExit(f'Missing or incorrect canonical URL in {name}')
        og_title = values('property', 'og:title')
        og_description = values('property', 'og:description')
        if len(og_title) != 1 or og_title[0] != metadata.title:
            raise SystemExit(f'Missing or incorrect localized og:title in {name}')
        if len(og_description) != 1 or not og_description[0].strip():
            raise SystemExit(f'Missing localized og:description in {name}')
        if values('name', 'description') != og_description:
            raise SystemExit(f'Page and social descriptions differ in {name}')
        if values('name', 'twitter:title') != og_title or values('name', 'twitter:description') != og_description:
            raise SystemExit(f'Open Graph and Twitter copy differ in {name}')
        expected_alternates = [item for item in og_locales if item != locale]
        if values('property', 'og:locale:alternate') != expected_alternates:
            raise SystemExit(f'Missing or incorrect alternate social locales in {name}')
    previous_routes = {
        'tr': ('kilavuz', [('analytics', 'analitik')]),
        'de': ('dokumentation', [('installation-windows', 'installation-unter-windows'), ('installation-docker', 'installation-mit-docker'), ('analytics', 'datenanalyse')]),
        'fr': ('guides', [('installation-windows', 'installation-sous-windows'), ('installation-docker', 'installation-avec-docker'), ('analytics', 'statistiques')]),
        'it': ('guide', [('installazione-windows', 'installazione-su-windows'), ('installazione-docker', 'installazione-con-docker'), ('report', 'rapporti'), ('analytics', 'analisi')]),
        'pt': ('guias', [('instalar-windows', 'instalar-no-windows'), ('instalar-docker', 'instalar-com-docker'), ('analytics', 'analise')])
    }
    for language, (guide_prefix, pairs) in previous_routes.items():
        for old_slug, new_slug in pairs:
            target = f'/{guide_prefix}/{new_slug}/' if language == 'tr' else f'/{language}/{guide_prefix}/{new_slug}/'
            prefixes = (guide_prefix, 'docs') if language == 'tr' else (f'{language}/{guide_prefix}', f'{language}/docs')
            for prefix in prefixes:
                alias = f'{prefix}/{old_slug}/index.html'
                if alias not in files:
                    raise SystemExit(f'Missing previous guide URL alias: {alias}')
                content = archive.extractfile(files[alias]).read().decode('utf-8')
                if 'noindex,follow' not in content or f'https://seowatcher.io{target}' not in content or f'0; url={target}' not in content:
                    raise SystemExit(f'Broken previous guide URL alias: {alias}')
    html_count = sum(name.endswith('.html') for name in files)
    if html_count != 287:
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
grep -q '<loc>https://seowatcher.io/en/privacy/</loc>' "$stage/sitemap.xml"
grep -q '<loc>https://seowatcher.io/de/datenschutz/</loc>' "$stage/sitemap.xml"
grep -q '<loc>https://seowatcher.io/fr/confidentialite/</loc>' "$stage/sitemap.xml"
grep -q '<loc>https://seowatcher.io/it/privacy/</loc>' "$stage/sitemap.xml"
grep -q '<loc>https://seowatcher.io/pt/privacidade/</loc>' "$stage/sitemap.xml"
switched=0
trap - ERR
printf '\nSEOWATCHER_UPDATE_OK\nRelease: %s\nPrevious release retained: %s\n' "$release" "$old_target"
