# seowatcher.io site update — 0.8.4 Alpha (2026-10-28)

This updates the already deployed seowatcher site to 0.8.4 Alpha: version, download links and release notes, plus the route-localization and social-preview work. Guide prefixes and page names use each edition's own language, for example `/kilavuz/analitik/`, `/de/dokumentation/datenanalyse/`, `/fr/guides/statistiques/`, `/it/guide/analisi/`, and `/pt/guias/analise/`. Earlier `/docs/` paths and the previous localized guide slugs remain as noindex refresh aliases to the canonical URLs. Privacy pages now have matching localized Open Graph and Twitter metadata. The updater does not edit nginx configuration, certificates, DNS, application data, or other vhosts.

## Contents

- `site.tar.gz`: the six-language static website, assets, localized guides and old-path aliases.
- `update-seowatcher-site.sh`: validates the existing installation and archive, installs `/var/www/seowatcher/releases/20261028-0.8.4-alpha`, switches `/var/www/seowatcher/current`, reloads nginx, and rolls back the symlink if its post-switch checks fail. It keeps the prior release for manual rollback.
- `privacy-redirects.conf`: optional HTTP 301 locations for old privacy URLs. Review and apply manually as described below; the updater does not modify nginx configuration.
- `SHA256SUMS.txt`: hashes for the files in this package.

The site contains 287 HTML files, including 138 legacy-route aliases, and 144 canonical sitemap URLs. The six audit guides and 0.8.4 release notes now agree with the app's 202 audit rules. The existing installation script from the older 0.5.0 package is first-install-only and must not be rerun on this server.

## Upload and verify from Windows PowerShell

Upload the update bundle files to a new staging directory on the VPS. The
bundle manifest checks the site archive and each helper file before the updater
can switch the live symlink:

```powershell
$bundle = "C:\Users\ulasc\Desktop\seotracker\dist\hetzner-site-update-0.8.4-alpha-20261028"
$server = "ulas@94.130.129.213"
ssh $server "mkdir -m 700 -p /home/ulas/seowatcher-update-084"
scp "$bundle\site.tar.gz" "$bundle\README-UPDATE.md" "$bundle\update-seowatcher-site.sh" "$bundle\privacy-redirects.conf" "$bundle\SHA256SUMS.txt" "${server}:/home/ulas/seowatcher-update-084/"
ssh $server
```

On the VPS, verify the uploaded bundle and review the updater before running
anything with sudo:

```sh
cd /home/ulas/seowatcher-update-084
sha256sum -c SHA256SUMS.txt
bash -n update-seowatcher-site.sh
less README-UPDATE.md
```

The updater expects the already configured `/var/www/seowatcher/current` symlink, enabled `seowatcher.io` nginx vhost and Let's Encrypt certificate for both apex and `www`. If any prerequisite is missing or unexpected, it stops before changing files. Review the script, then run:

```sh
sudo bash ./update-seowatcher-site.sh
```

Success prints `SEOWATCHER_UPDATE_OK`. The prior release remains in `/var/www/seowatcher/releases/` for rollback. The script does not delete releases or alter the nginx vhost/certificate.

## Optional: make former privacy URLs HTTP 301 redirects

The generated site keeps noindex HTML refresh pages at the former paths so direct visits continue to work. For a proper HTTP redirect, inspect the active HTTPS apex server block and add the four directives in `privacy-redirects.conf` inside that block. Then run `sudo nginx -t` and reload only if it succeeds. English and Italian keep `/privacy/` as their canonical route.

## After update

```sh
curl -sSI https://seowatcher.io/
curl -sSI https://seowatcher.io/gizlilik/
curl -fsS https://seowatcher.io/sitemap.xml | grep -o '<loc>' | wc -l
sudo nginx -t
systemctl is-active nginx
```

Expected: HTTPS homepage returns 200; sitemap reports 144 `<loc>` entries; nginx is active. Open one canonical guide path per language and confirm older `/docs/` and former guide-slug addresses forward to it. Submit the sitemap in Search Console and Bing Webmaster Tools after publication. This local package build does not verify Google/Bing indexing or production performance.
