# winget paketi

`winget install seowatcher` ile kurulum için Windows Paket Yöneticisi bildirimleri.
Bildirimler `manifests/u/ucsahinn/seowatcher/<sürüm>/` altında durur; biçim
microsoft/winget-pkgs deposunun beklediği biçimdir (sürüm, installer, tr-TR
varsayılan yerel, en-US yerel).

Yayımlama, kullanıcının GitHub hesabından microsoft/winget-pkgs deposuna bir
pull request ile olur; bu depo kendi başına yayımlayamaz. Yeni bir sürümde:

1. `SHA256SUMS.txt` dosyasındaki özeti `ucsahinn.seowatcher.installer.yaml`
   içine büyük harfle yazın, `PackageVersion`, `InstallerUrl`, `ReleaseDate`
   ve `ReleaseNotesUrl` değerlerini güncelleyin (dört dosyada da sürüm aynı
   olmalı).
2. Yerelde doğrulayın: `winget validate --manifest <klasör>` ve
   `winget install --manifest <klasör>` (ikincisi gerçekten kurar).
3. Gönderin: `wingetcreate submit <klasör>` ya da klasörü
   `manifests/u/ucsahinn/seowatcher/<sürüm>/` yoluyla microsoft/winget-pkgs
   deposuna PR olarak açın. İlk paket için incelemeciler yayıncı doğrulaması
   isteyebilir.

`ProductCode` Inno Setup'ın kayıt defterine yazdığı `{AppId}_is1` değeridir
(`packaging/windows/seowatcher.iss` içindeki `AppId`); değişmez. Kurulum
kullanıcı kapsamındadır (`Scope: user`), yönetici izni istemez.
