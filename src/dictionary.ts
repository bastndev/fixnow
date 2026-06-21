import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';
import { decodeTrie } from 'cspell-trie-lib';
import type { ITrie } from 'cspell-trie-lib';
import { LANGUAGES, SUPPORTED_LANGUAGES, isSupportedLanguage, type LanguageCode } from './languages';
import type { Dictionary } from './types';

// Resolve the package root (where `dictionaries/` ships). Direct execution —
// ESM, or CJS via tsup's shim — gives a usable import.meta.url. A downstream
// bundler that inlines fixnow into CJS empties import.meta, so guard the read
// instead of letting fileURLToPath(undefined) throw; when there's no usable
// url we throw an actionable error telling the consumer to mark fixnow
// external. We deliberately do NOT fall back to a bare `__dirname`: referencing
// it makes tsup's `shims` inject an *eager* ESM __dirname polyfill (itself
// fileURLToPath(import.meta.url)) that runs at module load and re-introduces
// the very opaque crash this guard exists to prevent once a bundler empties
// import.meta. import.meta.url already covers direct ESM and (shimmed) CJS.
function resolvePackageRoot(): string {
  let url: string | undefined;
  try {
    url = (import.meta as { url?: string }).url;
  } catch {
    url = undefined;
  }
  if (url) {
    return join(dirname(fileURLToPath(url)), '..');
  }
  // No on-disk anchor — fixnow has been inlined into a bundle, where its
  // dictionaries don't exist. Fail loudly with the fix instead of cryptically.
  throw new Error(
    "fixnow could not locate its dictionaries. Mark 'fixnow' as external in " +
      "your bundler (esbuild: external: ['fixnow']) so it loads from node_modules.",
  );
}

const PACKAGE_ROOT = resolvePackageRoot();

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

// Share the dictionary cache across every bundled copy of this module, so a
// consumer who imports both `fixnow` and `fixnow/es` pays the trie decode cost
// once. Per-bundle module state would otherwise force a re-decode per entry.
const CACHE_SYMBOL = Symbol.for('fixnow.dictionaryCache.v2');
const globalRegistry = globalThis as {
  [k: symbol]: Map<LanguageCode, Promise<Dictionary>> | undefined;
};
const cache: Map<LanguageCode, Promise<Dictionary>> =
  globalRegistry[CACHE_SYMBOL] ?? (globalRegistry[CACHE_SYMBOL] = new Map());

/** Loads and decodes a language dictionary, caching the result. */
export function loadDictionary(language: LanguageCode): Promise<Dictionary> {
  if (!isSupportedLanguage(language)) {
    return Promise.reject(
      new Error(
        `fixnow: unsupported language "${language}". Supported languages: ${SUPPORTED_LANGUAGES.join(', ')}.`,
      ),
    );
  }

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
  let buf: Buffer;
  try {
    buf = await readFile(file);
  } catch (cause) {
    throw new Error(
      `fixnow could not read its "${language}" dictionary at ${file}. If you ` +
        "bundle your app, mark 'fixnow' as external (esbuild: external: ['fixnow']) " +
        'so it loads from node_modules at runtime.',
      { cause },
    );
  }
  const text = gunzipSync(buf).toString('utf8');
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
