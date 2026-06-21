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
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_AR.md">العربية 🇸🇦</a> |
  <a href="https://github.com/bastndev/fixnow/blob/main/public/docs/README_HI.md">हिन्दी 🇮🇳</a><span>...</span>
</p>
</div>

<br>

Một trình kiểm tra lỗi chính tả đa ngôn ngữ nhỏ gọn với các đề xuất sửa đổi. Từ điển đã được đóng gói sẵn, vì vậy chỉ cần `npm i fixnow` là bạn có mọi thứ — với **không phụ thuộc thời gian chạy**, hỗ trợ cả ESM và CommonJS.

## Cài đặt

```bash
npm i fixnow
```

## Ngôn ngữ

| Mã | Ngôn ngữ | Giấy phép từ điển |
| ---- | ---------- | ------------------ |
| `ar` | Tiếng Ả Rập | LGPL-3.0 |
| `de` | Tiếng Đức | LGPL-3.0 |
| `en` | Tiếng Anh | MIT |
| `es` | Tiếng Tây Ban Nha| LGPL-3.0 |
| `fr` | Tiếng Pháp | MIT |
| `pt` | Tiếng Bồ Đào Nha | GPL-3.0-or-later |
| `ru` | Tiếng Nga | GPL-3.0-or-later |
| `vi` | Tiếng Việt | MIT |

## Cách sử dụng

```ts
import { checkText, suggest, createChecker } from "fixnow";

// Phát hiện lỗi chính tả (mặc định là tiếng Tây Ban Nha)
const issues = await checkText("Esto es un herror", {
  language: "es",
  suggestions: true,
});
// -> [{ offset: 11, length: 6, word: 'herror', suggestions: [...] }]

// Đề xuất sửa chữa một lần
await suggest("bonjoor", { language: "fr" }); // -> ['bonjour', ...]

// Một trình kiểm tra bị ràng buộc vào một ngôn ngữ
const de = createChecker("de");
await de.isCorrect("Haus"); // -> true
```

CommonJS cũng hoạt động:

```js
const { checkText } = require("fixnow");
```

### API

- `checkText(text, options?)` → `Promise<SpellIssue[]>`
- `isCorrect(word, language?, strict?)` → `Promise<boolean>`
- `suggest(word, { language?, max? })` → `Promise<string[]>`
- `createChecker(language)` → bound `{ check, suggest, isCorrect, warmup }`
- `warmup(language?)` — tải trước từ điển (bỏ qua chi phí giải mã ở lần gọi đầu tiên)
- `SUPPORTED_LANGUAGES`, `LANGUAGES`, `isSupportedLanguage`

**`CheckOptions`:** `language` (mặc định `'es'`), `strict` (độ nghiêm ngặt về dấu của tiếng Tây Ban Nha),
`suggestions`, `maxSuggestions` (5), `minWordLength` (3), `ignoreWords`, `flagWords`, `isProtectedWord`.

## Giấy phép

[MIT](../LICENSE)
