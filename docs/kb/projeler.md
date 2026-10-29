---
title: Projeler
description: Sitelerinizi projelerle yönetin. Her sitenin Search Console ve Analytics bağlantılarını, denetimlerini ve raporlarını ayrı inceleyin.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-28
---

Projeler, hangi siteyi açacağınızı ve hangi bağlantıyı tamamlayacağınızı gösterir. Her sitenin Search Console, Analytics, denetim ve raporları kendi projesindedir.

## Ekranı okuyun

Birden fazla proje varsa ad veya alan adıyla arayın, ada veya alan adına göre sıralayın. **Son açılan**, bu tarayıcıda hatırlanan son projedir; SEO durumu değildir. Site yoksa **Site ekle**, Search Console bağlantısı yoksa **Search Console bağla**, diğer durumlarda **Paneli aç** ile devam edin. **Proje bilgisi** kayıtlı notları, **Ayarlar** proje yapılandırmasını açar.

**Arama arşivi**, bu kurulumda kayıtlı Web aramalarını, tüm cihazları ve ülkeleri kapsar. Tarihler ekranda görünür. Pencere en yeni kayıtlı günde biter; bugüne kadar güncel olduğu varsayılmaz. Kayıtlı gün sayısı eksikse tıklama sayısı yalnızca bu günlerin toplamıdır. Eksik gün sıfır değildir; grafikte boşluk kalır. İki dönemin de tüm günleri kayıtlıysa değişim hesaplanır. Eşit toplamlar “Değişmedi”, sıfır tabanlı değişimler açık önceki/yeni sayılarla gösterilir. Arşiv kaynağı ayrıntılarında son kayıtlı gün ve varsa okuma zamanı vardır; kesinleşmenin hangi kanıta dayandığı eski arşivde tutulmamıştır.

Denetim, seçilen sitenin kendi alan adına aittir. Son tamamlanan denetim ile son başarısız veya süren deneme ayrı gösterilir. Bağlantının kayıtlı olması, Google verisinin başarıyla okunduğunu kanıtlamaz. Okunamayan kaynak “bağlı değil” veya sıfır sayılmaz; **Yeniden dene** kullanın. Listeyi yenilemek kimliği ve yerel verileri birlikte okur; Google çağrısı veya denetim başlatmaz.

## Proje oluşturun ve yönetin

**Yeni proje** ile ad, isteğe bağlı alan adı, ülke ve dil girin. Oluşturmak veri toplamaz. Google bağlantılarını **Ayarlar → Bağlantılar** üzerinden seçin. Genel ayarlarda adı, siteyi ve pazarı değiştirebilirsiniz. Bir projede bir Search Console ve bir Analytics mülkü bulunur.

Arşivlemek verileri silmez. **Arşivlendi → Geri al** projeyi geri getirir. Tek kalan proje arşivlenemez. Arama tıklamaları GA4 oturumları veya sorgu arşivi toplamıyla aynı ölçü değildir; farklı tarihli projeler toplanmaz.

Önceki dönem 20 tıklamadan azsa yüzde yerine tıklama farkı gösterilir. Örneğin 1’den 5’e çıkış +4 tıklamadır; küçük sayılarda bu değişim tek başına güçlü bir büyüme işareti değildir.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
