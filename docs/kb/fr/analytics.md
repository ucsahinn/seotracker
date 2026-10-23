---
title: Analytics
description: Vous voyez ce que font ensuite, sur le site, les visiteurs venus de la recherche. Vous consultez ici les rapports Google Analytics 4, les événements clés et le bon fonctionnement de la mesure.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-22
---

Vous voyez ici ce que font ensuite les personnes qui arrivent sur le site. Search Console vous dit ce qui se passe sur Google. Analytics vous dit ce que fait le visiteur sur le site.

Vous voyez sept rapports de votre compte Google Analytics 4. Par défaut, l'écran n'affiche que les visiteurs venus de la recherche (recherche organique). Le huitième onglet vérifie la mesure elle-même : le compteur fonctionne-t-il, un événement clé est-il défini.

## Ce que l'écran affiche

**Onglets.** **Giriş sayfaları** (Pages d'entrée), **Sayfa performansı** (Performance des pages), **Trafik kaynakları** (Sources de trafic), **Anahtar olaylar** (Événements clés), **E-ticaret** (E-commerce), **Site içi arama** (Recherche interne), **Kitle dağılımı** (Répartition de l'audience) et **Ölçüm durumu** (État de la mesure). Une courte question est écrite sous chaque onglet. Une page d'entrée est la première page où le visiteur arrive sur le site. Un événement clé est une action que vous jugez importante.

**Commandes.** Pour **Dönem** (Période), on choisit 7 derniers jours, 28 derniers jours ou 3 derniers mois. Pour **Kanal** (Canal), on choisit Organik arama (Recherche organique, par défaut) ou Tüm trafik (Tout le trafic). **Satır** (Lignes) vaut 50, 100 ou 200. Dans l'onglet Audience, on choisit **Cihaz** (Appareil), **Ülke** (Pays) et **Yeni / geri dönen** (Nouveaux / récurrents). Dans l'onglet Trafic, on choisit **Kanal grubu** (Groupe de canaux), **Kaynak / ortam** (Source / support) et **Kampanya** (Campagne). Vos choix sont inscrits dans la barre d'adresse.

**Panneau des sessions organiques.** Dans l'onglet Pages d'entrée, il se trouve au-dessus du tableau. Une session est une visite entière. Le panneau comporte la courbe des sessions quotidiennes et les cartes **Oturum** (Sessions) et **Etkileşim oranı** (Taux d'engagement). Si le revenu est mesuré, **Organik gelir** (Revenu organique) apparaît aussi. Toutes montrent aussi la variation par rapport à la période précédente.

**Tableau.** Les colonnes changent selon le rapport. Par exemple **Alan adı** (Nom de domaine), **Giriş sayfası** (Page d'entrée), **Sayfa** (Page), **Olay** (Événement), **Kanal** (Canal), **Cihaz** (Appareil), **Ülke** (Pays), **Ürün** (Produit), **Arama terimi** (Terme de recherche). Les mesures sont : **Oturum** (Sessions), **Aktif kullanıcı** (Utilisateurs actifs), **Etkileşim oranı** (Taux d'engagement), **Anahtar olay** (Événements clés), **Gelir** (Revenu), **Görüntülenme** (Vues). Si aucun événement clé n'est défini, la valeur reste toujours à 0.

**Ligne sous le tableau.** Elle indique combien de lignes sont affichées. Si Google a échantillonné les données, « örneklenmiş » (échantillonné) est ajouté ; s'il a masqué des lignes pour des raisons de confidentialité, « eşik altı satırlar gizlendi » (lignes sous le seuil masquées) est ajouté.

**Filtres rapides.** **Sadece organik** (Organique seulement), **Etkileşimi düşük** (Engagement faible, sous 50 pour cent), **Dönüşümü olan** (Avec conversions), **Geliri olan** (Avec revenu), **Etkileşim süresi düşük** (Durée d'engagement faible), **Trafiği yüksek, dönüşümü düşük** (Trafic élevé, conversions faibles).

**Cartes de synthèse.** Les onglets Événements clés, E-commerce et Recherche interne ont chacun leurs cartes de synthèse.

**Onglet État de la mesure.** Il comporte quatre cartes : **Web veri akışı** (Flux de données Web), **Anahtar olay** (Événement clé), **Özel boyut** (Dimension personnalisée), **Bulgu** (Constat). Le constat peut être l'un de ceux-ci : « Web veri akışı yok » (Pas de flux de données Web), « Gelişmiş ölçüm kapalı » (Mesure améliorée désactivée), « Site içi arama ölçülmüyor » (La recherche interne n'est pas mesurée), « Anahtar olay tanımlı değil » (Aucun événement clé défini), « Envanter eksik olabilir » (L'inventaire est peut-être incomplet). Les sept options de la mesure améliorée apparaissent une à une : Défilement (Kaydırma), Lien sortant (Dış bağlantı), Recherche interne (Site içi arama), Vidéo (Video), Téléchargement de fichier (Dosya indirme), Formulaire (Form), Changements de page (Sayfa geçişleri). S'il n'y a aucun problème, l'écran indique « Ölçüm kurulumunda eksik bulunamadı. » (Aucun manque trouvé dans la configuration de la mesure.).

**États vides.** S'il n'y a pas de données, l'écran indique « Bu dönemde veri yok » (Pas de données sur cette période) et deux raccourcis apparaissent : **Tüm trafiğe bak** (Voir tout le trafic), **Ölçüm durumunu kontrol et** (Vérifier l'état de la mesure). Si Analytics n'est pas connecté, il indique « Google Analytics bağlı değil » (Google Analytics n'est pas connecté).

## Comment l'utiliser

1. Regardez d'abord l'onglet **Ölçüm durumu**. S'il indique « Anahtar olay tanımlı değil », les colonnes de conversion restent toujours à zéro. Définissez d'abord un événement clé dans Analytics.
2. Dans l'onglet **Giriş sayfaları**, regardez la colonne **Alan adı**. Si vous voyez localhost ou 127.0.0.1, c'est qu'un site de test sur votre propre ordinateur envoie des données. Ces lignes ne sont pas de vraies visites. L'application ne les écarte pas à votre place.
3. Si le trafic a baissé, ouvrez l'onglet **Trafik kaynakları** avec **Kanal grubu**. Si la baisse ne concerne que la recherche, le problème est dans la recherche. Si elle touche tous les canaux, le problème est dans la mesure ou dans le site.
4. Le bouton **Trafiği yüksek, dönüşümü düşük** montre les endroits où Google envoie des visiteurs mais où la page ne parvient pas à les retenir. Le travail à faire se trouve dans l'écran Opportunités.

## Comment les chiffres sont calculés

La plage se termine hier, dans le fuseau horaire du compte. Analytics fournit les données avec un jour de retard. Quand « Organik arama » est choisi, seules les visites venues de Google ou d'un autre moteur de recherche sont comptées.

Chaque rapport demande 200 lignes au maximum. L'état de la mesure lit les réglages d'Analytics et ne consomme rien du quota de rapports. Si le quota de rapports est épuisé, vous voyez l'erreur « Google Analytics reporting quota is exhausted. » (le quota de rapports d'Analytics est épuisé). Vous suivez votre quota dans la section des limites de **Ayarlar**.

## Questions fréquentes

**Pourquoi le nombre de sessions diffère-t-il des clics de Search Console ?** Les deux ne comptent pas la même chose. Search Console compte les clics sur Google. Analytics compte les sessions qui arrivent sur le site. Un visiteur qui n'accepte pas les cookies n'apparaît jamais dans Analytics.

**Le nombre de lignes reste bloqué à 200.** On demande au plus 200 lignes à la fois. Raccourcissez la période ou changez la ventilation.

**Pourquoi le quota est-il épuisé ?** Un compte standard reçoit 200 000 jetons (l'unité de quota) par jour et 40 000 par heure. Chaque rapport consomme quelques jetons. Appuyer sans arrêt sur **Yenile** (Actualiser) épuise le quota.

## Limites

Ce que Analytics ne mesure pas, cet écran ne peut pas l'afficher non plus. Cela inclut les visites sans accord pour les cookies, les événements clés non définis et la mesure améliorée désactivée. L'écran n'écarte pas tout seul le trafic localhost. Analytics et Search Console rapportent dans des fuseaux horaires différents. Les correspondances quotidiennes peuvent se décaler d'un jour.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
