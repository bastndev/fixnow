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
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_JA.md">日本語 🇯🇵</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_KO.md">한국어 🇰🇷</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_PT.md">Português 🇧🇷</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_RU.md">Русский 🇷🇺</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_VI.md">Tiếng Việt 🇻🇳</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_AR.md">العربية 🇸🇦</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_HI.md">हिन्दी 🇮🇳</a><span>...</span>
</p>
</div>

Un minuscule correcteur orthographique multilingue avec suggestions de correction. Les dictionnaires sont inclus, donc `npm i fixnow` vous donne tout — avec **zéro dépendance d'exécution**, à la fois en ESM et en CommonJS.

## Installation

```bash
npm i fixnow
```

## Langues

| Code | Langue | Licence du dictionnaire |
| ---- | ---------- | ------------------ |
| `ar` | Arabe | LGPL-3.0 |
| `de` | Allemand | LGPL-3.0 |
| `en` | Anglais | MIT |
| `es` | Espagnol | LGPL-3.0 |
| `fr` | Français | MIT |
| `pt` | Portugais | GPL-3.0-or-later |
| `ru` | Russe | GPL-3.0-or-later |
| `vi` | Vietnamien | MIT |

## Utilisation

```ts
import { checkText, suggest, createChecker } from "fixnow";

// Détecter les fautes d'orthographe (par défaut en espagnol)
const issues = await checkText("Esto es un herror", {
  language: "es",
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// Suggestions de correction ponctuelles
await suggest("bonjoor", { language: "fr" }); // -> ['bonjour', ...]

// Un correcteur lié à une langue
const de = createChecker("de");
await de.isCorrect("Haus"); // -> true
```

CommonJS fonctionne aussi :

```js
const { checkText } = require("fixnow");
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — précharger les dictionnaires (éviter le coût de décodage au premier appel)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (par défaut `'es'`), `strict` (rigueur des accents espagnols),
`suggestions`, `maxSuggestions` (5), `minWordLength` (3), `ignoreWords`, `flagWords`, `isProtectedWord`.

## Licence

[MIT](../LICENSE)
