// Segments that must never be flagged: code spans/blocks, URLs, emails, paths,
// CLI flags, hex colors, ACRONYMS, file names and dotted identifiers. Ported
// verbatim from the extension's host-spellcheck so behavior stays identical —
// every branch here is language-agnostic, so it is safe across all dictionaries.
const PROTECTED_PATTERN =
  /\[(?:Image|Code|Text) #\d+[^\]\n]*\]|\[Skills? #[^\]\n]+\]|\/skills #\d+|\/skill\b|```[\s\S]*?```|`[^`\n]+`|https?:\/\/[^\s"'`<>]+|[\w.-]+@[\w.-]+\.\w{2,}|(?:\.{1,2}\/|~\/|\/)[^\s"'`<>]+|[A-Za-z]:\\[^\s"'`<>]+|#[0-9a-fA-F]{3,8}\b|\b[A-Z][A-Z0-9_]{1,}\b|(?<!\S)--?[A-Za-z][\w-]*(?:=[^\s"'`<>]+)?|\b(?:@[\w.-]+\/)?[\w.-]+@[\w.-]+\b|\b[\w.-]+\.(?:ts|tsx|js|jsx|mjs|cjs|json|html|css|scss|sass|md|mdx|svg|png|jpg|jpeg|gif|webp|yml|yaml|toml|env|lock)\b|\b[$A-Za-z_][\w$]*(?:[._:$][\w$-]+)+\b/g;

// Letters plus combining marks, so decomposed diacritics (Vietnamese, French)
// stay attached to their base letter rather than splitting the word.
const WORD_PATTERN = /[\p{L}\p{M}]+/gu;

export interface Token {
  word: string;
  offset: number;
}

/**
 * Yields candidate words from `text`, skipping anything inside a protected
 * segment (code, URLs, paths, acronyms, …).
 */
export function* tokenize(text: string): Generator<Token> {
  const protectedRanges: Array<[number, number]> = [];
  for (const match of text.matchAll(PROTECTED_PATTERN)) {
    const start = match.index ?? 0;
    protectedRanges.push([start, start + match[0].length]);
  }

  const isProtected = (offset: number): boolean =>
    protectedRanges.some(([start, end]) => offset >= start && offset < end);

  for (const match of text.matchAll(WORD_PATTERN)) {
    const offset = match.index ?? 0;
    if (isProtected(offset)) continue;
    yield { word: match[0], offset };
  }
}
