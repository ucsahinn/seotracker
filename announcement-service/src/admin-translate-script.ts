/** English drafts in the composer. Embedded in the admin script, so it shares
 * that script's request(), token, notice and form variables. */
export const adminTranslateScript = String.raw`
    // English drafts of the Turkish fields. Nothing is saved: the
    // administrator reads, corrects and then saves as usual.
    //
    // Automatic: leaving a Turkish field fills its English twin when that
    // twin is empty or still holds the last automatic draft. A draft the
    // administrator has edited is never overwritten automatically; the button
    // re-translates everything on request.
    const translateButton = document.querySelector('#translate');
    const englishTwin = (field) => {
      if (field.name === 'titleTr') return createForm.elements.titleEn;
      if (field.name === 'bodyTr') return createForm.elements.bodyEn;
      if (field.name === 'promptTr') return createForm.elements.promptEn;
      if (field.name === 'labelTr') return field.closest('.option-row')?.querySelector('[name="labelEn"]') ?? null;
      return null;
    };
    const untouched = (target) => !target.value.trim() || target.value === target.dataset.autoDraft;

    async function translateInto(pairs, message) {
      const work = pairs.filter(([, source]) => source.value.trim());
      if (!token || !work.length) return false;
      translateButton.disabled = true;
      notice.textContent = 'Çevriliyor…';
      try {
        const data = await request('/api/admin/translate', {
          method: 'POST',
          body: JSON.stringify({ fields: work.map(([, source]) => source.value.trim()) }),
        });
        work.forEach(([target], index) => {
          target.value = data.fields[index];
          target.dataset.autoDraft = target.value;
        });
        notice.textContent = message;
        return true;
      } catch (error) {
        notice.textContent = error.message;
        return false;
      } finally {
        translateButton.disabled = false;
      }
    }

    createForm.addEventListener('change', (event) => {
      const target = englishTwin(event.target);
      if (!target || !untouched(target)) return;
      void translateInto([[target, event.target]], 'İngilizce taslak otomatik yazıldı. Okuyup düzeltin, sonra kaydedin.');
    });

    translateButton.addEventListener('click', async () => {
      const sources = [
        createForm.elements.titleTr,
        createForm.elements.bodyTr,
        createForm.elements.promptTr,
        ...optionList.querySelectorAll('[name="labelTr"]'),
      ];
      const pairs = sources.map((source) => [englishTwin(source), source]).filter(([target]) => target);
      if (!pairs.some(([, source]) => source.value.trim())) { notice.textContent = 'Önce Türkçe alanları doldurun.'; return; }
      if (await translateInto(pairs, 'İngilizce taslak yazıldı. Okuyup düzeltin, sonra kaydedin.')) createForm.elements.titleEn.focus();
    });
`;
