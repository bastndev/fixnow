import type { LanguageCode } from './languages';

export interface SpellIssue {
  /** Character offset of the word in the checked text. */
  offset: number;
  /** Length of the flagged word. */
  length: number;
  /** The flagged word, exactly as it appeared. */
  word: string;
  /** Correction candidates, present only when `suggestions` is requested. */
  suggestions?: string[];
}

export interface CheckOptions {
  /** Dictionary to check against. Defaults to `'es'`. */
  language?: LanguageCode;
  /**
   * Spanish only: when true, accent omissions (e.g. "codigo" for "código") are
   * flagged. When false (default) they are accepted as harmless.
   */
  strict?: boolean;
  /** Attach correction suggestions to every issue. Defaults to false. */
  suggestions?: boolean;
  /** Maximum suggestions per issue. Defaults to 5. */
  maxSuggestions?: number;
  /** Words shorter than this are never flagged. Defaults to 3. */
  minWordLength?: number;
  /** Words to always accept (case-insensitive), e.g. an app-specific allowlist. */
  ignoreWords?: Iterable<string>;
  /** Custom predicate to skip a word before it is checked (e.g. protected terms). */
  isProtectedWord?: (word: string) => boolean;
}

/** A loaded, decoded dictionary. Membership and suggestion lookups are synchronous. */
export interface Dictionary {
  /** True when the word is in the dictionary (compound-aware for German). */
  has(word: string): boolean;
  /** Correction candidates ordered best-first. */
  suggest(word: string, max?: number): string[];
}
