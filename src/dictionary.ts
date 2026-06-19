import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';
import { decodeTrie } from 'cspell-trie-lib';
import type { ITrie } from 'cspell-trie-lib';
import { LANGUAGES, type LanguageCode } from './languages';
import type { Dictionary } from './types';

// The built entry (dist/index.{js,cjs}) sits one level below the package root,
// where the `dictionaries/` folder is shipped. tsup's `shims` option makes
// import.meta.url resolve correctly in both the ESM and CJS outputs.
const PACKAGE_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

class TrieDictionary implements Dictionary {
  constructor(
    private readonly trie: ITrie,
    private readonly compound: boolean,
  ) {}

  has(word: string): boolean {
    // The second argument turns on cspell's legacy compound matching, which
    // German needs so valid compounds aren't flagged as misspellings.
    return this.compound ? this.trie.has(word, true) : this.trie.has(word);
  }

  suggest(word: string, max = 5): string[] {
    return this.trie.suggest(word, { numSuggestions: max });
  }
}

const cache = new Map<LanguageCode, Promise<Dictionary>>();

/** Loads and decodes a language dictionary, caching the result. */
export function loadDictionary(language: LanguageCode): Promise<Dictionary> {
  let pending = cache.get(language);
  if (!pending) {
    pending = decode(language).catch((error: unknown) => {
      // Don't cache a failed load — let the next call retry.
      cache.delete(language);
      throw error;
    });
    cache.set(language, pending);
  }
  return pending;
}

async function decode(language: LanguageCode): Promise<Dictionary> {
  const info = LANGUAGES[language];
  const file = join(PACKAGE_ROOT, 'dictionaries', language, info.trie);
  const text = gunzipSync(await readFile(file)).toString('utf8');
  return new TrieDictionary(decodeTrie(text), info.compound ?? false);
}

/**
 * Pre-loads dictionaries so the first check isn't slowed by trie decoding.
 * Pass nothing to warm every supported language.
 */
export function warmup(language?: LanguageCode | LanguageCode[]): Promise<void> {
  const languages =
    language == null
      ? (Object.keys(LANGUAGES) as LanguageCode[])
      : Array.isArray(language)
        ? language
        : [language];
  return Promise.all(languages.map(loadDictionary)).then(() => undefined);
}
