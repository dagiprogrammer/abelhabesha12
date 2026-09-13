import { Category, Language } from '../types';

export const CATEGORY_GROUPS = [
  {
    id: 'all',
    nameAm: 'ሁሉም አልባሳት',
    nameTi: 'ኩሎም ክዳውንቲ',
    nameEn: 'All Attire',
    shortAm: 'ሁሉም',
    shortTi: 'ኩሎም',
    shortEn: 'All',
  },
  {
    id: 'events',
    nameAm: 'የሰርግ እና ዝግጅቶች',
    nameTi: 'ናይ መርዓን በዓላትን',
    nameEn: 'Weddings & Events',
    shortAm: 'ዝግጅቶች',
    shortTi: 'በዓላት',
    shortEn: 'Events',
  },
  {
    id: 'men_couples',
    nameAm: 'የጥንድ እና የወንዶች',
    nameTi: 'ናይ መጻምድትን ደቂ ተባዕትዮን',
    nameEn: 'Couples & Men',
    shortAm: 'ጥንድ/ወንድ',
    shortTi: 'ጥንድ/ወዲ',
    shortEn: 'Couples/Men',
  },
  {
    id: 'heritage_fabrics',
    nameAm: 'ባህላዊ ጨርቆች እና ሺፎን',
    nameTi: 'ባህላዊ ፈተልን ሺፎንን',
    nameEn: 'Traditional Fabrics & Chiffon',
    shortAm: 'ጨርቆች',
    shortTi: 'ፈተል',
    shortEn: 'Fabrics',
  },
] as const;

export const CATEGORIES: Category[] = [
  // ክልል 1: ዝግጅቶችና በዓላት (Events & Celebrations)
  {
    id: 'wedding',
    tag: '#የሰርግ_ልብስ',
    nameAm: 'የሰርግ ባህላዊ ልብስ',
    nameTi: 'ናይ መርዓ ባህላዊ ክዳን',
    nameEn: 'Wedding Dresses',
    shortAm: 'ሰርግ',
    shortTi: 'መርዓ',
    shortEn: 'Wedding',
    group: 'events',
  },
  {
    id: 'meles',
    tag: '#የመልስ_ልብስ',
    nameAm: 'የመልስ ባህላዊ ልብስ',
    nameTi: 'ናይ መልሲ ባህላዊ ክዳን',
    nameEn: 'Meles Attire',
    shortAm: 'መልስ',
    shortTi: 'መልሲ',
    shortEn: 'Meles',
    group: 'events',
  },
  {
    id: 'shimgilina',
    tag: '#የሽምግልና_ልብስ',
    nameAm: 'የሽምግልና ባህላዊ ልብስ',
    nameTi: 'ናይ ሽምግልና ክዳን',
    nameEn: 'Shimgilina Attire',
    shortAm: 'ሽምግልና',
    shortTi: 'ሽምግልና',
    shortEn: 'Shimgilina',
    group: 'events',
  },
  {
    id: 'kristna',
    tag: '#የክርስትና_ልብስ',
    nameAm: 'የክርስትና ባህላዊ ልብስ',
    nameTi: 'ናይ ጥምቀት ክዳን',
    nameEn: 'Christening & Baptism',
    shortAm: 'ክርስትና',
    shortTi: 'ጥምቀት',
    shortEn: 'Baptism',
    group: 'events',
  },
  {
    id: 'qurban',
    tag: '#የቁርባን_ልብስ',
    nameAm: 'የቁርባን ባህላዊ ልብስ',
    nameTi: 'ናይ ቁርባን ክዳን',
    nameEn: 'Holy Communion',
    shortAm: 'ቁርባን',
    shortTi: 'ቁርባን',
    shortEn: 'Communion',
    group: 'events',
  },
  {
    id: 'graduation',
    tag: '#የምርቃት_ልብስ',
    nameAm: 'የምርቃት ባህላዊ ልብስ',
    nameTi: 'ናይ ምረቓ ክዳን',
    nameEn: 'Graduation Attire',
    shortAm: 'ምርቃት',
    shortTi: 'ምረቓ',
    shortEn: 'Graduation',
    group: 'events',
  },
  {
    id: 'birthday',
    tag: '#የልደት_ልብስ',
    nameAm: 'የልደት ባህላዊ ልብስ',
    nameTi: 'ናይ ልደት ክዳን',
    nameEn: 'Birthday Celebration',
    shortAm: 'ልደት',
    shortTi: 'ልደት',
    shortEn: 'Birthday',
    group: 'events',
  },
  {
    id: 'new_year',
    tag: '#የእንቁጣጣሽ_ልብስ',
    nameAm: 'የአዲስ ዓመት / እንቁጣጣሽ',
    nameTi: 'ናይ ሓድሽ ዓመት ክዳን',
    nameEn: 'New Year / Enkutatash',
    shortAm: 'እንቁጣጣሽ',
    shortTi: 'ሓድሽ ዓመት',
    shortEn: 'New Year',
    group: 'events',
  },
  {
    id: 'ashenda',
    tag: '#የአሸንዳ_ልብስ',
    nameAm: 'የአሸንዳ / ሻደይ ልብስ',
    nameTi: 'ናይ ኣሸንዳ ክዳን',
    nameEn: 'Ashenda / Shadey',
    shortAm: 'አሸንዳ',
    shortTi: 'ኣሸንዳ',
    shortEn: 'Ashenda',
    group: 'events',
  },
  {
    id: 'coffee_ceremony',
    tag: '#የቡና_ቁርስ_ልብስ',
    nameAm: 'የቡና ስነ-ስርዓት ልብስ',
    nameTi: 'ናይ ቡን ስነ-ስርዓት ክዳን',
    nameEn: 'Coffee Ceremony Dress',
    shortAm: 'ቡና',
    shortTi: 'ቡን',
    shortEn: 'Coffee Set',
    group: 'events',
  },
  {
    id: 'special_occasions',
    tag: '#የልዩ_ዝግጅት',
    nameAm: 'የልዩ ዝግጅት አልባሳት',
    nameTi: 'ናይ ፍሉይ በዓላት ክዳን',
    nameEn: 'Special Celebrations',
    shortAm: 'ልዩ ዝግጅት',
    shortTi: 'ፍሉይ በዓል',
    shortEn: 'Celebrations',
    group: 'events',
  },

  // ክልል 2: ጥንድና ወንድ (Couples & Men)
  {
    id: 'couples',
    tag: '#የጥንድ_ልብስ',
    nameAm: 'የጥንድ ልብስ (Couple Sets)',
    nameTi: 'ናይ መጻምድቲ ክዳን',
    nameEn: 'Matching Couple Sets',
    shortAm: 'ጥንድ',
    shortTi: 'መጻምድቲ',
    shortEn: 'Couples',
    group: 'men_couples',
  },
  {
    id: 'men',
    tag: '#የወንድ_ባህላዊ_ልብስ',
    nameAm: 'የወንድ ባህላዊ ልብስ',
    nameTi: 'ናይ ወዲ ተባዕታይ ባህላዊ ክዳን',
    nameEn: "Men's Traditional Attire",
    shortAm: 'ወንድ',
    shortTi: 'ወዲ',
    shortEn: "Men's",
    group: 'men_couples',
  },

  // ክልል 3: ጨርቆችና ቅርሶች (Heritage & Fabrics)
  {
    id: 'axum_fetel',
    tag: '#አክሱም_ፈተል',
    nameAm: 'የአክሱም ንጹህ ፈተል',
    nameTi: 'ናይ ኣኽሱም ጽሩይ ፈተል',
    nameEn: 'Axum Pure Handspun (Fetil)',
    shortAm: 'አክሱም ፈተል',
    shortTi: 'ኣኽሱም ፈተል',
    shortEn: 'Axum Fetil',
    group: 'heritage_fabrics',
  },
  {
    id: 'saba',
    tag: '#የንግስት_ሳባ_ጥበብ',
    nameAm: 'የንግስት ሳባ ጥበብ ጨርቅ',
    nameTi: 'ናይ ንግስቲ ሳባ ጥበብ ጨርቂ',
    nameEn: 'Queen Saba Fabric',
    shortAm: 'ሳባ',
    shortTi: 'ሳባ',
    shortEn: 'Saba Fabric',
    group: 'heritage_fabrics',
  },
  {
    id: 'chiffon',
    tag: '#ሺፎን_እና_ቻይና',
    nameAm: 'ሺፎን እና ቻይና ጨርቅ',
    nameTi: 'ሺፎንን ቻይናን ጨርቂ',
    nameEn: 'Chiffon & China Fabric',
    shortAm: 'ሺፎን',
    shortTi: 'ሺፎን',
    shortEn: 'Chiffon',
    group: 'heritage_fabrics',
  },
  {
    id: 'nkr',
    tag: '#ንክር_ጥጥ',
    nameAm: 'ንክር ጥራት ያለው ጥጥ',
    nameTi: 'ንክር ጽሩይ ጥጥ',
    nameEn: 'Nkr Quality Cotton',
    shortAm: 'ንክር',
    shortTi: 'ንክር',
    shortEn: 'Nkr Cotton',
    group: 'heritage_fabrics',
  },
  {
    id: 'raya',
    tag: '#የራያ_ባህል_ልብስ',
    nameAm: 'የራያ ባህላዊ ልብስ',
    nameTi: 'ናይ ራያ ባህላዊ ክዳን',
    nameEn: 'Raya Traditional Attire',
    shortAm: 'ራያ',
    shortTi: 'ራያ',
    shortEn: 'Raya Style',
    group: 'heritage_fabrics',
  },
  {
    id: 'gondar',
    tag: '#የጎንደር_ጥበብ',
    nameAm: 'የጎንደር ንጉሳዊ ጥበብ',
    nameTi: 'ናይ ጎንደር ንጉሳዊ ጥበብ',
    nameEn: 'Gondar Royal Embroidery',
    shortAm: 'ጎንደር',
    shortTi: 'ጎንደር',
    shortEn: 'Gondar Style',
    group: 'heritage_fabrics',
  },
  {
    id: 'wollo',
    tag: '#የወሎ_ባህል_ልብስ',
    nameAm: 'የወሎ ባህል ልብስ',
    nameTi: 'ናይ ወሎ ባህላዊ ክዳን',
    nameEn: 'Wollo Traditional Dress',
    shortAm: 'ወሎ',
    shortTi: 'ወሎ',
    shortEn: 'Wollo Style',
    group: 'heritage_fabrics',
  },
  {
    id: 'gojjam',
    tag: '#የጎጃም_ባህል_ልብስ',
    nameAm: 'የጎጃም ባህል ልብስ',
    nameTi: 'ናይ ጎጃም ባህላዊ ክዳን',
    nameEn: 'Gojjam Traditional Dress',
    shortAm: 'ጎጃም',
    shortTi: 'ጎጃም',
    shortEn: 'Gojjam Style',
    group: 'heritage_fabrics',
  },
  {
    id: 'nations',
    tag: '#የብሄር_ብሄረሰቦች',
    nameAm: 'የብሄር ብሄረሰቦች ልብሶች',
    nameTi: 'ናይ ብሄራት ባህላዊ ክዳውንቲ',
    nameEn: 'Cultural & Nationalities',
    shortAm: 'ብሄረሰብ',
    shortTi: 'ብሄራት',
    shortEn: 'Cultural',
    group: 'heritage_fabrics',
  },
];

export const HASHTAG_CATEGORIES = CATEGORIES;

export function getCategoryDisplay(tagOrCategory: string, language: Language = 'en'): string {
  const clean = tagOrCategory.startsWith('#') ? tagOrCategory : `#${tagOrCategory}`;
  const found = CATEGORIES.find(
    (c) => c.tag === clean || c.tag === tagOrCategory || c.id === tagOrCategory || c.nameAm === tagOrCategory || c.nameEn === tagOrCategory || c.nameTi === tagOrCategory
  );
  if (found) {
    if (language === 'ti') return found.nameTi || found.nameAm;
    if (language === 'en') return found.nameEn;
    return found.nameAm;
  }
  return tagOrCategory.replace(/^#/, '').replace(/_/g, ' ');
}

export function getCategoryShortDisplay(tagOrCategory: string, language: Language = 'en'): string {
  const clean = tagOrCategory.startsWith('#') ? tagOrCategory : `#${tagOrCategory}`;
  const found = CATEGORIES.find(
    (c) => c.tag === clean || c.tag === tagOrCategory || c.id === tagOrCategory
  );
  if (found) {
    if (language === 'ti') return found.shortTi || found.nameTi || found.shortAm || found.nameAm;
    if (language === 'en') return found.shortEn || found.nameEn;
    return found.shortAm || found.nameAm;
  }
  return tagOrCategory.replace(/^#/, '').replace(/_/g, ' ');
}

export const STORE_INFO = {
  name: 'Abel Habesha (አቤል ሀበሻ)',
  taglineAm: 'በሺሮሜዳ እምብርት የሚገኝ የጥራት እና ውበት መገለጫ ባህላዊ አልባሳት መደብር።',
  taglineTi: 'ኣብ ሽሮሜዳ ዝርከብ ባህላዊ ክዳውንቲ መሸጢ።',
  taglineEn: 'Finest handwoven Habesha Kemis, Chiffon dresses & bespoke traditional attire crafted in Shiromeda.',
  phone: '+251913312314',
  phoneDisplay: '+251 913 312 314',
  email: 'info@abelhabesha.com.et',
  emailUrl: 'mailto:info@abelhabesha.com.et?subject=Inquiry%20-%20Abel%20Habesha%20Traditional%20Attire',
  telegramUser: 'AbelDesignChat',
  telegramUrl: 'https://t.me/AbelDesignChat',
  whatsappUrl: 'https://wa.me/251913312314',
  website: 'https://abelhabesha.com.et/',
  addressAm: 'ሺሮሜዳ ብላቴና ሕንፃ 4ኛ ፎቅ ቢሮ ቁጥር 110፣ አዲስ አበባ፣ ኢትዮጵያ',
  addressTi: 'ሽሮሜዳ ብላቴና ህንጻ መበል 4 ደብሪ ቢሮ ቁጽሪ 110፣ ኣዲስ ኣበባ፣ ኢትዮጵያ',
  addressEn: 'Shiromeda Blatena Building, 4th Floor, Office 110, Addis Ababa, Ethiopia',
  socialLinks: {
    website: 'https://abelhabesha.com.et/',
    email: 'mailto:info@abelhabesha.com.et?subject=Inquiry%20-%20Abel%20Habesha%20Traditional%20Attire',
    facebook: 'https://www.facebook.com/profile.php?id=61591538005028',
    instagram: 'https://www.instagram.com/abelhabesha27?igsh=a3Uwemc4cDB0bnVh',
    tiktok: 'https://vm.tiktok.com/ZS96S6pdDs2Jt-yHWIR/',
    youtube: 'https://youtube.com/@abelhabesha14?si=nM3KbA74kqws_EHB',
    whatsapp: 'https://wa.me/251913312314',
    telegram: 'https://t.me/AbelDesignChat',
  },
};
