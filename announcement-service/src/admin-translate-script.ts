/** The composer's "translate" button. Embedded in the admin script, so it
 * shares that script's request(), token, notice and form variables. */
export const adminTranslateScript = String.raw`
    // Fills the English fields from the Turkish ones. Nothing is saved: the
    // administrator reads, corrects and then saves as usual.
    const translateButton = document.querySelector('#translate');
    translateButton.addEventListener('click', async () => {
      if (!token) return;
      const rows = Array.from(optionList.querySelectorAll('.option-row'));
      const sources = [
        ['titleEn', createForm.elements.titleTr.value],
        ['bodyEn', createForm.elements.bodyTr.value],
        ['promptEn', createForm.elements.promptTr.value],
        ...rows.map((row) => [row.querySelector('[name="labelEn"]'), row.querySelector('[name="labelTr"]').value]),
      ].filter(([, text]) => text.trim());
      if (!sources.length) { notice.textContent = 'Önce Türkçe alanları doldurun.'; return; }
      translateButton.disabled = true;
      notice.textContent = 'Çevriliyor…';
      try {
        const data = await request('/api/admin/translate', {
          method: 'POST',
          body: JSON.stringify({ fields: sources.map(([, text]) => text.trim()) }),
        });
        sources.forEach(([target, ], index) => {
          const field = typeof target === 'string' ? createForm.elements[target] : target;
          field.value = data.fields[index];
        });
        notice.textContent = 'İngilizce taslak yazıldı. Okuyup düzeltin, sonra kaydedin.';
        createForm.elements.titleEn.focus();
      } catch (error) {
        notice.textContent = error.message;
      } finally {
        translateButton.disabled = false;
      }
    });
`;
