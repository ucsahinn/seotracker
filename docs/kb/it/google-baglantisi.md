---
title: Collegamento con Google
description: Separare credenziali dell’installazione e proprietà del progetto; distinguere configurazione e accesso.
kind: nasil-yapilir
updated: 2026-10-27
---

## Credenziali e proprietà

Le credenziali Google nelle Impostazioni valgono per l'installazione. La proprietà in Impostazioni progetto → Connessioni vale per un progetto. Salvato e Proprietà selezionata confermano solo la configurazione. Verifica l'accesso nei report Rendimento di ricerca o Analytics. Analytics mostra fuso orario e valuta della proprietà. La selezione non installa il monitoraggio sul sito.

## Account di servizio o OAuth

Attiva Search Console API e, per Analytics, Admin API e Data API in Google Cloud. Crea un account di servizio e scarica la chiave JSON. In Impostazioni → Account di servizio seleziona il file o usa l'incolla mascherato, poi salva. La chiave privata resta nascosta. Aggiungi l'indirizzo mostrato con accesso Completo in Search Console e Visualizzatore in Analytics. Scegli quindi la proprietà nel progetto.

Per OAuth crea un client Web application. Registra esattamente entrambi gli URL di callback mostrati, salva ID e segreto e autorizza il conto dalle connessioni del progetto. Un account di servizio salvato ha priorità.

## Recupero

Un errore conserva l'elenco precedente; un elenco vuoto da solo non prova l'assenza di diritti. Ricollega autorizzazioni scadute, verifica i permessi per accesso negato e il progetto Cloud per API inattive. Attendi per i limiti. Per errori sconosciuti riprova e usa la diagnostica Aiuto. Eliminare credenziali qui non le revoca in Google. Cambiare dominio conserva collegamento e storico.
