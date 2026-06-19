<div align="center">
  <a href="https://github.com/bastndev/fixnow">
    <img alt="fixnow logo" src="https://raw.githubusercontent.com/bastndev/fixnow/main/public/github/banner.webp" height="128">
  </a>
  <h1> </h1>

<a href="https://www.npmjs.com/package/fixnow"><img alt="NPM version" src="https://img.shields.io/npm/v/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://www.npmjs.com/package/fixnow"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/bastndev/fixnow/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/npm/l/fixnow.svg?style=for-the-badge&labelColor=000000"></a>
<a href="https://github.com/bastndev/fixnow/stargazers"><img alt="GitHub Stars" src="https://img.shields.io/github/stars/bastndev/fixnow.svg?style=for-the-badge&labelColor=000000"></a>

<p align="center">
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_ES.md">Español 🇪🇸</a> |
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

一个微型的多语言拼写检查器，支持纠错建议。自带词典，只需 `npm i fixnow` 即可获得一切 —— **零运行时依赖**，支持 ESM 和 CommonJS。

## 安装

```bash
npm i fixnow
```

## 语言

| 代码 | 语言 | 词典许可证 |
| ---- | ---------- | ------------------ |
| `ar` | 阿拉伯语 | LGPL-3.0 |
| `de` | 德语 | LGPL-3.0 |
| `es` | 西班牙语 | LGPL-3.0 |
| `fr` | 法语 | MIT |
| `vi` | 越南语 | MIT |

## 使用方法

```ts
import { checkText, suggest, createChecker } from "fixnow";

// 检测拼写错误 (默认为西班牙语)
const issues = await checkText("Esto es un herror", {
  language: "es",
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// 一次性纠错建议
await suggest("bonjoor", { language: "fr" }); // -> ['bonjour', ...]

// 绑定到特定语言的检查器
const de = createChecker("de");
await de.isCorrect("Haus"); // -> true
```

同样支持 CommonJS:

```js
const { checkText } = require("fixnow");
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — 预加载词典 (跳过首次调用的解码开销)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (默认 `'es'`), `strict` (西班牙语重音严格模式),
`suggestions`, `maxSuggestions` (5), `minWordLength` (3), `ignoreWords`, `isProtectedWord`.

## 许可证

[MIT](../LICENSE).
