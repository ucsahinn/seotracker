export const adminPage = String.raw`<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark light">
  <title>Duyuru yönetimi · seowatcher</title>
  <style>
    :root { color-scheme: dark; --surface:#20221f; --panel:#292c28; --ink:#f1f0e8; --muted:#b0b2a8; --line:#41443d; --accent:#e9a743; --radius:14px; font:16px/1.55 system-ui,-apple-system,"Segoe UI",sans-serif; }
    * { box-sizing:border-box; } body { margin:0; color:var(--ink); background:#191b19; }
    main { width:min(1040px,100%); margin:auto; padding:clamp(20px,5vw,56px) 20px 72px; }
    h1,h2,p { margin-top:0; } h1 { margin-bottom:8px; font-size:clamp(1.7rem,4vw,2.4rem); line-height:1.15; letter-spacing:-.035em; }
    .intro,.hint { color:var(--muted); } .intro { max-width:62ch; margin-bottom:28px; }
    .panel { border:1px solid var(--line); border-radius:var(--radius); background:var(--surface); padding:20px; }
    .auth { display:flex; align-items:end; gap:12px; margin-bottom:22px; } .auth label { flex:1; }
    label { display:grid; gap:6px; color:var(--muted); font-size:.88rem; }
    input,textarea,select { width:100%; border:1px solid #55594f; border-radius:9px; background:var(--panel); color:var(--ink); padding:10px 12px; font:inherit; }
    input:focus,textarea:focus,select:focus,button:focus-visible { outline:2px solid var(--accent); outline-offset:2px; }
    textarea { min-height:116px; resize:vertical; } .grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    .wide { grid-column:1/-1; } .row { display:flex; flex-wrap:wrap; align-items:end; gap:12px; margin-top:16px; }
    .row label { flex:1 1 190px; } button { min-height:42px; border:1px solid var(--line); border-radius:999px; padding:8px 16px; color:var(--ink); background:var(--panel); font:600 .92rem inherit; cursor:pointer; }
    button.primary { color:#21190c; background:var(--accent); border-color:var(--accent); } button:hover { filter:brightness(1.08); }
    h2 { margin:30px 0 12px; font-size:1.18rem; } .notice { min-height:1.6em; margin:12px 0 0; color:var(--accent); }
    .item { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:12px; align-items:center; border-top:1px solid var(--line); padding:15px 0; }
    .item:first-child { border-top:0; } .item h3 { margin:0 0 3px; font-size:1rem; } .item p { margin:0; color:var(--muted); font-size:.88rem; }
    .actions { display:flex; flex-wrap:wrap; gap:7px; } .empty { color:var(--muted); }
    @media (max-width:650px) { .grid { grid-template-columns:1fr; } .wide { grid-column:auto; } .auth { align-items:stretch; flex-direction:column; } .item { grid-template-columns:1fr; } .actions button { flex:1; } }
    @media (prefers-color-scheme:light) { :root { color-scheme:light; --surface:#f4f3ed; --panel:#fffefa; --ink:#272821; --muted:#5f6257; --line:#d8d8ce; --accent:#a95c00; } body { background:#eae9e1; } button.primary { color:white; } }
  </style>
</head>
<body>
  <main>
    <h1>Duyuru yönetimi</h1>
    <p class="intro">Burada yayımladığınız duyurular, uygulaması internete bağlı müşterilere en geç birkaç dakika içinde ulaşır. Metinler düz yazı olarak gösterilir.</p>
    <form id="auth" class="auth">
      <label for="token">Yönetici anahtarı<input id="token" type="password" autocomplete="off" required></label>
      <button class="primary" type="submit">Bağlan</button>
    </form>
    <section id="editor" class="panel" hidden>
      <h2>Yeni duyuru</h2>
      <form id="create">
        <div class="grid">
          <label>Başlık · Türkçe<input name="titleTr" maxlength="120" required></label>
          <label>Title · English<input name="titleEn" maxlength="120" required></label>
          <label>Mesaj · Türkçe<textarea name="bodyTr" maxlength="4000" required></textarea></label>
          <label>Message · English<textarea name="bodyEn" maxlength="4000" required></textarea></label>
        </div>
        <div class="row">
          <label>Kategori<select name="category"><option value="product">Ürün yeniliği</option><option value="maintenance">Bakım</option><option value="security">Güvenlik</option><option value="release">Sürüm</option></select></label>
          <label>Yayın zamanı<input name="publishAt" type="datetime-local"></label>
          <label>Yayından kalkma zamanı<input name="expiresAt" type="datetime-local"></label>
          <button type="submit">Taslak kaydet</button>
          <button class="primary" type="submit" name="publish" value="true">Şimdi yayımla</button>
          <button id="cancel-edit" type="button" hidden>Vazgeç</button>
        </div>
      </form>
      <p id="notice" class="notice" role="status" aria-live="polite"></p>
      <h2>Mevcut duyurular</h2>
      <div id="items" aria-live="polite"></div>
    </section>
  </main>
  <script>
    const authForm = document.querySelector('#auth');
    const tokenInput = document.querySelector('#token');
    const editor = document.querySelector('#editor');
    const createForm = document.querySelector('#create');
    const cancelEdit = document.querySelector('#cancel-edit');
    const list = document.querySelector('#items');
    const notice = document.querySelector('#notice');
    let token = '';
    let editing = null;

    function dateValue(value) {
      if (!value) return null;
      const date = new Date(value);
      return Number.isNaN(date.valueOf()) ? null : date.toISOString();
    }
    function localDateValue(value) {
      if (!value) return '';
      const date = new Date(value);
      const offset = date.getTimezoneOffset() * 60_000;
      return new Date(date.valueOf() - offset).toISOString().slice(0, 16);
    }
    async function request(path, options = {}) {
      const response = await fetch(path, {
        ...options,
        headers: {
          'content-type': 'application/json',
          authorization: 'Bearer ' + token,
          ...options.headers,
        },
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'İstek tamamlanamadı (' + response.status + ')');
      }
      return response.status === 204 ? null : response.json();
    }
    function labelStatus(status) {
      return status === 'published' ? 'Yayında' : status === 'draft' ? 'Taslak' : 'Arşivde';
    }
    function cancelEditing() {
      editing = null;
      createForm.reset();
      cancelEdit.hidden = true;
      notice.textContent = 'Duyuru düzenleme kapatıldı.';
    }
    function editAnnouncement(item) {
      editing = item;
      createForm.elements.titleTr.value = item.title_tr;
      createForm.elements.titleEn.value = item.title_en;
      createForm.elements.bodyTr.value = item.body_tr;
      createForm.elements.bodyEn.value = item.body_en;
      createForm.elements.category.value = item.category;
      createForm.elements.publishAt.value = localDateValue(item.publish_at);
      createForm.elements.expiresAt.value = localDateValue(item.expires_at);
      cancelEdit.hidden = false;
      notice.textContent = 'Duyuru düzenleniyor.';
      createForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    async function load() {
      const { announcements } = await request('/api/admin/announcements');
      list.replaceChildren();
      if (!announcements.length) {
        const p = document.createElement('p');
        p.className = 'empty';
        p.textContent = 'Henüz duyuru yok.';
        list.append(p);
        return;
      }
      for (const item of announcements) {
        const row = document.createElement('article');
        row.className = 'item';
        const content = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = item.title_tr + ' · ' + labelStatus(item.status);
        const detail = document.createElement('p');
        detail.textContent = item.category + ' · ' + item.publish_at.replace('T', ' ').replace('Z', ' UTC');
        content.append(title, detail);
        const actions = document.createElement('div');
        actions.className = 'actions';
        const edit = document.createElement('button');
        edit.type = 'button';
        edit.textContent = 'Düzenle';
        edit.addEventListener('click', () => editAnnouncement(item));
        actions.append(edit);
        for (const [status, text] of [['published', 'Yayımla'], ['draft', 'Taslağa al'], ['archived', 'Arşivle']]) {
          if (item.status === status) continue;
          const button = document.createElement('button');
          button.type = 'button';
          button.textContent = text;
          button.addEventListener('click', async () => {
            try {
              await request('/api/admin/announcements/' + encodeURIComponent(item.id), {
                method: 'PATCH',
                body: JSON.stringify({ status }),
              });
              await load();
              notice.textContent = 'Duyuru güncellendi.';
            } catch (error) {
              notice.textContent = error.message;
            }
          });
          actions.append(button);
        }
        row.append(content, actions);
        list.append(row);
      }
    }
    authForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      token = tokenInput.value.trim();
      try {
        await load();
        editor.hidden = false;
        authForm.hidden = true;
        notice.textContent = 'Yönetim paneline bağlandınız.';
      } catch (error) {
        token = '';
        notice.textContent = error.message;
      }
    });
    cancelEdit.addEventListener('click', cancelEditing);
    createForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!token) return;
      const form = new FormData(createForm);
      const publish = event.submitter?.value === 'true';
      const data = {
        title_tr: String(form.get('titleTr')).trim(),
        title_en: String(form.get('titleEn')).trim(),
        body_tr: String(form.get('bodyTr')).trim(),
        body_en: String(form.get('bodyEn')).trim(),
        category: form.get('category'),
        status: publish ? 'published' : editing?.status ?? 'draft',
        publish_at: dateValue(String(form.get('publishAt'))) || new Date().toISOString(),
        expires_at: dateValue(String(form.get('expiresAt'))),
      };
      try {
        if (editing) {
          await request('/api/admin/announcements/' + encodeURIComponent(editing.id), {
            method: 'PATCH',
            body: JSON.stringify(data),
          });
        } else {
          await request('/api/admin/announcements', {
            method: 'POST',
            body: JSON.stringify(data),
          });
        }
        createForm.reset();
        editing = null;
        cancelEdit.hidden = true;
        notice.textContent = data.status === 'published' ? 'Duyuru yayımlandı.' : 'Taslak kaydedildi.';
        await load();
      } catch (error) {
        notice.textContent = error.message;
      }
    });
  </script>
</body>
</html>`;
