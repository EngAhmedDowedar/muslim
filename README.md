# 🕌 منارة — تطبيق إسلامي شامل

تطبيق إسلامي شامل يحتوي على: القرآن الكريم، مواقيت الصلاة، الأذكار والأدعية، الأذان، والإشعارات.

## المميزات

- 📖 **القرآن الكريم** — قراءة وتشغيل صوتي مع 17 قارئ
- 🕌 **مواقيت الصلاة** — بناءً على الموقع الحقيقي
- 🔔 **الأذان التلقائي** — يؤذن وقت كل صلاة
- 📢 **الإشعارات** — تذكير قبل وقت الصلاة بـ 5 دقائق
- 📿 **الأذكار والأدعية** — أذكار الصباح والمساء وأكثر من 20 قسماً
- 📿 **السبحة الإلكترونية**

---

## تحويل التطبيق إلى Capacitor (Android/iOS)

### المتطلبات

```bash
node >= 18
npm >= 9
Android Studio (للأندرويد)
Xcode (للـ iOS — macOS فقط)
```

### خطوات التثبيت

#### 1. تثبيت الاعتماديات
```bash
npm install
```

#### 2. إضافة المنصات
```bash
# للأندرويد
npm run cap:add:android

# للـ iOS
npm run cap:add:ios
```

#### 3. مزامنة الكود
```bash
npm run cap:sync
```

#### 4. فتح في بيئة التطوير
```bash
# Android Studio
npm run cap:open:android

# Xcode
npm run cap:open:ios
```

---

## ملاحظات تقنية للتحويل إلى Capacitor

### 1. الإشعارات
**الكود الحالي (Web API):**
```javascript
new Notification('منارة', { body: '...' });
```
**استبداله بـ Capacitor:**
```javascript
import { LocalNotifications } from '@capacitor/local-notifications';
await LocalNotifications.schedule({ notifications: [{ title: '...', body: '...', id: 1 }] });
```

### 2. الاهتزاز
**الكود الحالي:**
```javascript
navigator.vibrate(50);
```
**استبداله بـ Capacitor:**
```javascript
import { Haptics, ImpactStyle } from '@capacitor/haptics';
await Haptics.impact({ style: ImpactStyle.Light });
```

### 3. تحديد الموقع
**الكود الحالي:**
```javascript
navigator.geolocation.getCurrentPosition(...);
```
**استبداله بـ Capacitor:**
```javascript
import { Geolocation } from '@capacitor/geolocation';
const pos = await Geolocation.getCurrentPosition();
```

### 4. صوت الأذان
في ملف `index.html`، غيّر `ADHAN_AUDIO_URL` إلى ملف صوتي محلي:
```javascript
const ADHAN_AUDIO_URL = 'assets/adhan.mp3';
```
ثم ضع ملف الأذان في مجلد `assets/`.

---

## بنية الملفات

```
muslim/
├── index.html           # التطبيق الرئيسي (HTML + CSS + JS)
├── sw.js                # Service Worker للإشعارات
├── package.json         # اعتماديات Capacitor
├── capacitor.config.json# إعدادات Capacitor
├── manifest.json        # Web App Manifest (PWA)
└── README.md            # هذا الملف
```

---

## الترخيص

MIT License — مفتوح المصدر للاستخدام الشخصي والتعليمي.
