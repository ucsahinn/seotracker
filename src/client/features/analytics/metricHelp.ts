/** Plain-language meanings for the Google Analytics figures shown to beginners. */
export const GA4_HELP = {
  keyEvents:
    "Sizin 'önemli' saydığınız hareket, örneğin form gönderme ya da satın alma. Tanımlı değilse hep 0 görünür.",
  keyEventRate:
    "Oturumların yüzde kaçında önemli saydığınız bir hareket (anahtar olay) gerçekleşti. Anahtar olay tanımlı değilse hep %0 görünür.",
  engagementRate:
    "Ziyaretçinin sayfada vakit geçirip bir şey yaptığı oturumların yüzdesi.",
  activeUsers:
    "Seçilen aralıkta siteyle gerçekten etkileşime giren (sayfada vakit geçiren ya da bir şey yapan) kişi sayısı.",
} as const;

/** Help text for a report column, when it is one beginners tend to trip on. */
export function ga4ColumnHelp(field: string): string | undefined {
  switch (field) {
    case "keyEvents":
      return GA4_HELP.keyEvents;
    case "sessionKeyEventRate":
      return GA4_HELP.keyEventRate;
    case "engagementRate":
      return GA4_HELP.engagementRate;
    case "activeUsers":
      return GA4_HELP.activeUsers;
    default:
      return undefined;
  }
}
