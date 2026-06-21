<div align="center">
  <a href="https://github.com/bastndev/fixnow">
    <img alt="fixnow logo" src="https://raw.githubusercontent.com/bastndev/fixnow/main/public/github/banner.webp" height="128">
  </a>

<br>

<h1></h1>

<br>

<a href="https://www.npmjs.com/package/fixnow"><img alt="NPM version" src="https://img.shields.io/npm/v/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://www.npmjs.com/package/fixnow"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/bastndev/fixnow/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/bastndev/fixnow/stargazers"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/bastndev/fixnow.svg?style=for-the-badge&labelColor=000000"></a>

<h1></h1>

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
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_AR.md">العربية 🇸🇦</a><span>...</span>
</p>
</div>

<br>

सुधार सुझावों के साथ एक छोटा बहुभाषी वर्तनी जांचकर्ता। शब्दकोश बंडल किए गए हैं, इसलिए `npm i fixnow` आपको वह सब कुछ देता है जिसकी आपको आवश्यकता है — ESM और CommonJS दोनों में **शून्य रनटाइम निर्भरता** के साथ।

## इंस्टालेशन

```bash
npm i fixnow
```

## भाषाएँ

| कोड  | भाषा     | शब्दकोश लाइसेंस |
| ---- | -------- | --------------- |
| `ar` | अरबी     | LGPL-3.0        |
| `de` | जर्मन    | LGPL-3.0        |
| `en` | अंग्रेज़ी | MIT |
| `es` | स्पेनिश  | LGPL-3.0        |
| `fr` | फ्रेंच   | MIT             |
| `pt` | पुर्तगाली | GPL-3.0-or-later |
| `ru` | रूसी | GPL-3.0-or-later |
| `vi` | वियतनामी | MIT             |

## उपयोग

```ts
import { checkText, suggest, createChecker } from "fixnow";

// वर्तनी की गलतियों का पता लगाएं (डिफ़ॉल्ट स्पेनिश है)
const issues = await checkText("Esto es un herror", {
  language: "es",
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// एकमुश्त सुधार सुझाव
await suggest("bonjoor", { language: "fr" }); // -> ['bonjour', ...]

// एक भाषा से बंधा हुआ चेकर
const de = createChecker("de");
await de.isCorrect("Haus"); // -> true
```

CommonJS भी काम करता है:

```js
const { checkText } = require("fixnow");
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — शब्दकोशों को प्रीलोड करें (पहली कॉल डिकोड लागत छोड़ें)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (डिफ़ॉल्ट `'es'`), `strict` (स्पेनिश उच्चारण कठोरता),
`suggestions`, `maxSuggestions` (5), `minWordLength` (3), `ignoreWords`, `flagWords`, `isProtectedWord`.

## लाइसेंस

[MIT](../LICENSE)
