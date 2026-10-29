import { adminTranslateScript } from "./admin-translate-script";

export const adminScript = String.raw`
    const authForm = document.querySelector('#auth');
    const tokenInput = document.querySelector('#token');
    const authNotice = document.querySelector('#auth-notice');
    const editor = document.querySelector('#editor');
    const createForm = document.querySelector('#create');
    const cancelEdit = document.querySelector('#cancel-edit');
    const publishNowToggle = createForm.elements.publishNow;
    const saveButton = document.querySelector('#save-button');
    const list = document.querySelector('#items');
    const notice = document.querySelector('#notice');
    const interactionType = createForm.elements.interactionType;
    const interactionFields = document.querySelector('#interaction-fields');
    const pollFields = document.querySelector('#poll-fields');
    const optionList = document.querySelector('#options');
    const search = document.querySelector('#search');
    const statusFilter = document.querySelector('#status-filter');
    const pageLabel = document.querySelector('#page-label');
    const previousPage = document.querySelector('#previous-page');
    const nextPage = document.querySelector('#next-page');
    const responses = document.querySelector('#responses');
    const responseItems = document.querySelector('#response-items');
    const responseStatus = document.querySelector('#response-status');
    const previousResponsePage = document.querySelector('#previous-response-page');
    const nextResponsePage = document.querySelector('#next-response-page');
    const responsePageLabel = document.querySelector('#response-page-label');
    let responseTrigger = null;
    let responseAnnouncement = null;
    let responsePage = 1;
    let responseHasMore = false;
    let token = '';
    let editing = null;
    let page = 1;
    let hasMore = false;
    let debounce;

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
        if (response.status === 401) {
          throw new Error(
            'Yönetici anahtarı doğrulanmadı. Bu Worker için tanımlı ADMIN_TOKEN değerini kullanın.',
          );
        }
        const validation = Array.isArray(data.issues)
          ? data.issues.map((issue) => {
              const field = Array.isArray(issue.path) ? issue.path.join('.') : '';
              return (field ? field + ': ' : '') + issue.message;
            }).join(' · ')
          : '';
        throw new Error([data.error || 'İstek tamamlanamadı (' + response.status + ')', validation].filter(Boolean).join(': '));
      }
      return response.status === 204 ? null : response.json();
    }
    function labelStatus(status) {
      return status === 'published' ? 'Yayında' : status === 'draft' ? 'Taslak' : 'Arşivde';
    }
    function cancelEditing() {
      editing = null;
      resetComposer();
      optionList.replaceChildren();
      cancelEdit.hidden = true;
      document.querySelector('#form-title').textContent = 'Yeni duyuru';
      notice.textContent = 'Duyuru düzenleme kapatıldı.';
    }
    function resetComposer() {
      createForm.reset();
      interactionType.value = 'none';
      updateInteractionFields();
      saveButton.textContent = 'Taslak kaydet';
    }
    function addOption(option = {}) {
      if (optionList.children.length >= 8) return;
      const row = document.createElement('div');
      row.className = 'option-row';
      for (const [name, label, value] of [['labelTr', 'Seçenek · Türkçe', option.label_tr || ''], ['labelEn', 'Option · English', option.label_en || '']]) {
        const field = document.createElement('label');
        field.textContent = label;
        const input = document.createElement('input');
        input.name = name;
        input.maxLength = 80;
        input.required = true;
        input.value = value;
        field.append(input);
        row.append(field);
      }
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Kaldır';
      remove.setAttribute('aria-label', 'Seçeneği kaldır');
      remove.addEventListener('click', () => row.remove());
      row.append(remove);
      optionList.append(row);
    }
    function updateInteractionFields() {
      const active = interactionType.value !== 'none';
      interactionFields.hidden = !active;
      pollFields.hidden = interactionType.value !== 'poll';
      createForm.elements.promptTr.required = active;
      createForm.elements.promptEn.required = active;
      for (const input of optionList.querySelectorAll('input')) input.required = interactionType.value === 'poll';
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
      interactionType.value = item.interaction_type || 'none';
      createForm.elements.promptTr.value = item.prompt_tr || '';
      createForm.elements.promptEn.value = item.prompt_en || '';
      optionList.replaceChildren();
      for (const option of item.options || []) addOption(option);
      updateInteractionFields();
      cancelEdit.hidden = false;
      document.querySelector('#form-title').textContent = 'Duyuruyu düzenle';
      notice.textContent = 'Duyuru düzenleniyor.';
      createForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    async function showResponses(item) {
      responses.hidden = false;
      responseStatus.textContent = 'Yanıtlar yükleniyor…';
      responseStatus.setAttribute('role', 'status');
      responseItems.setAttribute('aria-busy', 'true');
      responseItems.replaceChildren();
      document.querySelector('#responses-title').textContent = (item.interaction_type === 'poll' ? 'Anket sonuçları · ' : 'Yazılı yanıtlar · ') + item.title_tr;
      document.querySelector('#responses-title').focus();
      try {
      const result = await request('/api/admin/announcements/' + encodeURIComponent(item.id) + '/responses?page=' + responsePage + '&limit=50');
      if (result.interaction_type === 'poll') {
        previousResponsePage.hidden = true;
        nextResponsePage.hidden = true;
        responsePageLabel.hidden = true;
        const total = (result.options || []).reduce((sum, option) => sum + option.count, 0);
        const shares = (result.options || []).map((option) => {
          const exact = total ? option.count * 100 / total : 0;
          return { option, percent: Math.floor(exact), remainder: exact - Math.floor(exact) };
        });
        let remaining = total ? 100 - shares.reduce((sum, share) => sum + share.percent, 0) : 0;
        const awarded = new Set();
        while (remaining > 0) {
          let bestIndex = -1;
          for (let index = 0; index < shares.length; index++) {
            if (awarded.has(index)) continue;
            if (bestIndex === -1 || shares[index].remainder > shares[bestIndex].remainder) bestIndex = index;
          }
          if (bestIndex === -1) break;
          shares[bestIndex].percent++;
          awarded.add(bestIndex);
          remaining--;
        }
        responseStatus.textContent = total ? 'Oy dağılımı · ' + total + ' oy' : 'Henüz oy yok.';
        for (const share of shares) {
          const row = document.createElement('div'); row.className = 'response-row';
          const copy = document.createElement('div');
          const label = document.createElement('p'); label.textContent = share.option.label_tr + ' / ' + share.option.label_en + ' · ' + share.percent + '%';
          const bar = document.createElement('progress'); bar.className = 'progress progress-primary'; bar.max = 100; bar.value = share.percent; bar.setAttribute('aria-label', label.textContent);
          copy.append(label, bar); row.append(copy); responseItems.append(row);
        }
        responseHasMore = false;
        return;
      }
      previousResponsePage.hidden = false;
      nextResponsePage.hidden = false;
      responsePageLabel.hidden = false;
      responseHasMore = result.hasMore;
      responsePageLabel.textContent = responsePage + '. sayfa';
      previousResponsePage.disabled = responsePage <= 1;
      nextResponsePage.disabled = !responseHasMore;
      responseStatus.textContent = '';
      responseItems.replaceChildren();
      if (!result.responses.length) { const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = 'Henüz yazılı yanıt yok.'; responseItems.append(empty); }
      for (const response of result.responses) {
        const row = document.createElement('article'); row.className = 'response-row';
        const copy = document.createElement('div'); const text = document.createElement('p');
        const option = (result.options || []).find((candidate) => candidate.id === response.option_id);
        text.textContent = response.answer || (option ? option.label_tr + ' / ' + option.label_en : 'Yanıt');
        const time = document.createElement('time'); time.dateTime = response.created_at; time.textContent = response.created_at.replace('T', ' ').replace('Z', ' UTC');
        copy.append(text, time); const remove = document.createElement('button'); remove.type = 'button'; remove.textContent = 'Sil';
        remove.addEventListener('click', async () => { if (!confirm('Bu yanıt kalıcı olarak silinsin mi?')) return; remove.disabled = true; try { await request('/api/admin/responses/' + encodeURIComponent(response.id), { method: 'DELETE' }); await showResponses(item); await load(); } catch (error) { remove.disabled = false; responseStatus.setAttribute('role', 'alert'); responseStatus.textContent = error.message; } });
        row.append(copy, remove); responseItems.append(row);
      }
      } catch (error) {
        responseStatus.setAttribute('role', 'alert');
        responseStatus.textContent = error.message + ' Yeniden denemek için yanıtları yeniden açın.';
      } finally {
        responseItems.setAttribute('aria-busy', 'false');
      }
    }
    async function load() {
      list.setAttribute('aria-busy', 'true');
      const params = new URLSearchParams({ page: String(page), limit: '25' });
      if (statusFilter.value) params.set('status', statusFilter.value);
      if (search.value.trim()) params.set('q', search.value.trim());
      const result = await request('/api/admin/announcements?' + params);
      const announcements = result.announcements;
      hasMore = result.hasMore;
      pageLabel.textContent = page + '. sayfa';
      previousPage.disabled = page <= 1;
      nextPage.disabled = !hasMore;
      list.replaceChildren();
      if (!announcements.length) {
        const p = document.createElement('p');
        p.className = 'empty';
        p.textContent = page === 1 ? 'Bu filtrede duyuru bulunamadı.' : 'Bu sayfada başka duyuru yok.';
        list.append(p);
        list.setAttribute('aria-busy', 'false');
        return;
      }
      for (const item of announcements) {
        const row = document.createElement('article');
        row.className = 'item';
        const content = document.createElement('div');
        const title = document.createElement('h3');
        const top = document.createElement('div'); top.className = 'item-top';
        title.textContent = item.title_tr + ' / ' + item.title_en;
        const statusBadge = document.createElement('span'); statusBadge.className = 'status'; statusBadge.textContent = labelStatus(item.status);
        top.append(title, statusBadge);
        const detail = document.createElement('p');
        detail.textContent = item.category + ' · ' + item.publish_at.replace('T', ' ').replace('Z', ' UTC') + (item.response_count ? ' · ' + item.response_count + ' yanıt' : '');
        content.append(top, detail);
        const actions = document.createElement('div');
        actions.className = 'actions';
        const edit = document.createElement('button');
        edit.type = 'button';
        edit.textContent = 'Düzenle';
        const hasResponses = (item.response_count || 0) > 0;
        const immutablePublishedInteraction = item.status === 'published' && item.interaction_type !== 'none';
        edit.disabled = hasResponses || immutablePublishedInteraction;
        if (edit.disabled) {
          edit.title = 'Bu duyuru değiştirilemez. Yeni bir taslak kopyalayın.';
          edit.textContent = 'Düzenleme kilitli';
        } else {
          edit.addEventListener('click', () => editAnnouncement(item));
        }
        actions.append(edit);
        if (item.interaction_type !== 'none') { const view = document.createElement('button'); view.type = 'button'; view.textContent = item.interaction_type === 'poll' ? 'Sonuçları gör' : 'Yazılı yanıtları gör'; view.addEventListener('click', async () => { responseTrigger = view; responseAnnouncement = item; responsePage = 1; view.disabled = true; try { await showResponses(item); } catch (error) { responseStatus.setAttribute('role', 'alert'); responseStatus.textContent = error.message; } finally { view.disabled = false; } }); actions.append(view); }
        const clone = document.createElement('button'); clone.type = 'button'; clone.textContent = 'Yeni taslak olarak kopyala';
        clone.addEventListener('click', async () => { try { const result = await request('/api/admin/announcements/' + encodeURIComponent(item.id) + '/clone', { method: 'POST' }); editAnnouncement(result.announcement); await load(); notice.textContent = 'Yanıt geçmişi olmadan yeni bir taslak açıldı.'; } catch (error) { notice.textContent = error.message; } });
        actions.append(clone);
        for (const [status, text] of [['published', 'Yayımla'], ['draft', 'Taslağa al'], ['archived', 'Arşivle']]) {
          if (item.status === status) continue;
          if (item.status === 'archived' && status === 'published') continue;
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
      list.setAttribute('aria-busy', 'false');
    }
    async function loadSafely() {
      try {
        await load();
      } catch (error) {
        list.replaceChildren();
        const failed = document.createElement('p');
        failed.className = 'empty';
        failed.textContent = error.message + ' Yeniden denemek için Yenile düğmesini kullanın.';
        list.append(failed);
        list.setAttribute('aria-busy', 'false');
      }
    }
    authForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      token = tokenInput.value.trim();
      authNotice.hidden = true;
      authNotice.textContent = '';
      try {
        await load();
        editor.hidden = false;
        authForm.hidden = true;
        notice.textContent = 'Yönetim paneline bağlandınız.';
      } catch (error) {
        token = '';
        authNotice.textContent = error.message;
        authNotice.hidden = false;
      }
    });
    cancelEdit.addEventListener('click', cancelEditing);
    interactionType.addEventListener('change', updateInteractionFields);
    publishNowToggle.addEventListener('change', () => {
      saveButton.textContent = publishNowToggle.checked ? 'Şimdi yayımla' : 'Taslak kaydet';
    });
${adminTranslateScript}
    document.querySelector('#add-option').addEventListener('click', () => { addOption(); updateInteractionFields(); });
    document.querySelector('#refresh').addEventListener('click', () => void loadSafely());
    document.querySelector('#close-responses').addEventListener('click', () => { responses.hidden = true; responseTrigger?.focus(); });
    previousResponsePage.addEventListener('click', () => { if (responsePage > 1 && responseAnnouncement) { responsePage--; void showResponses(responseAnnouncement); } });
    nextResponsePage.addEventListener('click', () => { if (responseHasMore && responseAnnouncement) { responsePage++; void showResponses(responseAnnouncement); } });
    previousPage.addEventListener('click', () => { if (page > 1) { page--; void loadSafely(); } });
    nextPage.addEventListener('click', () => { if (hasMore) { page++; void loadSafely(); } });
    statusFilter.addEventListener('change', () => { page = 1; void loadSafely(); });
    search.addEventListener('input', () => { clearTimeout(debounce); debounce = setTimeout(() => { page = 1; void loadSafely(); }, 250); });
    createForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!token) return;
      const form = new FormData(createForm);
      const publishNow = form.get('publishNow') === 'on';
      const publish = publishNow || event.submitter?.value === 'true';
      const data = {
        title_tr: String(form.get('titleTr')).trim(),
        title_en: String(form.get('titleEn')).trim(),
        body_tr: String(form.get('bodyTr')).trim(),
        body_en: String(form.get('bodyEn')).trim(),
        interaction_type: form.get('interactionType'),
        prompt_tr: String(form.get('promptTr') || '').trim(),
        prompt_en: String(form.get('promptEn') || '').trim(),
        options: interactionType.value === 'poll'
          ? Array.from(optionList.querySelectorAll('.option-row')).map((row) => ({ label_tr: row.querySelector('[name="labelTr"]').value.trim(), label_en: row.querySelector('[name="labelEn"]').value.trim() }))
          : [],
        category: form.get('category'),
        status: publish ? 'published' : editing?.status ?? 'draft',
        publish_at: publishNow ? new Date().toISOString() : dateValue(String(form.get('publishAt'))) || new Date().toISOString(),
        expires_at: dateValue(String(form.get('expiresAt'))),
      };
      try {
        if (interactionType.value === 'poll' && optionList.children.length < 2) {
          throw new Error('Anket için en az iki seçenek gerekli.');
        }
        if (editing && (editing.response_count || 0) > 0) throw new Error('Yanıt alınmış duyurular değiştirilemez. Yeni bir taslak kopyalayın.');
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
        resetComposer();
        optionList.replaceChildren();
        editing = null;
        cancelEdit.hidden = true;
        document.querySelector('#form-title').textContent = 'Yeni duyuru';
        notice.textContent = data.status === 'published' ? 'Duyuru yayımlandı.' : 'Taslak kaydedildi.';
        await load();
      } catch (error) {
        notice.textContent = error.message;
      }
    });
`;
