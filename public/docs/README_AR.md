<div align="center">
  <a href="https://github.com/bastndev/fixnow">
    <img alt="fixnow logo" src="https://raw.githubusercontent.com/bastndev/fixnow/main/public/github/banner.webp" height="128">
  </a>

<br>

<a href="https://www.npmjs.com/package/fixnow"><img alt="NPM version" src="https://img.shields.io/npm/v/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://www.npmjs.com/package/fixnow"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/bastndev/fixnow/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/bastndev/fixnow/stargazers"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/bastndev/fixnow.svg?style=for-the-badge&labelColor=000000"></a>

---

<p align="center">
  <a href="https://github.com/bastndev/fixnow/blob/main/README.md">English 🇬🇧</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_ES.md">Español 🇪🇸</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_ZH.md">中文 🇨🇳</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_DE.md">Deutsch 🇩🇪</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_FR.md">Français 🇫🇷</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_JA.md">日本語 🇯🇵</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_KO.md">한국어 🇰🇷</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_PT.md">Português 🇧🇷</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_RU.md">Русский 🇷🇺</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_VI.md">Tiếng Việt 🇻🇳</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_HI.md">हिन्दी 🇮🇳</a><span>...</span>
</p>
</div>

مدقق إملائي متعدد اللغات صغير الحجم مع اقتراحات تصحيح. القواميس مضمنة، لذا `npm i fixnow` يمنحك كل ما تحتاجه — مع **صفر تبعيات وقت التشغيل**، في كل من ESM و CommonJS.

## التثبيت

```bash
npm i fixnow
```

## اللغات

| الرمز | اللغة | ترخيص القاموس |
| ---- | ---------- | ------------------ |
| `ar` | العربية | LGPL-3.0 |
| `de` | الألمانية | LGPL-3.0 |
| `en` | الإنجليزية | MIT |
| `es` | الإسبانية | LGPL-3.0 |
| `fr` | الفرنسية | MIT |
| `pt` | البرتغالية | GPL-3.0-or-later |
| `ru` | الروسية | GPL-3.0-or-later |
| `vi` | الفيتنامية | MIT |

## الاستخدام

```ts
import { checkText, suggest, createChecker } from "fixnow";

// كشف الأخطاء الإملائية (الافتراضي هو الإسبانية)
const issues = await checkText("Esto es un herror", {
  language: "es",
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// اقتراحات تصحيح لمرة واحدة
await suggest("bonjoor", { language: "fr" }); // -> ['bonjour', ...]

// مدقق مرتبط بلغة واحدة
const de = createChecker("de");
await de.isCorrect("Haus"); // -> true
```

CommonJS يعمل أيضًا:

```js
const { checkText } = require("fixnow");
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — التحميل المسبق للقواميس (تخطي تكلفة فك التشفير في الاستدعاء الأول)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (الافتراضي `'es'`)، `strict` (صرامة اللكنة الإسبانية)،
`suggestions`، `maxSuggestions` (5)، `minWordLength` (3)، `ignoreWords`، `isProtectedWord`.

## الترخيص

[MIT](../LICENSE)
