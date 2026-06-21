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
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_ZH.md">中文 🇨🇳</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_DE.md">Deutsch 🇩🇪</a> |
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

Un pequeño corrector ortográfico multilingüe con sugerencias de corrección. Los diccionarios vienen incluidos, por lo que `npm i fixnow` te da todo lo necesario — con **cero dependencias en tiempo de ejecución**, tanto en ESM como en CommonJS.

## Instalación

```bash
npm i fixnow
```

## Idiomas

| Código | Idioma | Licencia del diccionario |
| ---- | ---------- | ------------------ |
| `ar` | Árabe | LGPL-3.0 |
| `de` | Alemán | LGPL-3.0 |
| `en` | Inglés | MIT |
| `es` | Español | LGPL-3.0 |
| `fr` | Francés | MIT |
| `pt` | Portugués | GPL-3.0-or-later |
| `ru` | Ruso | GPL-3.0-or-later |
| `vi` | Vietnamita | MIT |

## Uso

```ts
import { checkText, suggest, createChecker } from "fixnow";

// Detectar errores ortográficos (por defecto en español)
const issues = await checkText("Esto es un herror", {
  language: "es",
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// Sugerencias de corrección puntuales
await suggest("bonjoor", { language: "fr" }); // -> ['bonjour', ...]

// Un corrector vinculado a un idioma
const de = createChecker("de");
await de.isCorrect("Haus"); // -> true
```

También funciona con CommonJS:

```js
const { checkText } = require("fixnow");
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — pre-cargar diccionarios (evita el costo de decodificación en la primera llamada)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (por defecto `'es'`), `strict` (estricto con acentos en español),
`suggestions`, `maxSuggestions` (5), `minWordLength` (3), `ignoreWords`, `flagWords`, `isProtectedWord`.

## Licencia

[MIT](../LICENSE)
