// Centralized content management for the landing page
export const siteContent = {
  hero: {
    label: 'אפי רוזנברג-יועץ אסטרטגי',
    rotatingWords: ['בהירות', 'מיקוד', 'החלטה', 'אסטרטגיה'],
    subtitle: 'מכוונה לתוכנית, מתוכנית לביצוע',
    description: 'לשעבר מנכ"ל וסמנכ"ל ב-Visa, AIG וטלכלל',
    statement: 'אני לא כאן רק לעודד — אני כאן לבנות.',
    ctaButton: 'פגישת אסטרטגיה',
    ctaSubtext: 'ללא התחייבות',
    imageUrl: 'https://i.ibb.co/BVhjVnR1/1.png'
  },
  bio: {
    sectionLabel: 'הגישה',
    headline1: 'לא קואצ׳ינג.',
    headline2: 'אסטרטגיה.',
    quote: '"אני מגיע מהצמתים שבהם ההנדסה פוגשת את הנפש. עם השכלה בהנדסה, מינהל עסקים ופסיכולוגיה — אני בוחן עסקים וקריירות כמערכות."',
    yearsExperience: 25,
    companies: [
      { name: 'ק.נ.מ', role: 'מנהל כללי' },
      { name: 'טלכלל', role: 'מנהל כללי' },
      { name: 'VISA, AIG', role: 'סמנכ"ל' }
    ],
    whyNotCoaching: {
      title: 'למה לא רק קואצ׳ינג?',
      paragraph1: 'די לדבר על שינוי. בואו נבנה אותו.\n\nאני לא כאן כדי לשאול אתכם שאלות — אני כאן כדי לבנות לכם מערכת. השיטה שלי מתוכנית עסקים ופסיכולוגיה עומקת ותבנה פסיכולוגית עומקת ותבנה פסיכולוגית של דיוק הדרך, אסטרטגיה עמוקה ותבנה פסיכולוגית של חכמי ביצוע.',
      paragraph2: 'חשוב לי להבהיר: זו אינה מוטיבציה שטחית או להרגיש טוב לרגע — זה לא המקום. אני כאן לשלוש שילוב של דיוק הדרך, אסטרטגיה עמוקה ותבנה פסיכולוגית של חכמי ביצוע.\n\nאם אתה מחפש מבנה, סדר, ודרך חסר שטות — בוא נתחיל לעבוד.'
    },
    whoIWorkWith: {
      title: 'עם מי אני עובד?',
      paragraph1: 'עם מנכ"לים שלא אריכטקטורה של מחזון. עם מנהלים שתקועים בהווה ושאינם מצליחים מסתובבים על ריק, ומרגישים את הרד המקצועית שתחבר אותם בהווה לעתיד.',
      paragraph2: 'אם אתה מחפש מוטיבציה — זה לא המקום. אם אתה מחפש מבנה, אסטרטגיה, וביצוע — בוא נדבר.'
    }
  },
  router: {
    headline: 'איפה המערכת',
    headlineAccent: 'תקועה?',
    subtitle: 'בחר את נקודת הכניסה שלך',
    services: [
      {
        id: '01',
        title: 'עסק תקוע',
        hook: 'המערכת לא זורמת. הצוות לא מבצע. אתה מרגיש שאתה היחיד שעובד.',
        details: 'נבנה מבנה ארגוני, זרימת תהליכים, ותרבות של אחריות. מתוך ניסיון כמנכ"ל וסמנכ"ל בחברות גלובליות.'
      },
      {
        id: '02',
        title: 'קריירה תקועה',
        hook: 'אתה מנהל טוב, אבל לא יודע איך לעבור לשלב הבא.',
        details: 'נזהה פערי מיומנויות, נבנה מסלול, ונעבוד על הדרך שמעבירה אותך מאיפה שאתה לאן שאתה רוצה להיות.'
      },
      {
        id: '03',
        title: 'אישי תקוע',
        hook: 'אתה יודע מה אתה רוצה, אבל לא מצליח להגיע לשם.',
        details: 'נעבוד על דפוסי חשיבה, החלטות, והרגלים. עם כלים מפסיכולוגיה קוגניטיבית ואימון אסטרטגי.'
      }
    ],
    ctaText: 'לא בטוח איפה להתחיל? נדבר ונבין יחד',
    ctaButton: 'קבע שיחת היכרות'
  },
  footer: {
    copyright: '© 2026 אפי רוזנברג. כל הזכויות שמורות.',
    phone: '+972542005886',
    email: 'efiraz@gmail.com',
    whatsapp: 'https://wa.me/972542005886',
    links: [
      { text: 'WhatsApp', url: 'https://wa.me/972542005886' },
      { text: 'Email', url: 'mailto:efiraz@gmail.com' },
      { text: 'טלפון', url: 'tel:+972542005886' }
    ]
  }
}

// Function to update content (will be used by admin panel)
export const updateContent = (section, field, value) => {
  const content = JSON.parse(localStorage.getItem('siteContent') || JSON.stringify(siteContent))
  
  // Handle nested fields
  const keys = field.split('.')
  let current = content[section]
  
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]]
  }
  
  current[keys[keys.length - 1]] = value
  
  localStorage.setItem('siteContent', JSON.stringify(content))
  return content
}

// Function to get current content (checks localStorage first)
export const getContent = () => {
  const stored = localStorage.getItem('siteContent')
  return stored ? JSON.parse(stored) : siteContent
}

// Function to reset content to default
export const resetContent = () => {
  localStorage.removeItem('siteContent')
  return siteContent
}
