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
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_VI.md">Tiếng Việt 🇻🇳</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_AR.md">العربية 🇸🇦</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_HI.md">हिन्दी 🇮🇳</a><span>...</span>
</p>
</div>

Крошечная многоязычная программа проверки орфографии с предложениями по исправлению. Словари включены в комплект, поэтому `npm i fixnow` дает вам все необходимое — **без зависимостей во время выполнения**, как в ESM, так и в CommonJS.

## Установка

```bash
npm i fixnow
```

## Языки

| Код | Язык | Лицензия словаря |
| ---- | ---------- | ------------------ |
| `ar` | Арабский | LGPL-3.0 |
| `de` | Немецкий | LGPL-3.0 |
| `en` | Английский | MIT |
| `es` | Испанский | LGPL-3.0 |
| `fr` | Французский| MIT |
| `pt` | Португальский | GPL-3.0-or-later |
| `ru` | Русский | GPL-3.0-or-later |
| `vi` | Вьетнамский| MIT |

## Использование

```ts
import { checkText, suggest, createChecker } from "fixnow";

// Обнаружение орфографических ошибок (по умолчанию испанский)
const issues = await checkText("Esto es un herror", {
  language: "es",
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// Единичные предложения по исправлению
await suggest("bonjoor", { language: "fr" }); // -> ['bonjour', ...]

// Проверка, привязанная к одному языку
const de = createChecker("de");
await de.isCorrect("Haus"); // -> true
```

CommonJS тоже работает:

```js
const { checkText } = require("fixnow");
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — предварительная загрузка словарей (пропуск затрат на декодирование при первом вызове)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (по умолчанию `'es'`), `strict` (строгость испанских ударений),
`suggestions`, `maxSuggestions` (5), `minWordLength` (3), `ignoreWords`, `flagWords`, `isProtectedWord`.

## Лицензия

[MIT](../LICENSE)
