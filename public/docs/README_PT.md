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
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_RU.md">Русский 🇷🇺</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_VI.md">Tiếng Việt 🇻🇳</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_AR.md">العربية 🇸🇦</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_HI.md">हिन्दी 🇮🇳</a><span>...</span>
</p>
</div>

Um pequeno corretor ortográfico multilíngue com sugestões de correção. Os dicionários vêm incluídos, então `npm i fixnow` te dá tudo o que você precisa — com **zero dependências em tempo de execução**, tanto em ESM quanto em CommonJS.

## Instalação

```bash
npm i fixnow
```

## Idiomas

| Código | Idioma | Licença do dicionário |
| ---- | ---------- | ------------------ |
| `ar` | Árabe | LGPL-3.0 |
| `de` | Alemão | LGPL-3.0 |
| `en` | Inglês | MIT |
| `es` | Espanhol | LGPL-3.0 |
| `fr` | Francês | MIT |
| `pt` | Português | GPL-3.0-or-later |
| `ru` | Russo | GPL-3.0-or-later |
| `vi` | Vietnamita | MIT |

## Uso

```ts
import { checkText, suggest, createChecker } from "fixnow";

// Detectar erros ortográficos (padrão em espanhol)
const issues = await checkText("Esto es un herror", {
  language: "es",
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// Sugestões de correção pontuais
await suggest("bonjoor", { language: "fr" }); // -> ['bonjour', ...]

// Um corretor vinculado a um idioma
const de = createChecker("de");
await de.isCorrect("Haus"); // -> true
```

Também funciona com CommonJS:

```js
const { checkText } = require("fixnow");
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — pré-carregar dicionários (evita o custo de decodificação na primeira chamada)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (padrão `'es'`), `strict` (rigor com os acentos em espanhol),
`suggestions`, `maxSuggestions` (5), `minWordLength` (3), `ignoreWords`, `flagWords`, `isProtectedWord`.

## Licença

[MIT](../LICENSE)
