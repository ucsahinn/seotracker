# seowatcher.io static site update package

This is an update for the existing Hetzner deployment, prepared from the local `site/` output for seowatcher 0.7.1 Alpha on 2026-10-26. It does not create or edit nginx configuration, certificates, DNS, application data, or other vhosts. It does not deploy anything until you run the script on the server.

## Contents

- `site.tar.gz`: the six-language static website, assets and localized docs.
- `update-seowatcher-site.sh`: validates the existing installation and archive, installs a versioned release, switches `/var/www/seowatcher/current`, reloads nginx, and rolls back the symlink if its post-switch checks fail. It keeps the prior release for manual rollback.
- `privacy-redirects.conf`: optional HTTP 301 locations for old privacy URLs. Review and apply manually as described below; the updater does not modify nginx configuration.
- `SHA256SUMS.txt`: hashes for the files in this package.

The site contains 149 HTML files and 144 canonical sitemap URLs. The existing installation script from the older 0.5.0 package is first-install-only and must not be rerun on this server.

## Upload and verify from Windows PowerShell

Upload the update bundle files to a new staging directory on the VPS. The
bundle manifest checks the site archive and each helper file before the updater
can switch the live symlink:

```powershell
$bundle = "C:\Users\ulasc\Desktop\seotracker\dist\hetzner-site-update-0.7.1-alpha-20261026"
ssh user@your-server "mkdir -m 700 -p /home/user/seowatcher-update-20261026"
scp "$bundle\site.tar.gz" "$bundle\README-UPDATE.md" "$bundle\update-seowatcher-site.sh" "$bundle\privacy-redirects.conf" "$bundle\SHA256SUMS.txt" user@your-server:/home/user/seowatcher-update-20261026/
ssh user@your-server
```

On the VPS, verify the uploaded bundle and review the updater before running
anything with sudo:

```sh
cd "$HOME/seowatcher-update-20261026"
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

Expected: HTTPS homepage and Turkish privacy page return 200; sitemap reports 144 `<loc>` entries; nginx is active. Submit the sitemap in Search Console and Bing Webmaster Tools after publication. This local package build does not verify Google/Bing indexing or production performance.
