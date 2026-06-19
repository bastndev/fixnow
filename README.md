<div align="center">
  <a href="https://github.com/bastndev/fixnow">
    <img alt="fixnow logo" src="https://raw.githubusercontent.com/bastndev/fixnow/main/public/github/logo.png" height="128">
  </a>
  <h1>fixnow</h1>

<a href="https://www.npmjs.com/package/fixnow"><img alt="NPM version" src="https://img.shields.io/npm/v/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://www.npmjs.com/package/fixnow"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/bastndev/fixnow/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/bastndev/fixnow/stargazers"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/bastndev/fixnow.svg?style=for-the-badge&labelColor=000000"></a>

</div>

A tiny multilingual spell checker with correction suggestions. Dictionaries are bundled, so `npm i fixnow` gives you everything — with **zero runtime dependencies**, in both ESM and CommonJS.

## Install

```bash
npm i fixnow
```

## Languages

| Code | Language | Dictionary license |
| --- | --- | --- |
| `ar` | Arabic | LGPL-3.0 |
| `de` | German | LGPL-3.0 |
| `es` | Spanish | LGPL-3.0 |
| `fr` | French | MIT |
| `vi` | Vietnamese | MIT |

## Usage

```ts
import { checkText, suggest, createChecker } from 'fixnow';

// Detect misspellings (defaults to Spanish)
const issues = await checkText('Esto es un herror', {
  language: 'es',
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// One-off correction suggestions
await suggest('bonjoor', { language: 'fr' }); // -> ['bonjour', ...]

// A checker bound to one language
const de = createChecker('de');
await de.isCorrect('Haus'); // -> true
```

CommonJS works too:

```js
const { checkText } = require('fixnow');
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — preload dictionaries (skip first-call decode cost)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (default `'es'`), `strict` (Spanish accent strictness),
`suggestions`, `maxSuggestions` (5), `minWordLength` (3), `ignoreWords`, `isProtectedWord`.

## License

`fixnow`'s code is [MIT](./LICENSE). Bundled Arabic/German/Spanish dictionary data is
LGPL-3.0; French/Vietnamese are MIT. Full attribution in
[THIRD-PARTY-NOTICES.md](./THIRD-PARTY-NOTICES.md).