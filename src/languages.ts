export const SUPPORTED_LANGUAGES = ['ar', 'de', 'es', 'fr', 'vi'] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

export interface LanguageInfo {
  /** ISO 639-1 code used everywhere in the public API. */
  code: LanguageCode;
  /** Human-readable language name. */
  name: string;
  /** Gzipped trie file shipped under `dictionaries/<code>/`. */
  trie: string;
  /** SPDX identifier of the bundled dictionary data. */
  license: string;
  /** Enable cspell's compound-word matching (needed for German). */
  compound?: boolean;
}

export const LANGUAGES: Record<LanguageCode, LanguageInfo> = {
  ar: { code: 'ar', name: 'Arabic', trie: 'ar.trie.gz', license: 'LGPL-3.0-only' },
  de: { code: 'de', name: 'German', trie: 'de.trie.gz', license: 'LGPL-3.0-only', compound: true },
  es: { code: 'es', name: 'Spanish', trie: 'es.trie.gz', license: 'LGPL-3.0-only' },
  fr: { code: 'fr', name: 'French', trie: 'fr.trie.gz', license: 'MIT' },
  vi: { code: 'vi', name: 'Vietnamese', trie: 'vi.trie.gz', license: 'MIT' },
};

export function isSupportedLanguage(code: string): code is LanguageCode {
  return (SUPPORTED_LANGUAGES as readonly string[]).includes(code);
}
