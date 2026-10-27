---
title: Chave do PageSpeed
description: Obtenha uma chave gratuita do Google PageSpeed para medir a velocidade das páginas e informe-a no aplicativo. Sem chave, a medição fica limitada a 50 páginas.
kind: nasil-yapilir
updated: 2026-10-22
---

Ao fim desta página, a sua chave gratuita do PageSpeed estará obtida, informada no aplicativo e testada. Leva cinco minutos. A opção "Medir também a velocidade da página", na auditoria do site, mede cada página no celular e no computador com o serviço PageSpeed Insights do Google. O Google oferece esse serviço também sem chave, mas a cota é muito pequena. Depois de poucas páginas ele responde "429, muitas solicitações". Sem chave, o aplicativo limita a medição a no máximo 50 páginas por auditoria. Uma chave gratuita remove esse limite.

## O que você precisa

- Uma conta Google e um projeto no Google Cloud Console (o painel de desenvolvedores do Google). Se você abriu um projeto para a conexão com o Google, o mesmo serve.
- Não é preciso cartão nem pagamento. A API do PageSpeed Insights é gratuita.

## Passos

1. Em `console.cloud.google.com`, selecione o seu projeto.
2. Abra a página **APIs e serviços → Biblioteca**. Procure **PageSpeed Insights API** e escolha **Ativar**. Se você pular este passo, a chave existe, mas todas as solicitações são recusadas com 403.
3. Escolha **APIs e serviços → Credenciais → Criar credenciais → Chave de API**. Aparece uma chave que começa com "AIza". Copie-a.
4. Opcional, mas recomendado: escolha **Restringir chave**. Na restrição de API, selecione somente a **PageSpeed Insights API**. Se o seu assistente de IA também for consultar o histórico de dados de usuários reais (CrUX), adicione também a **Chrome UX Report API**.
5. No aplicativo, abra **Configurações → Testes de velocidade**. Cole a chave no campo **Chave de API**. Escolha **Salvar**. Aparece o aviso "Chave do PageSpeed salva". Não é preciso reiniciar.
6. Na mesma seção, clique no botão **Testar chave**. O aplicativo faz uma medição real para example.com (usa 1 medição). A resposta esperada é "A chave funciona: o Google PageSpeed Insights aceitou a medição."

Se você usa Docker, também pode informar a chave no arquivo `.env` como `PAGESPEED_API_KEY`. A tela Configurações é mais fácil, e o valor informado nela tem prioridade.

## Verificação

- O selo em **Configurações → Testes de velocidade** deve dizer **Chave salva**.
- No cartão de início da auditoria do site, com "Medir também a velocidade da página" ligado, a estimativa de tempo não deve mais mencionar o limite "en çok 50 sayfa" (no máximo 50 páginas).
- O cartão "PageSpeed Insights" em **Configurações → Limites** deve dizer "Uma chave foi definida".

## Perguntas frequentes

**Qual é o tamanho da cota?** O Google não dá um número oficial e o muda com o tempo. O valor real aparece no Cloud Console, em **APIs e serviços → Cotas**. Na prática, há um limite por minuto e um limite por dia. Cada página usa duas medições: celular e computador.

**O que acontece se eu atingir o limite por minuto?** O aplicativo espera e tenta de novo. A auditoria fica mais lenta, mas você não precisa fazer nada. Se o limite diário acabar, a medição para. Os resultados até aquele ponto ficam guardados. O restante é concluído em uma nova auditoria no dia seguinte.

**E se duas auditorias medirem a velocidade ao mesmo tempo?** Elas dividem o limite por minuto, e cada uma leva o dobro do tempo. A medição de velocidade de um site com 212 páginas leva cerca de 24 minutos sozinha e 48 minutos junto com outra auditoria; com o rastreamento, a auditoria inteira chega a 35 minutos.

**Onde a chave fica guardada?** No banco de dados deste computador, criptografada. Ela não é devolvida ao navegador. A tela Configurações mostra apenas a informação "salva".

**Sem chave não se mede nada?** Mede-se, até 50 páginas. Muitas vezes parte delas falha com 429. Para um site pequeno, pode bastar. Para sites com mais de 50 páginas, é preciso uma chave.

## Se algo der errado

- **O teste diz "restricted" ou 403.** Falta o passo 2: a API do PageSpeed Insights não está ativada, ou a chave está restrita a outra API.
- **O teste diz "invalid_key".** A chave foi copiada incompleta. Copie-a de novo no Cloud Console. O aplicativo não confere o formato da chave, só informa se o Google a aceitou.
- **O teste diz "quota_exhausted".** A cota de hoje acabou. Tente de novo amanhã ou veja a cota no Cloud Console.
- **A coluna de velocidade na auditoria está vazia.** "Medir também a velocidade da página" estava desligado quando a auditoria começou. Ligue-o em uma nova auditoria. Uma auditoria antiga não é medida depois.
- **O cartão de cota diz "Anahtar yok" (Sem chave), mas eu informei uma chave.** Atualize a página. O cartão olha as auditorias das últimas 24 horas. A chave nova passa a valer na próxima auditoria.

<!-- Kaynaklar: docs/PAGESPEED_API_KEY.md; src/client/features/settings/PageSpeedKeySection.tsx; PageSpeedKeyTest.tsx; src/server/features/lighthouse/pagespeed-config.ts; PageSpeedKeyTestService.ts; src/shared/audit-limits.ts; src/server/features/quotas/QuotaService.ts -->
