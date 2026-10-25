import { adminScript } from "./admin-script";
import { adminStyles } from "./admin-styles";

export const adminPage = String.raw`<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark light">
  <title>Duyuru yönetimi · seowatcher</title>
  <style>${adminStyles}</style>
</head>
<body>
  <main>
    <h1>Duyuru yönetimi</h1>
    <p class="intro">Duyuruları Türkçe ve İngilizce hazırlayın. Uygulama açıkken yeni yayınlar genellikle birkaç dakika içinde bildirim olarak görünür; ağ ve tarayıcı koşulları gecikmeye neden olabilir.</p>
    <form id="auth" class="auth">
      <label for="token">Yönetici anahtarı<input id="token" type="password" autocomplete="off" required></label>
      <button class="primary" type="submit">Bağlan</button>
    </form>
    <p id="auth-notice" class="notice" role="alert" aria-live="assertive" hidden></p>
    <section id="editor" hidden>
      <div class="workspace">
      <section class="panel compose">
      <div class="section-head"><div><p class="eyebrow">YAYIN OLUŞTUR</p><h2 id="form-title">Yeni duyuru</h2></div><span class="language-mark">TR <i>+</i> EN</span></div>
      <form id="create">
        <div class="grid">
          <label>Başlık · Türkçe<input name="titleTr" maxlength="120" required></label>
          <label>Title · English<input name="titleEn" maxlength="120" required></label>
          <label>Mesaj · Türkçe<textarea name="bodyTr" maxlength="4000" required></textarea></label>
          <label>Message · English<textarea name="bodyEn" maxlength="4000" required></textarea></label>
        </div>
        <div class="interaction-box">
          <label>Etkileşim türü<select name="interactionType"><option value="none">Yalnızca duyuru</option><option value="poll">Anket · seçenekli yanıt</option><option value="question">Soru · yazılı yanıt</option></select></label>
          <div id="interaction-fields" hidden>
            <div class="grid prompt-grid"><label>Soru · Türkçe<input name="promptTr" maxlength="200"></label><label>Question · English<input name="promptEn" maxlength="200"></label></div>
            <div id="poll-fields" hidden><div class="section-head"><h3>Anket seçenekleri</h3><button id="add-option" type="button">Seçenek ekle</button></div><div id="options"></div></div>
            <p class="hint">Ad veya hesap alınmaz. Aynı tarayıcıda saklanan katılımcı anahtarıyla bir yanıt kabul edilir; bu, kişi başına tek yanıt garantisi değildir ve uygulama verisi silinerek sıfırlanabilir. Yazılı yanıtlar yöneticiler tarafından görülebilir.</p>
          </div>
        </div>
        <div class="row">
          <label>Kategori<select name="category"><option value="product">Ürün yeniliği</option><option value="maintenance">Bakım</option><option value="security">Güvenlik</option><option value="release">Sürüm</option></select></label>
          <label>Yayın zamanı<input name="publishAt" type="datetime-local"></label>
          <label>Yayından kalkma zamanı<input name="expiresAt" type="datetime-local"></label>
          <label class="publish-toggle"><input name="publishNow" type="checkbox"> Hemen yayımla</label>
          <button id="save-button" type="submit">Taslak kaydet</button>
          <button class="primary" type="submit" name="publish" value="true">Yayımla / zamanla</button>
          <button id="cancel-edit" type="button" hidden>Vazgeç</button>
        </div>
      </form>
      <p id="notice" class="notice" role="status" aria-live="polite"></p>
      </section>
      <section class="panel archive">
        <div class="section-head"><div><p class="eyebrow">DUYURU KÜTÜPHANESİ</p><h2>Yayın geçmişi</h2></div><button id="refresh" type="button" aria-label="Listeyi yenile">Yenile</button></div>
        <div class="filters"><label class="search-label">Ara<input id="search" type="search" placeholder="Başlık veya içerik"></label><label>Durum<select id="status-filter"><option value="">Tümü</option><option value="published">Yayında</option><option value="draft">Taslak</option><option value="archived">Arşivde</option></select></label></div>
        <div id="items" aria-live="polite" aria-busy="false"></div>
        <div class="pagination"><button id="previous-page" type="button" disabled>Önceki</button><span id="page-label">1. sayfa</span><button id="next-page" type="button" disabled>Sonraki</button></div>
        <section id="responses" class="responses" aria-labelledby="responses-title" hidden><div class="section-head"><h3 id="responses-title" tabindex="-1">Yanıtlar</h3><button id="close-responses" type="button">Kapat</button></div><p id="response-status" role="status" aria-live="polite"></p><div id="response-items" aria-busy="false"></div><div class="response-pagination"><button id="previous-response-page" type="button" disabled>Önceki yanıtlar</button><span id="response-page-label">1. sayfa</span><button id="next-response-page" type="button" disabled>Daha eski yanıtlar</button></div></section>
      </section>
      </div>
    </section>
  </main>
  <script>${adminScript}</script>
</body>
</html>`;
