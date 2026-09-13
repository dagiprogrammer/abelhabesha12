import { Language } from '../types';

export interface TranslationDictionary {
  // Navigation & Top Bar
  saleTag: string;
  announcement: string;
  callUs: string;
  telegramContact: string;
  customOrderBtn: string;
  searchPlaceholder: string;
  cart: string;
  emptyCart: string;

  // Hero
  welcomeTag: string;
  brandName: string;
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroSubtitle: string;
  heroDesc: string;
  bulkDiscountTitle: string;
  bulkDiscountDesc: string;
  viewCatalog: string;
  fastTurnaround: string;
  pureCottonFetel: string;
  newCollectionTag: string;
  weddingCollection: string;
  melsCollection: string;
  heroCardTitle: string;
  tailoredToSize: string;
  heroFabricBadge: string;
  heroNetelaSub: string;
  heroOrderWhatsApp: string;
  heroCustomDesign: string;
  heroFeature1Title: string;
  heroFeature1Desc: string;
  heroFeature2Title: string;
  heroFeature2Desc: string;
  heroFeature3Title: string;
  heroFeature3Desc: string;
  heroHeroTag: string;
  heroHeroTagSub: string;

  // Categories & Filters
  categoriesHeader: string;
  categoriesSub: string;
  collapseView: string;
  expandView: string;
  allCategories: string;
  collectionsHeader: string;
  expandAll: string;
  collapse: string;
  clearFilter: string;
  allPill: string;
  activeFilterPrefix: string;
  showingItems: string;

  // Product Card & Badges
  bestSeller: string;
  viewFullDetails: string;
  bulkDiscountAvailable: string;
  inStock: string;
  tailoringBadge: string;
  viewDetails: string;
  orderWhatsAppShort: string;
  bestSellerBadge: string;
  featuredBadge: string;
  discountBadge: string;

  // Product Detail Page & Modal
  backToCollection: string;
  home: string;
  bespokeReady: string;
  step1ScreenshotTitle: string;
  step1ScreenshotDesc: string;
  copiedNotice: string;
  copyInfoBtn: string;
  specialPriceTag: string;
  productDescHeader: string;
  fabricTypeLabel: string;
  deliveryLabel: string;
  selectSizeLabel: string;
  needCustomFit: string;
  customFitHelp: string;
  viewDetailsShort: string;
  backToCatalog: string;
  homeBreadcrumb: string;
  share: string;
  copied: string;
  copyDressInfo: string;
  screenshotTip: string;
  productDescriptionHeader: string;
  traditionalFabric: string;
  deliveryTailoring: string;
  withinDays: string;
  selectSize: string;
  customFitPrompt: string;
  switchToStandardSize: string;
  lengthPlaceholder: string;
  chestPlaceholder: string;
  waistPlaceholder: string;
  hipsPlaceholder: string;
  notesPlaceholder: string;
  orderWhatsAppDirect: string;
  orderTelegramInbox: string;
  addToBag: string;
  addedToBag: string;
  callShopDirect: string;
  showroomAddressHeader: string;
  openEveryDay: string;
  relatedAttireHeader: string;
  relatedAttireSub: string;
  viewAllSimilar: string;
  priceLabel: string;
  handcraftedShiromeda: string;
  traditionalCraft: string;
  quickTurnaround: string;
  qualityGuarantee: string;
  premiumFabricNote: string;

  // Cart Modal
  orderBagTitle: string;
  itemsCount: string;
  clearCart: string;
  sizeLabel: string;
  customMeasurementsLabel: string;
  totalEstimated: string;
  freeConsultationNote: string;
  sendOrderWhatsApp: string;
  sendOrderTelegram: string;
  callToOrder: string;
  emptyBagPrompt: string;
  browseCatalogBtn: string;

  // Custom Tailoring Modal
  customModalTitle: string;
  customModalSubtitle: string;
  yourName: string;
  yourPhone: string;
  attireType: string;
  eventDate: string;
  preferredFabric: string;
  additionalDetails: string;
  submitCustomOrder: string;
  cancelBtn: string;

  // How to Order
  howToOrderTitle: string;
  howToOrderSubtitle: string;
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
  step4Title: string;
  step4Desc: string;
  orderNoteTitle: string;
  orderNoteDesc: string;

  // Footer
  footerAboutTitle: string;
  footerAboutDesc: string;
  popularCategoriesHeader: string;
  popularCategoriesFooter: string;
  visitOurBoutique: string;
  visitShowroomHeader: string;
  addressLabel: string;
  directLineLabel: string;
  followSocialHeader: string;
  socialFollow: string;
  allRightsReserved: string;
  thankYouNote: string;
  thankYouFooter: string;

  // Navigation Links
  navHome: string;
  navCatalog: string;
  navProducts: string;
  navAbout: string;
  navContact: string;
  navAdmin: string;

  // Ecommerce Homepage
  shopNow: string;
  shopByCategory: string;
  bestSellersTitle: string;
  newArrivalsTitle: string;
  trendingTitle: string;
  viewAllProductsBtn: string;
  bridalSpecialTitle: string;
  bridalSpecialSubtitle: string;
  shopByOccasionTitle: string;

  // About Us Page
  aboutUsTitle: string;
  aboutUsSubtitle: string;

  // Contact Us Page
  contactUsTitle: string;
  contactUsSubtitle: string;

  // Admin Panel
  adminPanelTitle: string;
  adminPanelSubtitle: string;
  addProductBtn: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  am: {
    welcomeTag: 'እንኳን ወደ አቤል ሀበሻ በደህና መጡ',
    brandName: 'አቤል ሀበሻ',
    saleTag: 'ቅናሽ',
    announcement: 'ለሰርግ እና ለጅምላ ትዕዛዞች ልዩ ቅናሽ አለን! በሺሮሜዳ በእጅ የተሰሩ ባህላዊ ልብሶች',
    callUs: 'ይደውሉልን',
    telegramContact: 'ቴሌግራም',
    customOrderBtn: 'ልዩ ትዕዛዝ (ስፌት)',
    searchPlaceholder: 'በልብስ ስም፣ በኮድ (ምሳሌ AH-1141) ወይም በጨርቅ ይፈልጉ...',
    cart: 'የትዕዛዝ ቅርጫት',
    emptyCart: 'ቅርጫቱ ባዶ ነው',

    heroBadge: 'የሺሮሜዳ እውነተኛ ባህላዊ አልባሳት አውደ-ጥበብ',
    heroTitle1: 'የኢትዮጵያ ንጉሳዊ ውበት',
    heroTitle2: 'በእጅ የተሸመነ ጥበብ',
    heroTitle3: 'ባህላዊ አልባሳት',
    heroSubtitle: 'የሰርግ እና የመልስ ቀሚሶች፣ ዘመናዊ የሺፎን አልባሳት እና የወንድ ልብሶች በሺሮሜዳ።',
    heroDesc: 'በአክሱም እና በጎጃም ንጹህ ፈተል ጥጥ በጥንቃቄ የተሰፉ የሀበሻ ቀሚሶች እና ዙሪያዎች፣ በልክዎ ሰፍተን በፍጥነት እናደርሳለን።',
    bulkDiscountTitle: 'ለሰርግ እና ለጅምላ ትዕዛዝ ልዩ ቅናሽ!',
    bulkDiscountDesc: 'ለሚዜዎች፣ ለቤተሰብ እና ለቡድን የሚሆን ተመጣጣኝ የጅምላ ዋጋ አለን።',
    viewCatalog: 'ካታሎጉን ይመልከቱ',
    fastTurnaround: 'ፈጣን ስፌት እና አቅርቦት',
    pureCottonFetel: '100% ንጹህ የአክሱም ፈተል ጥጥ',
    newCollectionTag: 'አዲስ ስብስብ',
    weddingCollection: 'የሰርግ ስብስብ',
    melsCollection: 'የመልስ ልብስ',
    heroCardTitle: 'ንጉሳዊ የወርቅ ጥልፍ የሰርግ ቀሚስ',
    tailoredToSize: 'በልክ የተሰፋ • ከተጣመረ ነጠላ ጋር',
    heroFabricBadge: 'ትክክለኛ የሺሮሜዳ ጥበብ',
    heroNetelaSub: 'ባለ ሁለት ዘርፍ ነጠላ የተሟላለት',
    heroOrderWhatsApp: 'በዋትስአፕ ይዘዙ',
    heroCustomDesign: 'የልዩ ስፌት ጥያቄ',
    heroFeature1Title: 'ፈጣን ስፌት',
    heroFeature1Desc: 'በመረጡት ቀን በልክ ተሰፍቶ ይደርሳል',
    heroFeature2Title: 'የሰርግ ቅናሽ',
    heroFeature2Desc: 'ለሚዜዎችና ለቡድን ልዩ ዋጋ',
    heroFeature3Title: '100% ንጹህ ፈተል',
    heroFeature3Desc: 'ከታወቁ የሺሮሜዳ ባለሙያዎች',
    heroHeroTag: 'አቤል ሀበሻ ባህላዊ አልባሳት',
    heroHeroTagSub: 'ሺሮሜዳ ብላቴና ሕንፃ 4ኛ ፎቅ ቢሮ 110',

    categoriesHeader: 'ስብስቦች እና ምድቦች',
    categoriesSub: 'በዝግጅት አይነት፣ በጨርቅ እና በስፌት ጥበብ ይምረጡ',
    collapseView: 'አሳጥር',
    expandView: 'ሁሉንም አሳይ',
    allCategories: 'ሁሉም ስብስቦች',
    collectionsHeader: 'ስብስቦች እና ምድቦች',
    expandAll: 'ሁሉንም አሳይ',
    collapse: 'አሳንስ',
    clearFilter: 'ማጣሪያውን አጥፋ',
    allPill: 'ሁሉም',
    activeFilterPrefix: 'የተመረጠው:',
    showingItems: 'ልብሶች ተገኝተዋል',

    bestSeller: 'ተወዳጅ ምርጥ ሽያጭ',
    viewFullDetails: 'ሙሉ መረጃ ይመልከቱ',
    bulkDiscountAvailable: 'የጅምላ ቅናሽ አለው',
    inStock: 'በመደብር ይገኛል',
    tailoringBadge: 'በልክ የሚሰፋ',
    viewDetails: 'ዝርዝር እይ',
    orderWhatsAppShort: 'በዋትስአፕ እዘዝ',
    bestSellerBadge: 'ምርጥ ሽያጭ',
    featuredBadge: 'ተመራጭ',
    discountBadge: 'ቅናሽ',

    backToCollection: 'ወደ ስብስቡ ተመለስ',
    home: 'መነሻ',
    bespokeReady: 'በልክ የሚሰፋ ወይም ዝግጁ',
    step1ScreenshotTitle: 'ደረጃ 1፡ የልብሱን ፎቶ ስክሪንሾት ያንሱ',
    step1ScreenshotDesc: 'የወደዱትን የሀበሻ ልብስ ፎቶ ስክሪንሾት በማንሳት በዋትስአፕ ወይም ቴሌግራም ይላኩልን።',
    copiedNotice: 'ተገልብጧል!',
    copyInfoBtn: 'መረጃ ቅዳ',
    specialPriceTag: 'ልዩ ዋጋ',
    productDescHeader: 'የልብሱ ዝርዝር መግለጫ እና ጥበብ',
    fabricTypeLabel: 'የጨርቅ አይነት',
    deliveryLabel: 'የስፌት ጊዜ እና ማድረሻ',
    selectSizeLabel: 'መጠን ወይም በልክ የሚሰፋ ይምረጡ',
    needCustomFit: 'የሰውነት ልክ ማስገባት ይፈልጋሉ?',
    customFitHelp: 'ቁመትዎን፣ ደረትዎን እና ወገብዎን ያስገቡ፤ በትክክለኛው ቁመናዎ እንሰፋለን።',
    viewDetailsShort: 'ዝርዝር',
    backToCatalog: 'ወደ ካታሎግ ተመለስ',
    homeBreadcrumb: 'መነሻ',
    share: 'አጋራ',
    copied: 'ተገልብጧል!',
    copyDressInfo: 'የልብሱን መረጃ ቅዳ',
    screenshotTip: 'የልብሱን ፎቶ ስክሪንሾት በማንሳት በቀጥታ በዋትስአፕ መላክ ይችላሉ።',
    productDescriptionHeader: 'የልብሱ መግለጫ',
    traditionalFabric: 'ባህላዊ ጨርቅ',
    deliveryTailoring: 'ስፌት እና ማድረሻ',
    withinDays: 'ቀናት ውስጥ',
    selectSize: 'መጠን ይምረጡ',
    customFitPrompt: 'የግል መለኪያዎን ያስገቡ',
    switchToStandardSize: 'ወደ መደበኛ መጠን ቀይር',
    lengthPlaceholder: 'ቁመት (ሳ.ሜ)',
    chestPlaceholder: 'ደረት (ሳ.ሜ)',
    waistPlaceholder: 'ወገብ (ሳ.ሜ)',
    hipsPlaceholder: 'ዳሌ (ሳ.ሜ)',
    notesPlaceholder: 'ተጨማሪ ማስታወሻ (የጥልፍ ቀለም፣ የአንገትጌ ምርጫ)...',
    orderWhatsAppDirect: 'በዋትስአፕ በቀጥታ እዘዝ',
    orderTelegramInbox: 'በቴሌግራም በቀጥታ እዘዝ',
    addToBag: 'ወደ ትዕዛዝ ቅርጫት አክል',
    addedToBag: 'ወደ ቅርጫት ገብቷል!',
    callShopDirect: 'ወደ ሱቁ በቀጥታ ይደውሉ',
    showroomAddressHeader: 'የመደብራችን አድራሻ:',
    openEveryDay: 'በየቀኑ ክፍት ነው፡ ከጠዋቱ 2:30 - ምሽት 2:00',
    relatedAttireHeader: 'ተዛማጅ ባህላዊ አልባሳት',
    relatedAttireSub: 'በተመሳሳይ የጥበብ ስልት የተሰሩ ባህላዊ ቀሚሶች',
    viewAllSimilar: 'ሁሉንም ተመልከት',
    priceLabel: 'ዋጋ',
    handcraftedShiromeda: 'የሺሮሜዳ እጅ ጥበብ',
    traditionalCraft: '100% እውነተኛ የሀገር ቅርስ',
    quickTurnaround: 'ፈጣን ማድረሻ',
    qualityGuarantee: 'አስተማማኝ ጥራት',
    premiumFabricNote: 'የተመረጡ ባህላዊ ፈተሎች',

    orderBagTitle: 'የተመረጡ አልባሳት',
    itemsCount: 'እቃዎች',
    clearCart: 'ቅርጫቱን ባዶ አድርግ',
    sizeLabel: 'መጠን:',
    customMeasurementsLabel: 'የግል ልኬት:',
    totalEstimated: 'ጠቅላላ ዋጋ:',
    freeConsultationNote: 'ለሰርግ እና ለጅምላ ትዕዛዞች ልዩ ቅናሽ ይደረጋል!',
    sendOrderWhatsApp: 'ትዕዛዙን በዋትስአፕ ላክ',
    sendOrderTelegram: 'ትዕዛዙን በቴሌግራም ላክ',
    callToOrder: 'በቀጥታ ደውለው ያረጋግጡ',
    emptyBagPrompt: 'የትዕዛዝ ቅርጫትዎ በአሁኑ ወቅት ባዶ ነው።',
    browseCatalogBtn: 'ካታሎጉን ይመልከቱ',

    customModalTitle: 'የልዩ ስፌት ትዕዛዝ መስጫ',
    customModalSubtitle: 'የሚፈልጉትን የልብስ አይነት፣ የጨርቅ ምርጫ እና ልኬትዎን ያስገቡ፤ በሺሮሜዳ ባለሙያዎች በጥራት እንሰራለን።',
    yourName: 'ሙሉ ስም',
    yourPhone: 'ስልክ ቁጥር',
    attireType: 'የልብስ አይነት (ምሳሌ፡ የሰርግ፣ የመልስ፣ የጥንድ...)',
    eventDate: 'የዝግጅቱ ቀን (መቼ እንዲደርስ ይፈልጋሉ?)',
    preferredFabric: 'የጨርቅ ምርጫ (ፈተል፣ ሳባ፣ ንክር፣ ሺፎን...)',
    additionalDetails: 'ተጨማሪ የስፌት እና የቀለም ማስታወሻ',
    submitCustomOrder: 'ትዕዛዙን በዋትስአፕ ላክ',
    cancelBtn: 'ሰርዝ',

    howToOrderTitle: 'በ4 ቀላል ደረጃዎች እንዴት ማዘዝ ይቻላል?',
    howToOrderSubtitle: 'ፈጣን፣ አስተማማኝ እና ምቹ የሆነ የባህላዊ ልብስ ግዢ ሂደት',
    step1Title: '1. ልብስ ይምረጡ',
    step1Desc: 'ከካታሎጋችን ውስጥ የሚወዱትን የሀበሻ ቀሚስ ወይም ባህላዊ ልብስ ይምረጡ።',
    step2Title: '2. ፎቶውን ስክሪንሾት ያንሱ',
    step2Desc: 'የመረጡትን ልብስ ፎቶ ስክሪንሾት ያንሱ ወይም የልብሱን ኮድ ይያዙ።',
    step3Title: '3. በዋትስአፕ ወይም ቴሌግራም ይላኩልን',
    step3Desc: 'ፎቶውን ወደ +251 913 312 314 በዋትስአፕ ወይም @AbelDesignChat በቴሌግራም ይላኩ።',
    step4Title: '4. በልክዎ ተሰፍቶ ይደርሳል',
    step4Desc: 'መለኪያዎን ተቀብለን በጥንቃቄ ሰፍተን በፍጥነት እናስረክባለን።',
    orderNoteTitle: 'ለሰርግ እና ለጅምላ ትዕዛዞች',
    orderNoteDesc: 'ለሚዜዎች፣ ለቤተሰብ እና ለቡድኖች የሚሆን ልዩ የጅምላ ቅናሽ አለን፤ በቀጥታ ይደውሉልን!',

    footerAboutTitle: 'ስለ አቤል ሀበሻ (Abel Habesha)',
    footerAboutDesc: 'አቤል ሀበሻ በሺሮሜዳ የሚገኝ ታዋቂ የባህላዊ አልባሳት መደብር ነው። እውነተኛ በእጅ የተሸመኑ የሀበሻ ቀሚሶች፣ የመልስ ልብሶች እና የጥንድ አልባሳትን በጥራት እናመርታለን።',
    popularCategoriesHeader: 'ተወዳጅ ስብስቦች',
    popularCategoriesFooter: 'ተወዳጅ ስብስቦች',
    visitOurBoutique: 'ሱቃችንን ይጎብኙ',
    visitShowroomHeader: 'የሱቅ አድራሻ እና የስራ ሰዓት',
    addressLabel: 'አድራሻ:',
    directLineLabel: 'የቀጥታ ስልክ / ዋትስአፕ:',
    followSocialHeader: 'ማህበራዊ ገጾቻችን:',
    socialFollow: 'ማህበራዊ ገጾቻችን:',
    allRightsReserved: 'መብቱ በህግ የተጠበቀ ነው።',
    thankYouNote: 'አቤል ሀበሻን ስለመረጡ እናመሰግናለን!',
    thankYouFooter: 'አቤል ሀበሻን ስለመረጡ እናመሰግናለን!',

    navHome: 'መነሻ',
    navCatalog: 'ካታሎግ',
    navProducts: 'አልባሳት',
    navAbout: 'ስለ እኛ',
    navContact: 'ያግኙን',
    navAdmin: 'አድሚን',

    shopNow: 'አሁን ይዘዙ',
    shopByCategory: 'በምድብ ይመልከቱ',
    bestSellersTitle: 'ተወዳጅ ምርጥ ሽያጮች',
    newArrivalsTitle: 'አዲስ የገቡ አልባሳት',
    trendingTitle: 'ወቅታዊ የሆኑ ልብሶች',
    viewAllProductsBtn: 'ሁሉንም ምርቶች ይመልከቱ',
    bridalSpecialTitle: 'የሰርግ እና የጅምላ ልዩ ፓኬጆች',
    bridalSpecialSubtitle: 'ለሚዜዎችና ለቡድኖች የሚሆን የተጣጣመ የጥበብ ስራ እና የጅምላ ቅናሽ',
    shopByOccasionTitle: 'በዝግጅት አይነት ይምረጡ',

    aboutUsTitle: 'ስለ አቤል ሀበሻ ባህላዊ አልባሳት',
    aboutUsSubtitle: 'በሺሮሜዳ እምብርት የሚገኝ የባህላዊ ሽመና እና ስፌት አውደ-ጥበብ',

    contactUsTitle: 'አድራሻችን እና ያግኙን',
    contactUsSubtitle: 'ወደ ሺሮሜዳ ሱቃችን ይምጡ፣ በስልክ ይደውሉ ወይም በዋትስአፕ እና ቴሌግራም ያግኙን',

    adminPanelTitle: 'የአልባሳት አስተዳደር (Admin Panel)',
    adminPanelSubtitle: 'አዳዲስ የሀበሻ ልብሶችን ይጨምሩ፣ ክምችት ያዘምኑ እና መረጃዎችን ያስተዳድሩ',
    addProductBtn: 'አዲስ ልብስ ጨምር',
  },

  ti: {
    welcomeTag: 'እንቋዕ ብደሓን መጻእኩም ናብ ኣቤል ሓበሻ',
    brandName: 'ኣቤል ሓበሻ',
    saleTag: 'ቅናሽ',
    announcement: 'ንመርዓን ንጅምላ ትእዛዛትን ፍሉይ ቅናሽ ኣለና! ኣብ ሽሮሜዳ ብኢድ ዝተሰርሑ ባህላዊ ክዳውንቲ',
    callUs: 'ደውሉልና',
    telegramContact: 'ቴሌግራም',
    customOrderBtn: 'ፍሉይ ትእዛዝ (ስፌት)',
    searchPlaceholder: 'ብስም ክዳን፣ ብኮድ (ንኣብነት AH-1141) ወይ ብዓይነት ጨርቂ ድለዩ...',
    cart: 'ናይ ትእዛዝ ቅርጫት',
    emptyCart: 'ቅርጫት ጥራዩ እዩ',

    heroBadge: 'ናይ ሽሮሜዳ ናይ ሓቂ ባህላዊ ክዳውንቲ ጥበብ',
    heroTitle1: 'ናይ ኢትዮጵያ ንጉሳዊ ጽባቐ',
    heroTitle2: 'ብኢድ ዝተሸለመ ጥበብ',
    heroTitle3: 'ባህላዊ ክዳውንቲ',
    heroSubtitle: 'ናይ መርዓን ናይ መልስን ቀሚሻት፣ ዘመናዊ ሺፎን ክዳውንቲ ኣብ ሽሮሜዳ።',
    heroDesc: 'ብናይ ኣኽሱምን ጎጃምን ጽሩይ ፈተል ጥጥ ብጥንቃቐ ዝተሰፈዩ ናይ ሓበሻ ቀሚሻትን ዙርያታትን፣ ብልክዕኩም ሰፊና ብቕልጡፍ ነብጽሕ።',
    bulkDiscountTitle: 'ንመርዓን ንጅምላ ትእዛዛትን ፍሉይ ቅናሽ!',
    bulkDiscountDesc: 'ንሚዜታትን ንቤተሰብን ዝኸውን ተመጣጣኒ ናይ ጅምላ ዋጋ ኣለና።',
    viewCatalog: 'ካታሎግ ርኣዩ',
    fastTurnaround: 'ቕልጡፍ ስፌትን ምብጻሕን',
    pureCottonFetel: '100% ጽሩይ ናይ ኣኽሱም ፈተል ጥጥ',
    newCollectionTag: 'ሓድሽ ስብስብ',
    weddingCollection: 'ናይ መርዓ ስብስብ',
    melsCollection: 'ናይ መልሲ ክዳን',
    heroCardTitle: 'ንጉሳዊ ናይ ወርቂ ጥልፊ መርዓ ቀሚሽ',
    tailoredToSize: 'ብልክዕ ዝተሰፈየ • ካብ ዝሰማማዕ ነጠላ ምስ ዝተዳለወ',
    heroFabricBadge: 'ትኽክለኛ ናይ ሽሮሜዳ ጥበብ',
    heroNetelaSub: 'ባዓል ክልተ ዘርፊ ነጠላ ዘማዕበለ',
    heroOrderWhatsApp: 'ብዋትስኣፕ እዘዙ',
    heroCustomDesign: 'ናይ ፍሉይ ስፌት ሕቶ',
    heroFeature1Title: 'ቕልጡፍ ስፌት',
    heroFeature1Desc: 'ብዝመረጽኩምዎ መዓልቲ ብልክዕኩም ተሰፍዩ ይበጽሕ',
    heroFeature2Title: 'ናይ መርዓ ቅናሽ',
    heroFeature2Desc: 'ንሚዜታትን ንጉጅለን ፍሉይ ዋጋ',
    heroFeature3Title: '100% ጽሩይ ፈተል',
    heroFeature3Desc: 'ካብ ፍሉጣት ናይ ሽሮሜዳ ክኢላታት',
    heroHeroTag: 'ኣቤል ሓበሻ ባህላዊ ክዳውንቲ',
    heroHeroTagSub: 'ሽሮሜዳ ብላቴና ህንጻ መበል 4 ደብሪ ቢሮ 110',

    categoriesHeader: 'ስብስባትን ምድባትን',
    categoriesSub: 'ብዓይነት በዓል፣ ብጨርቂን ብስፌት ጥበብን ምረጹ',
    collapseView: 'ኣሕጽር',
    expandView: 'ኩሉ ኣርኢ',
    allCategories: 'ኩሎም ስብስባት',
    collectionsHeader: 'ስብስባትን ምድባትን',
    expandAll: 'ኩሉ ኣርኢ',
    collapse: 'ኣንእስ',
    clearFilter: 'መጻረዪ ኣጥፍእ',
    allPill: 'ኩሎም',
    activeFilterPrefix: 'ዝተመረጸ:',
    showingItems: 'ክዳውንቲ ተረኺቦም',

    bestSeller: 'ተፈታዊ ዝበለጸ ሽያጥ',
    viewFullDetails: 'ሙሉእ ሓበሬታ ርኣዩ',
    bulkDiscountAvailable: 'ናይ ጅምላ ቅናሽ ኣለዎ',
    inStock: 'ኣብ ድኳን ይርከብ',
    tailoringBadge: 'ብልክዕ ዝስፈ',
    viewDetails: 'ዝርዝር ርኣይ',
    orderWhatsAppShort: 'ብዋትስኣፕ እዘዝ',
    bestSellerBadge: 'ዝበለጸ ሽያጥ',
    featuredBadge: 'ተመራጺ',
    discountBadge: 'ቅናሽ',

    backToCollection: 'ናብ ስብስብ ተመለስ',
    home: 'መበገሲ',
    bespokeReady: 'ብልክዕ ዝስፈ ወይ ድሉው',
    step1ScreenshotTitle: 'ደረጃ 1፡ ናይቲ ክዳን ፎቶ ስክሪንሾት ኣልዕሉ',
    step1ScreenshotDesc: 'ዝፈተውኩምዎ ናይ ሓበሻ ክዳን ፎቶ ስክሪንሾት ብምልዓል ብዋትስኣፕ ወይ ቴሌግራም ስደዱልና።',
    copiedNotice: 'ተቐዲሑ!',
    copyInfoBtn: 'ሓበሬታ ቅዳሕ',
    specialPriceTag: 'ፍሉይ ዋጋ',
    productDescHeader: 'ናይቲ ክዳን ዝርዝር መግለጺን ጥበብን',
    fabricTypeLabel: 'ዓይነት ጨርቂ',
    deliveryLabel: 'ናይ ስፌት ግዜን ምብጻሕን',
    selectSizeLabel: 'መጠን ወይ ብልክዕ ዝስፈ ምረጹ',
    needCustomFit: 'ናይ ሰብነትኩም ልኬት ክተእትዉ ትደልዩዶ?',
    customFitHelp: 'ቁመትኩም፣ ደረትኩምን ወገብኩምን ኣእትዉ፤ ብትኽክለኛ ቕርጽኹም ክንስፍዮ ኢና።',
    viewDetailsShort: 'ዝርዝር',
    backToCatalog: 'ናብ ካታሎግ ተመለስ',
    homeBreadcrumb: 'መበገሲ',
    share: 'ኣካፍል',
    copied: 'ተቐዲሑ!',
    copyDressInfo: 'ናይቲ ክዳን ሓበሬታ ቅዳሕ',
    screenshotTip: 'ናይቲ ክዳን ፎቶ ስክሪንሾት ብምልዓል ብቐጥታ ብዋትስኣፕ ክትሰዱ ትኽእሉ ኢኹም።',
    productDescriptionHeader: 'ናይቲ ክዳን መግለጺ',
    traditionalFabric: 'ባህላዊ ጨርቂ',
    deliveryTailoring: 'ስፌትን ምብጻሕን',
    withinDays: 'መዓልትታት ውሽጢ',
    selectSize: 'መጠን ምረጹ',
    customFitPrompt: 'ናይ ውልቂ መለክዒኹም ኣእትዉ',
    switchToStandardSize: 'ናብ ስሩዕ መጠን ቀይር',
    lengthPlaceholder: 'ቁመት (ሳ.ሜ)',
    chestPlaceholder: 'ደረት (ሳ.ሜ)',
    waistPlaceholder: 'ወገብ (ሳ.ሜ)',
    hipsPlaceholder: 'ዳሌ (ሳ.ሜ)',
    notesPlaceholder: 'ተወሳኺ መዘኻኸሪ (ናይ ጥልፊ ሕብሪ፣ ናይ ክሳድ ምርጫ)...',
    orderWhatsAppDirect: 'ብዋትስኣፕ ብቐጥታ እዘዝ',
    orderTelegramInbox: 'ብቴሌግራም ብቐጥታ እዘዝ',
    addToBag: 'ናብ ናይ ትእዛዝ ቅርጫት ወስኽ',
    addedToBag: 'ናብ ቅርጫት ኣትዩ!',
    callShopDirect: 'ናብ ድኳን ብቐጥታ ደውሉ',
    showroomAddressHeader: 'ናይ ድኳንና ኣድራሻ:',
    openEveryDay: 'ኩሉ መዓልቲ ክፍቲ እዩ፡ ካብ ንጉሆ 2:30 - ምሸት 2:00',
    relatedAttireHeader: 'ተመሳሰልቲ ባህላዊ ክዳውንቲ',
    relatedAttireSub: 'ብተመሳሳሊ ናይ ጥበብ ቅዲ ዝተሰርሑ ባህላዊ ቀሚሻት',
    viewAllSimilar: 'ኩሉ ተመልከት',
    priceLabel: 'ዋጋ',
    handcraftedShiromeda: 'ናይ ሽሮሜዳ ኢድ ጥበብ',
    traditionalCraft: '100% ናይ ሓቂ ሃገራዊ ቕርስ',
    quickTurnaround: 'ቕልጡፍ ምብጻሕ',
    qualityGuarantee: 'ውሑስ ጽሬት',
    premiumFabricNote: 'ዝተመረጹ ባህላዊ ፈተላት',

    orderBagTitle: 'ዝተመረጹ ክዳውንቲ',
    itemsCount: 'ኣቑሑት',
    clearCart: 'ቅርጫት ጥራዩ ግበር',
    sizeLabel: 'መጠን:',
    customMeasurementsLabel: 'ናይ ውልቂ ልኬት:',
    totalEstimated: 'ጠቕላላ ዋጋ:',
    freeConsultationNote: 'ንመርዓን ንጅምላ ትእዛዛትን ፍሉይ ቅናሽ ይግበር!',
    sendOrderWhatsApp: 'ትእዛዝ ብዋትስኣፕ ስደድ',
    sendOrderTelegram: 'ትእዛዝ ብቴሌግራም ስደድ',
    callToOrder: 'ብቐጥታ ደዊልኩም ኣረጋግጹ',
    emptyBagPrompt: 'ናይ ትእዛዝ ቅርጫትኩም ኣብዚ እዋን ጥራዩ እዩ።',
    browseCatalogBtn: 'ካታሎግ ርኣዩ',

    customModalTitle: 'ናይ ፍሉይ ስፌት መእዘዚ',
    customModalSubtitle: 'እትደልይዎ ዓይነት ክዳን፣ ናይ ጨርቂ ምርጫን ልኬትኩምን ኣእትዉ፤ ብናይ ሽሮሜዳ ክኢላታት ብጽሬት ክንሰርሖ ኢና።',
    yourName: 'ሙሉእ ስም',
    yourPhone: 'ቁጽሪ ስልኪ',
    attireType: 'ዓይነት ክዳን (ንኣብነት፡ ናይ መርዓ፣ ናይ መልሲ፣ ናይ መጻምድቲ...)',
    eventDate: 'ናይቲ በዓል መዓልቲ (መዓስ ክበጽሓኩም ትደልዩ?)',
    preferredFabric: 'ናይ ጨርቂ ምርጫ (ፈተል፣ ሳባ፣ ንክር፣ ሺፎን...)',
    additionalDetails: 'ተወሳኺ ናይ ስፌትን ሕብርን መዘኻኸሪ',
    submitCustomOrder: 'ትእዛዝ ብዋትስኣፕ ስደድ',
    cancelBtn: 'ሰርዝ',

    howToOrderTitle: 'ብ4 ቀለልቲ ደረጃታት ብኸመይ ምእዛዝ ይከኣል?',
    howToOrderSubtitle: 'ቕልጡፍ፣ ውሑስን ምቹእን ዝኾነ ናይ ባህላዊ ክዳን ዕዳጋ',
    step1Title: '1. ክዳን ምረጹ',
    step1Desc: 'ካብ ካታሎግና ዝፈተውኩምዎ ናይ ሓበሻ ቀሚሽ ወይ ባህላዊ ክዳን ምረጹ።',
    step2Title: '2. ፎቶ ስክሪንሾት ኣልዕሉ',
    step2Desc: 'ዝመረጽኩምዎ ክዳን ፎቶ ስክሪንሾት ኣልዕሉ ወይ ናይቲ ክዳን ኮድ ሓዙ።',
    step3Title: '3. ብዋትስኣፕ ወይ ቴሌግራም ስደዱልና',
    step3Desc: 'ፎቶ ናብ +251 913 312 314 ብዋትስኣፕ ወይ @AbelDesignChat ብቴሌግራም ስደዱ።',
    step4Title: '4. ብልክዕኩም ተሰፍዩ ይበጽሕ',
    step4Desc: 'መለክዒኹም ተቐቢልና ብጥንቃቐ ሰፊና ብቕልጡፍ ነረክብ።',
    orderNoteTitle: 'ንመርዓን ንጅምላ ትእዛዛትን',
    orderNoteDesc: 'ንሚዜታትን ንቤተሰብን ዝኸውን ፍሉይ ናይ ጅምላ ቅናሽ ኣለና፤ ብቐጥታ ደውሉልና!',

    footerAboutTitle: 'ብዛዕባ ኣቤል ሓበሻ (Abel Habesha)',
    footerAboutDesc: 'ኣቤል ሓበሻ ኣብ ሽሮሜዳ ዝርከብ ፍሉጥ ናይ ባህላዊ ክዳውንቲ ድኳን እዩ። ብኢድ ዝተሸለሙ ናይ ሓበሻ ቀሚሻት፣ ናይ መልሲ ክዳውንትን ናይ መጻምድቲ ኣልባሳትን ብጽሬት ነፍሪ።',
    popularCategoriesHeader: 'ተፈተውቲ ስብስባት',
    popularCategoriesFooter: 'ተፈተውቲ ስብስባት',
    visitOurBoutique: 'ድኳንና ዑደቱ',
    visitShowroomHeader: 'ናይ ድኳን ኣድራሻን ናይ ስራሕ ሰዓትን',
    addressLabel: 'ኣድራሻ:',
    directLineLabel: 'ቀጥታዊ ስልኪ / ዋትስኣፕ:',
    followSocialHeader: 'ማሕበራዊ ገጻትና:',
    socialFollow: 'ማሕበራዊ ገጻትና:',
    allRightsReserved: 'መሰሉ ብሕጊ ዝተሓለወ እዩ።',
    thankYouNote: 'ንኣቤል ሓበሻ ስለዝመረጽኩም ነመስግን!',
    thankYouFooter: 'ንኣቤል ሓበሻ ስለዝመረጽኩም ነመስግን!',

    navHome: 'መበገሲ',
    navCatalog: 'ካታሎግ',
    navProducts: 'ክዳውንቲ',
    navAbout: 'ብዛዕባና',
    navContact: 'ርኸቡና',
    navAdmin: 'ኣድሚን',

    shopNow: 'ሕጂ እዘዙ',
    shopByCategory: 'ብምድብ ተመልከቱ',
    bestSellersTitle: 'ተፈተውቲ ዝበለጹ ሽያጣት',
    newArrivalsTitle: 'ሓደስቲ ዝኣተዉ ክዳውንቲ',
    trendingTitle: 'ወቅታዊ ዝኾኑ ክዳውንቲ',
    viewAllProductsBtn: 'ኩሎም ፍርያት ርኣዩ',
    bridalSpecialTitle: 'ናይ መርዓን ናይ ጅምላን ፍሉይ ፓኬጃት',
    bridalSpecialSubtitle: 'ንሚዜታትን ንጉጅለታትን ዝኸውን ዝተሰማምዐ ናይ ጥበብ ስራሕን ናይ ጅምላ ቅናሽን',
    shopByOccasionTitle: 'ብዓይነት በዓል ምረጹ',

    aboutUsTitle: 'ብዛዕባ ኣቤል ሓበሻ ባህላዊ ክዳውንቲ',
    aboutUsSubtitle: 'ኣብ ሽሮሜዳ ዝርከብ ናይ ባህላዊ ሽመናን ስፌትን ጥበብ',

    contactUsTitle: 'ኣድራሻናን ርኸቡናን',
    contactUsSubtitle: 'ናብ ሽሮሜዳ ድኳንና ምጹ፣ ብስልኪ ደውሉ ወይ ብዋትስኣፕን ቴሌግራምን ርኸቡና',

    adminPanelTitle: 'ምሕደራ ክዳውንቲ (Admin Panel)',
    adminPanelSubtitle: 'ሓደስቲ ናይ ሓበሻ ክዳውንቲ ወስኹ፣ ክምችት ኣሐድሱ፣ ሓበሬታታት ኣመሓድሩ',
    addProductBtn: 'ሓድሽ ክዳን ወስኽ',
  },

  en: {
    welcomeTag: 'Welcome to Abel Habesha Traditional Attire',
    brandName: 'Abel Habesha',
    saleTag: 'SALE',
    announcement: 'Special discounts for bulk & bridal orders! Bespoke tailoring in Shiromeda',
    callUs: 'Call Us',
    telegramContact: 'Telegram',
    customOrderBtn: 'Custom Tailoring',
    searchPlaceholder: 'Search by dress name, fabric, or tag (e.g., #Wedding, Chiffon, AH-1141)...',
    cart: 'Order Bag',
    emptyCart: 'Bag is empty',

    heroBadge: 'Authentic Shiromeda Habesha Craftsmanship',
    heroTitle1: 'Timeless Ethiopian Grace',
    heroTitle2: 'Masterfully Woven',
    heroTitle3: 'Traditional Attire',
    heroSubtitle: 'Handcrafted Habesha Kemis, flowing Chiffon dresses & bespoke traditional wear made in Shiromeda. Custom measurements with fast delivery.',
    heroDesc: 'Handcrafted Habesha Kemis, flowing Chiffon dresses & bespoke traditional wear made in Shiromeda. Custom measurements with fast delivery.',
    bulkDiscountTitle: 'Special discounts for bulk & bridal orders!',
    bulkDiscountDesc: 'Exclusive package pricing for wedding parties, maid of honors and coordinating family sets.',
    viewCatalog: 'View Catalog',
    fastTurnaround: 'Fast Turnaround',
    pureCottonFetel: '100% Pure Handspun Fetel',
    newCollectionTag: 'New Collection',
    weddingCollection: 'Wedding 2025',
    melsCollection: 'Meles Design',
    heroCardTitle: 'Royal Golden Bridal Habesha Kemis',
    tailoredToSize: 'Custom Tailored • Matching Netela Included',
    heroFabricBadge: 'Authentic Shiromeda Fetel',
    heroNetelaSub: 'Handwoven Tibeb & Netela Scarf',
    heroOrderWhatsApp: 'Order via WhatsApp',
    heroCustomDesign: 'Request Custom Fit',
    heroFeature1Title: 'Fast Turnaround',
    heroFeature1Desc: 'Handcrafted quickly to your timeline',
    heroFeature2Title: 'Bulk & Bridal Discounts',
    heroFeature2Desc: 'Special rates for wedding parties',
    heroFeature3Title: '100% Handspun Cotton',
    heroFeature3Desc: 'Direct from Axum & Gojjam weavers',
    heroHeroTag: 'Abel Habesha Traditional Attire',
    heroHeroTagSub: 'Shiromeda Blatena Building 4th Fl. Office 110',

    categoriesHeader: 'Collections & Categories',
    categoriesSub: 'Browse by occasion, fabric, or heritage style',
    collapseView: 'Collapse',
    expandView: 'Expand All',
    allCategories: 'All Collections',
    collectionsHeader: 'Collections & Categories',
    expandAll: 'Expand All',
    collapse: 'Collapse',
    clearFilter: 'All Attire',
    allPill: 'All',
    activeFilterPrefix: 'Filtering by:',
    showingItems: 'styles available',

    bestSeller: 'Bestseller',
    viewFullDetails: 'View Details',
    bulkDiscountAvailable: 'Bulk discount available',
    inStock: 'In Showroom',
    tailoringBadge: 'Bespoke Fit',
    viewDetails: 'View Details',
    orderWhatsAppShort: 'WhatsApp',
    bestSellerBadge: 'Bestseller',
    featuredBadge: 'Featured',
    discountBadge: 'Special Offer',

    backToCollection: 'Back to Collection',
    home: 'Home',
    bespokeReady: 'Bespoke Tailored or Ready-to-Wear',
    step1ScreenshotTitle: 'Step 1: Take a screenshot of this dress',
    step1ScreenshotDesc: 'Capture a screenshot or copy the item code, then message our team on WhatsApp or Telegram.',
    copiedNotice: 'Copied!',
    copyInfoBtn: 'Copy Details',
    specialPriceTag: 'Special Price',
    productDescHeader: 'Product Description & Craftsmanship',
    fabricTypeLabel: 'Fabric Type',
    deliveryLabel: 'Tailoring & Delivery',
    selectSizeLabel: 'Select Size or Fit',
    needCustomFit: 'Need custom measurements?',
    customFitHelp: 'Enter your body measurements (length, chest, waist); we tailor it to your exact silhouette.',
    viewDetailsShort: 'View Details',
    backToCatalog: 'Back to Collection',
    homeBreadcrumb: 'Home',
    share: 'Share',
    copied: 'Copied!',
    copyDressInfo: 'Copy Dress Info',
    screenshotTip: 'Step 1: Take a screenshot of this dress to message our store team directly.',
    productDescriptionHeader: 'Product Description & Craftsmanship',
    traditionalFabric: 'Traditional Fabric',
    deliveryTailoring: 'Delivery / Tailoring',
    withinDays: 'days',
    selectSize: 'Select Size or Custom Fit',
    customFitPrompt: 'Need custom measurements?',
    switchToStandardSize: 'Switch to Standard Size',
    lengthPlaceholder: 'Length (cm)',
    chestPlaceholder: 'Chest (cm)',
    waistPlaceholder: 'Waist (cm)',
    hipsPlaceholder: 'Hips (cm)',
    notesPlaceholder: 'Additional requests (colors, embroidery changes, notes)...',
    orderWhatsAppDirect: 'Order on WhatsApp',
    orderTelegramInbox: 'Order on Telegram',
    addToBag: 'Add to Order Bag',
    addedToBag: 'Added to Order Bag!',
    callShopDirect: 'Call Showroom Directly',
    showroomAddressHeader: 'Store Showroom Address:',
    openEveryDay: 'Open Mon - Sun: 8:30 AM - 8:00 PM',
    relatedAttireHeader: 'You May Also Like',
    relatedAttireSub: 'Similar traditional attire handcrafted in Shiromeda',
    viewAllSimilar: 'View all',
    priceLabel: 'Price',
    handcraftedShiromeda: 'Shiromeda Handcrafted',
    traditionalCraft: '100% Authentic Heritage',
    quickTurnaround: 'Quick Turnaround',
    qualityGuarantee: 'Quality Assured',
    premiumFabricNote: 'Premium Fabric',

    orderBagTitle: 'Selected Attire',
    itemsCount: 'items',
    clearCart: 'Clear All',
    sizeLabel: 'Size:',
    customMeasurementsLabel: 'Custom Fit:',
    totalEstimated: 'Estimated Total:',
    freeConsultationNote: 'Special group discounts apply for bridal parties and bulk orders!',
    sendOrderWhatsApp: 'Send Order via WhatsApp',
    sendOrderTelegram: 'Send Order via Telegram',
    callToOrder: 'Call Store Directly to Confirm',
    emptyBagPrompt: 'Your order bag is currently empty.',
    browseCatalogBtn: 'Browse Collection',

    customModalTitle: 'Bespoke Custom Tailoring Order',
    customModalSubtitle: 'Tell us your dream design, colors, and body measurements. Our master tailors in Shiromeda will create your dress to perfection.',
    yourName: 'Full Name',
    yourPhone: 'Phone Number',
    attireType: 'Attire Type (e.g., Wedding Kemis, Couple Set, Mens Tunic)',
    eventDate: 'Occasion Date (When do you need it?)',
    preferredFabric: 'Preferred Fabric (Handspun Fetil, Saba, Nkr, Chiffon)',
    additionalDetails: 'Design details, embroidery style, and measurements',
    submitCustomOrder: 'Send Request via WhatsApp',
    cancelBtn: 'Cancel',

    howToOrderTitle: 'How to Order in 4 Easy Steps',
    howToOrderSubtitle: 'Fast, secure and personalized traditional attire shopping',
    step1Title: '1. Choose Your Attire',
    step1Desc: 'Browse our catalog and pick your favorite Habesha Kemis or outfit.',
    step2Title: '2. Screenshot or Copy Details',
    step2Desc: 'Take a screenshot of the dress or copy the item code.',
    step3Title: '3. Message us on WhatsApp or Telegram',
    step3Desc: 'Send the photo to +251 913 312 314 on WhatsApp or @AbelDesignChat on Telegram.',
    step4Title: '4. Tailored & Delivered',
    step4Desc: 'Crafted to your exact size and delivered within quick turnaround days.',
    orderNoteTitle: 'For Bulk & Bridal Orders',
    orderNoteDesc: 'We offer special volume discounts for wedding parties, maid of honors and cultural groups. Call us directly!',

    footerAboutTitle: 'About Abel Habesha (አቤል ሀበሻ)',
    footerAboutDesc: 'Abel Habesha is a premier traditional clothing boutique based in Shiromeda, Addis Ababa. We specialize in authentic handwoven Habesha Kemis, Meles, couple sets, and bespoke embroidery crafted by master Ethiopian artisans.',
    popularCategoriesHeader: 'Popular Collections',
    popularCategoriesFooter: 'Popular Collections',
    visitOurBoutique: 'Showroom & Contact',
    visitShowroomHeader: 'Showroom & Contact',
    addressLabel: 'Address:',
    directLineLabel: 'Direct Line / WhatsApp:',
    followSocialHeader: 'Official Social Channels:',
    socialFollow: 'Official Social Channels:',
    allRightsReserved: 'All rights reserved.',
    thankYouNote: 'Thank you for choosing Abel Habesha!',
    thankYouFooter: 'Thank you for choosing Abel Habesha!',

    navHome: 'Home',
    navCatalog: 'Catalog',
    navProducts: 'Products',
    navAbout: 'About Us',
    navContact: 'Contact Us',
    navAdmin: 'Admin Panel',

    shopNow: 'Shop Now',
    shopByCategory: 'Shop by Category',
    bestSellersTitle: 'Best Sellers',
    newArrivalsTitle: 'New Arrivals',
    trendingTitle: 'Trending Styles',
    viewAllProductsBtn: 'View All Products',
    bridalSpecialTitle: 'Bridal & Group Specials',
    bridalSpecialSubtitle: 'Coordinated wedding party packages, bridesmaid discounts & express tailoring',
    shopByOccasionTitle: 'Shop by Occasion',

    aboutUsTitle: 'About Abel Habesha Traditional Attire',
    aboutUsSubtitle: 'Preserving timeless Ethiopian weaving heritage in the heart of Shiromeda, Addis Ababa',

    contactUsTitle: 'Contact & Visit Us',
    contactUsSubtitle: 'Visit our Shiromeda showroom, call directly, or reach out via WhatsApp & Telegram',

    adminPanelTitle: 'Product Management (Admin Panel)',
    adminPanelSubtitle: 'Add new Habesha attire, update stock and manage your catalog',
    addProductBtn: 'Add New Attire',
  },
};

export function getTranslation(lang: Language = 'en'): TranslationDictionary {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

export function getProductName(product: { nameAm: string; nameEn: string; nameTi?: string }, lang: Language): string {
  if (lang === 'ti') return product.nameTi || product.nameAm;
  if (lang === 'en') return product.nameEn;
  return product.nameAm;
}

export function getProductFabric(product: { fabricAm: string; fabricEn: string; fabricTi?: string }, lang: Language): string {
  if (lang === 'ti') return product.fabricTi || product.fabricAm;
  if (lang === 'en') return product.fabricEn;
  return product.fabricAm;
}

export function getProductDescription(product: { descriptionAm: string; descriptionEn: string; descriptionTi?: string }, lang: Language): string {
  if (lang === 'ti') return product.descriptionTi || product.descriptionAm;
  if (lang === 'en') return product.descriptionEn;
  return product.descriptionAm;
}
