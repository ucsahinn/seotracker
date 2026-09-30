# Değişiklik günlüğü

Yayında tek sürüm tutuluyor, bu yüzden burada tek not var. Eski notlar
`git log CHANGELOG.md` içinde.

## [Yayınlanmamış]

## [1.5.0] — 2026-09-30

### Önce şunu yapın

Ajanların bağlandığı adres artık şifre istiyor. Mevcut ajan ayarlarınız
çalışmayı durdurur. Şifreyi görmek için:

```
docker compose exec seotracker cat /app/.wrangler/mcp-token
```

Çıkan yazıyı ajan ayarlarınıza `Authorization: Bearer <şifre>` olarak
ekleyin. Şifre istemiyorsanız compose dosyanızda `MCP_TOKEN=` satırını boş
bırakın.

### Yenilikler

- Site denetimi artık 0 ile 100 arası puan veriyor. Sorun kalmayınca 100 alırsınız; en çok puan kazandıracak işler puanın altında.
- Üç yeni kontrol: sayfa https değil, asıl adres eksik, dil bilgisi eksik.
- Her ekranda kendi özeti var: tıkladığınızda listeyi süzen halka ve çubuk grafikler.
- Fırsatlar: bir satıra tıklayınca neden listede olduğunu ve ne yapacağınızı görürsünüz.
- Panelde "Sıradaki adımlar", hızlı filtreler ve tek tıkla işlem düğmeleri.
- Analytics'te cihaz, ülke ve yeni/dönen ziyaretçi dağılımı.
- Denetim sonuçları ve ekran metinleri sade Türkçeye çevrildi.

### Düzeltilenler

- Dizin durumunda bazı satırlar boş görünüyordu.
- Grafik "Son 28 gün" derken 7 gün çiziyordu.
- Bazı renkler açık temada okunmuyordu.

[Yayınlanmamış]: https://github.com/ucsahinn/seotracker/compare/v1.5.0...HEAD
[1.5.0]: https://github.com/ucsahinn/seotracker/releases/tag/v1.5.0
