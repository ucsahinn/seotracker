---
title: Projeler
description: Sitelerinizi projelerle yönetin. Her sitenin Search Console ve Analytics bağlantılarını, denetimlerini ve raporlarını ayrı inceleyin.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-28
---

Her proje tek bir siteyi temsil eder. Search Console ve Analytics bağlantıları, denetimler, kayıtlı kelimeler ve raporlar projeye aittir; projeler arasında karışmaz.

## Proje listesi

Birden fazla projeniz varsa **Proje ara** kutusuyla ad ya da alan adına göre arayın; **Sırala** ile ada ya da alan adına göre sıralayın. **Son açılan** etiketi bu tarayıcıda en son açtığınız projeyi gösterir; SEO durumuyla ilgisi yoktur.

Her proje kartındaki ana düğme, eksik olan adıma göre değişir:

- Site yoksa **Site ekle**.
- Search Console bağlı değilse **Search Console bağla**.
- Her şey yerindeyse **Paneli aç**.

**Proje bilgisi** kayıtlı notları, **Ayarlar** projenin yapılandırmasını açar.

## Kartta görünen bilgiler

**Arama arşivi**, bu kurulumun kaydettiği Search Console verisidir: Web araması, tüm cihazlar ve ülkeler. Pencere en yeni kayıtlı günde biter; bugüne kadar güncel olduğu varsayılmaz. **Son kayıtlı gün** ve **Son arşiv okuması** kartın kaynak ayrıntılarında yazar. Eski arşivlerde Google'ın veriyi hangi tarihte kesinleştirdiği kayıtlı değildir; bu durumda **Kesinleşme kaynağı arşivde kayıtlı değil** görünür.

Tıklama sayısını okurken:

- Bazı günler eksikse toplam yalnızca kayıtlı günleri kapsar. Eksik gün sıfır sayılmaz; grafikte boşluk kalır.
- Değişim yalnızca iki dönemin tüm günleri kayıtlıysa hesaplanır. Toplamlar eşitse **Değişmedi** yazar.
- Önceki dönem 20 tıklamadan azsa yüzde yerine fark yazılır: **1 → 5 tıklama** gibi. Küçük sayılarda bu fark tek başına güçlü bir büyüme işareti değildir.

Bu tıklamalar GA4 oturumlarıyla aynı ölçü değildir. Farklı tarih aralıklarındaki projelerin sayılarını toplamayın.

Denetim satırı yalnızca bu sitenin kendi alan adındaki denetimleri gösterir. **Son denetim** ile süren ya da başarısız son deneme ayrı satırlarda durur.

**Bağlantı kayıtlı** rozeti, Google verisinin okunabildiğini göstermez. Okunamayan bir kaynak "bağlı değil" ya da sıfır sayılmaz; **Okunamadı** yazar ve **Yeniden dene** önerilir. Listeyi yenilemek yalnızca yerel kaydı okur; Google'a istek göndermez, denetim başlatmaz.

## Yeni proje

**Yeni proje** düğmesine basın ve şunları girin: ad, isteğe bağlı alan adı, ülke ve dil. **Proje oluştur** yalnızca kaydı açar; veri toplamaz. Ardından **Proje ayarları → Bağlantılar** altında bir Search Console ve bir Analytics mülkü seçin. Her projede her birinden en fazla bir mülk olur.

## Proje ayarları

**Proje ayarları → Genel** altında adı, siteyi, ülkeyi ve dili değiştirebilirsiniz. Ülke ve dil, kayıtlı kelimelerin varsayılan pazarıdır. Alan adını değiştirmek seçili Google mülkünü ya da geçmiş veriyi değiştirmez.

## Arşivleme

**Projeyi arşivle** projeyi listeden kaldırır, verisini silmez. Arşivlenen projeyi **Arşivlendi** listesinden **Geri al** ile geri getirirsiniz. Tek projenizi arşivleyemezsiniz.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/server/features/projects/services/ProjectOverviewService.ts -->
