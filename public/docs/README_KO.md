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
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_PT.md">Português 🇧🇷</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_RU.md">Русский 🇷🇺</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_VI.md">Tiếng Việt 🇻🇳</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_AR.md">العربية 🇸🇦</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_HI.md">हिन्दी 🇮🇳</a><span>...</span>
</p>
</div>

교정 제안 기능이 있는 작은 다국어 맞춤법 검사기. 사전이 번들로 제공되므로 `npm i fixnow` 만으로 필요한 모든 것을 얻을 수 있습니다 — ESM 및 CommonJS 모두에서 **런타임 종속성 제로**입니다.

## 설치

```bash
npm i fixnow
```

## 언어

| 코드 | 언어 | 사전 라이선스 |
| ---- | ---------- | ------------------ |
| `ar` | 아랍어 | LGPL-3.0 |
| `de` | 독일어 | LGPL-3.0 |
| `en` | 영어 | MIT |
| `es` | 스페인어 | LGPL-3.0 |
| `fr` | 프랑스어 | MIT |
| `pt` | 포르투갈어 | GPL-3.0-or-later |
| `ru` | 러시아어 | GPL-3.0-or-later |
| `vi` | 베트남어 | MIT |

## 사용법

```ts
import { checkText, suggest, createChecker } from "fixnow";

// 맞춤법 오류 감지 (기본값은 스페인어)
const issues = await checkText("Esto es un herror", {
  language: "es",
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// 일회성 교정 제안
await suggest("bonjoor", { language: "fr" }); // -> ['bonjour', ...]

// 하나의 언어에 바인딩된 검사기
const de = createChecker("de");
await de.isCorrect("Haus"); // -> true
```

CommonJS에서도 작동합니다:

```js
const { checkText } = require("fixnow");
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — 사전 미리 로드 (첫 호출 디코딩 비용 건너뛰기)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (기본값 `'es'`), `strict` (스페인어 악센트 엄격성),
`suggestions`, `maxSuggestions` (5), `minWordLength` (3), `ignoreWords`, `flagWords`, `isProtectedWord`.

## 라이선스

[MIT](../LICENSE)
