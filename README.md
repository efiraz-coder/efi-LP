# אתר אישי - אפי רוזנברג 🎯 


אתר אישי מודרני ומקצועי בעיצוב **Editorial Luxury / Dark Minimal** ליועץ אסטרטגי.

## 🚀 התקנה והפעלה

### דרישות מקדימות
- Node.js (גרסה 16 ומעלה)
- npm או yarn

### התקנה
```bash
npm install
```

### הפעלת שרת פיתוח
```bash
npm run dev
```

האתר יהיה זמין בכתובת: `http://localhost:5173`

### בניית גרסת ייצור
```bash
npm run build
```

### תצוגה מקדימה של גרסת ייצור
```bash
npm run preview
```

---

## 🎨 מדריך התאמה אישית

### 1. שינוי צבעים

**קובץ:** `tailwind.config.js`

```javascript
colors: {
  primary: '#000000',  // צבע רקע ראשי
  accent: '#DC2626',   // צבע הדגשה (אדום)
}
```

אפשרויות נפוצות:
- כחול: `#2563EB`
- סגול: `#7C3AED`
- ירוק: `#059669`
- זהב: `#D97706`

---

### 2. עריכת Hero Section

**קובץ:** `src/components/landing/HeroSection.jsx`

#### שינוי מילים מתחלפות (שורה 9):
```javascript
const words = ['בהירות', 'מיקוד', 'החלטה', 'אסטרטגיה']
// שנה למילים שלך:
const words = ['מילה1', 'מילה2', 'מילה3', 'מילה4']
```

#### שינוי תווית תפקיד (שורה 47):
```javascript
<span className="...">
  יועץ אסטרטגי
</span>
// שנה ל:
<span className="...">
  [התפקיד שלך]
</span>
```

#### שינוי כותרת משנה (שורה 82):
```javascript
היא כוח.
// שנה ל:
[הכותרת שלך]
```

#### שינוי תיאור חברות (שורה 90):
```javascript
לשעבר מנכ"ל וסמנכ"ל ב-Visa, AIG וטלכלל
// שנה ל:
[הרקע המקצועי שלך]
```

#### שינוי משפט מפתח (שורה 98):
```javascript
אני לא כאן לעודד — אני כאן לבנות.
// שנה ל:
[המשפט/סלוגן שלך]
```

#### שינוי תמונת פרופיל (שורה 127):
```javascript
src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/..."
// שנה ל:
src="[URL התמונה שלך]"
```

#### שינוי טקסט כפתורים (שורות 112-114):
```javascript
<button>פגישת אסטרטגיה</button>
<span>30 דקות. בלי התחייבות.</span>
```

---

### 3. עריכת Bio Section

**קובץ:** `src/components/landing/BioSection.jsx`

#### שינוי כותרות ראשיות (שורות 48-52):
```javascript
<h2>לא קואצ׳ינג.</h2>
<h2>אסטרטגיה.</h2>
```

#### שינוי ציטוט ראשי (שורה 61):
```javascript
"אני מגיע מהצמתים שבהם ההנדסה פוגשת את הנפש..."
// שנה ל:
"[הציטוט שלך]"
```

#### שינוי סטטיסטיקה (שורה 6):
```javascript
if (isInView && count < 25) {  // <-- שנה את 25 למספר שלך
```

#### שינוי חברות (שורות 16-20):
```javascript
const companies = [
  { name: 'Visa', role: 'מנכ"ל', icon: Building2 },
  { name: 'AIG', role: 'סמנכ"ל', icon: Award },
  { name: 'טלכלל', role: 'סמנכ"ל', icon: Target }
]
// שנה לחברות שלך
```

#### שינוי עמודות טקסט (שורות 103-135):
```javascript
<h3>למה לא קואצ׳ינג?</h3>
<p>כי עסקים לא צריכים עידוד...</p>

<h3>עם מי אני עובד?</h3>
<p>עם מנכ"לים שלא רוצים...</p>
```

---

### 4. עריכת Router Section (שירותים)

**קובץ:** `src/components/landing/RouterSection.jsx`

#### שינוי כותרת הסקשן (שורות 43-47):
```javascript
<h2>
  איפה המערכת
  <br />
  <span>תקועה?</span>
</h2>
<p>בחר את נקודת הכניסה שלך</p>
```

#### הוספה/עריכת כרטיסי שירותים (שורות 11-33):
```javascript
const services = [
  {
    id: '01',
    title: 'עסק תקוע',
    hook: 'המערכת לא זורמת...',
    details: 'נבנה מבנה ארגוני...',
    icon: Briefcase,
    gradient: 'from-red-600 to-orange-600'
  },
  // הוסף כרטיס נוסף:
  {
    id: '04',
    title: '[שם שירות]',
    hook: '[משפט מושך]',
    details: '[פרטים]',
    icon: Target,  // אייקונים זמינים: Briefcase, Users, Heart, Target, Award, Building2
    gradient: 'from-green-600 to-teal-600'
  }
]
```

אפשרויות Gradient:
- `from-red-600 to-orange-600`
- `from-blue-600 to-purple-600`
- `from-pink-600 to-red-600`
- `from-green-600 to-teal-600`
- `from-yellow-600 to-orange-600`

#### שינוי CTA תחתון (שורות 108-111):
```javascript
<p>לא בטוח איפה להתחיל? נדבר ונבין יחד</p>
<button>קבע שיחת היכרות</button>
```

---

### 5. שינוי כיוון (RTL/LTR)

**קובץ:** `index.html`

```html
<html lang="he" dir="rtl">
<!-- לשפה אנגלית: -->
<html lang="en" dir="ltr">
```

**גם בקובץ:** `src/index.css` (שורה 73)
```css
border-r-4  /* RTL - גבול מימין */
border-l-4  /* LTR - גבול משמאל */
```

---

### 6. שינוי פונטים

**קובץ:** `index.html` (שורות 7-9)

```html
<!-- פונט עברי נוכחי: Assistant -->
<link href="https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;600;700;800&display=swap" rel="stylesheet">

<!-- אלטרנטיבות עבריות: -->
<!-- Heebo -->
<link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;600;700;800&display=swap" rel="stylesheet">

<!-- Rubik -->
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;600;700;800&display=swap" rel="stylesheet">

<!-- Alef -->
<link href="https://fonts.googleapis.com/css2?family=Alef:wght@400;700&display=swap" rel="stylesheet">
```

**עדכון ב-CSS:** `src/index.css` (שורה 9)
```css
font-family: 'Assistant', -apple-system, system-ui, sans-serif;
/* שנה ל: */
font-family: 'Heebo', -apple-system, system-ui, sans-serif;
```

---

### 7. כיבוי/הפעלת אפקטים

#### Grain Texture (שורה 16 ב-`src/index.css`):
```css
/* הסר/הוסף הערה: */
/*
body::before {
  ...
}
*/
```

#### Mouse Tracking (ב-`HeroSection.jsx` שורות 15-25):
```javascript
// הסר/הוסף הערה:
/*
useEffect(() => {
  const handleMouseMove = (e) => {
    ...
  }
  ...
}, [])
*/
```

#### Parallax בגלילה:
בכל קומפוננט, הסר:
```javascript
style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
```

#### Scroll Indicator (ב-`HeroSection.jsx` שורות 140-148):
```javascript
// הסר את:
/*
<motion.div className="absolute bottom-12...">
  <ArrowDown />
</motion.div>
*/
```

---

### 8. שינוי מהירויות אנימציה

**בכל קומפוננט**, שנה את `duration`:

```javascript
// מהיר
transition={{ duration: 0.5 }}

// רגיל (ברירת מחדל)
transition={{ duration: 0.8 }}

// איטי
transition={{ duration: 1.2 }}
```

---

## 📁 מבנה הפרויקט

```
efi-landing/
├── src/
│   ├── components/
│   │   └── landing/
│   │       ├── HeroSection.jsx      # סקשן ראשי
│   │       ├── BioSection.jsx       # ביוגרפיה
│   │       └── RouterSection.jsx    # שירותים
│   ├── pages/
│   │   └── Home.jsx                 # דף ראשי
│   ├── App.jsx                      # רכיב ראשי
│   ├── main.jsx                     # נקודת כניסה
│   └── index.css                    # עיצוב גלובלי
├── public/                          # קבצים סטטיים
├── index.html                       # HTML ראשי
├── package.json                     # תלויות
├── tailwind.config.js               # הגדרות Tailwind
├── vite.config.js                   # הגדרות Vite
└── README.md                        # המדריך הזה
```

---

## 🎯 תכונות מרכזיות

✅ עיצוב Dark Minimal יוקרתי  
✅ מילים מתחלפות עם אנימציה  
✅ Parallax ו-Mouse tracking  
✅ Grain texture אותנטי  
✅ אנימציות Framer Motion  
✅ Responsive מלא (מובייל/טאבלט/דסקטופ)  
✅ RTL מלא לעברית  
✅ גרדיאנטים וצללים מודרניים  
✅ Hover effects מתקדמים  

---

## 🛠️ טכנולוגיות

- **React 18** - ספרייה לבניית ממשק משתמש
- **Vite** - כלי build מהיר
- **Tailwind CSS** - framework עיצוב
- **Framer Motion** - אנימציות
- **Lucide React** - אייקונים

---

## 📧 תמיכה

לשאלות או בעיות, צור קשר:
- **Email:** [האימייל שלך]
- **WhatsApp:** [מספר שלך]

---

## 📄 רישיון

© 2026 אפי רוזנברג. כל הזכויות שמורות.

---

**נוצר עם ❤️ על ידי GitHub Copilot**
