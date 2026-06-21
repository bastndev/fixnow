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
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_FR.md">Français 🇫🇷</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_JA.md">日本語 🇯🇵</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_KO.md">한국어 🇰🇷</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_PT.md">Português 🇧🇷</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_RU.md">Русский 🇷🇺</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_VI.md">Tiếng Việt 🇻🇳</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_AR.md">العربية 🇸🇦</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_HI.md">हिन्दी 🇮🇳</a><span>...</span>
</p>
</div>

Ein winziges mehrsprachiges Rechtschreibprüfprogramm mit Korrekturvorschlägen. Wörterbücher sind gebündelt, sodass `npm i fixnow` Ihnen alles bietet — mit **null Laufzeitabhängigkeiten**, sowohl in ESM als auch in CommonJS.

## Installation

```bash
npm i fixnow
```

## Sprachen

| Code | Sprache | Wörterbuch-Lizenz |
| ---- | ---------- | ------------------ |
| `ar` | Arabisch | LGPL-3.0 |
| `de` | Deutsch | LGPL-3.0 |
| `en` | Englisch | MIT |
| `es` | Spanisch | LGPL-3.0 |
| `fr` | Französisch| MIT |
| `pt` | Portugiesisch | GPL-3.0-or-later |
| `ru` | Russisch | GPL-3.0-or-later |
| `vi` | Vietnamesisch| MIT |

## Verwendung

```ts
import { checkText, suggest, createChecker } from "fixnow";

// Rechtschreibfehler erkennen (standardmäßig Spanisch)
const issues = await checkText("Esto es un herror", {
  language: "es",
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// Einmalige Korrekturvorschläge
await suggest("bonjoor", { language: "fr" }); // -> ['bonjour', ...]

// Ein an eine Sprache gebundener Checker
const de = createChecker("de");
await de.isCorrect("Haus"); // -> true
```

CommonJS funktioniert auch:

```js
const { checkText } = require("fixnow");
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — Wörterbücher vorladen (die Dekodierungskosten des ersten Aufrufs überspringen)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (Standard `'es'`), `strict` (Spanische Akzentstrenge),
`suggestions`, `maxSuggestions` (5), `minWordLength` (3), `ignoreWords`, `flagWords`, `isProtectedWord`.

## Lizenz

[MIT](../LICENSE)
