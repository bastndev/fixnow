import { loadDictionary } from './dictionary';
import { isAccepted } from './lang';
import type { LanguageCode } from './languages';
import { tokenize } from './tokenize';
import type { CheckOptions, Dictionary, SpellIssue } from './types';

const DEFAULT_LANGUAGE: LanguageCode = 'es';
const DEFAULT_MIN_WORD_LENGTH = 3;
const DEFAULT_MAX_SUGGESTIONS = 5;

// Dictionary verdicts are deterministic per (language, strict, exact word), so
// we memoize them across calls. This matters for an editor that re-checks the
// same words on every keystroke. Bounded with simple FIFO eviction.
const MAX_VERDICT_CACHE = 5000;
const verdictCache = new Map<string, boolean>();

function acceptedVerdict(
  word: string,
  language: LanguageCode,
  strict: boolean,
  dict: Dictionary,
): boolean {
  // Key on the exact word — case is significant in some languages (German nouns).
  const key = `${language}:${strict ? 1 : 0}:${word}`;
  const cached = verdictCache.get(key);
  if (cached !== undefined) return cached;

  const accepted = isAccepted(word, language, dict, strict);
  if (verdictCache.size >= MAX_VERDICT_CACHE) {
    const oldest = verdictCache.keys().next().value;
    if (oldest !== undefined) verdictCache.delete(oldest);
  }
  verdictCache.set(key, accepted);
  return accepted;
}

/** Finds misspelled words in `text` for the given language. */
export async function checkText(text: string, options: CheckOptions = {}): Promise<SpellIssue[]> {
  if (!text || text.trim().length < 2) return [];

  const language = options.language ?? DEFAULT_LANGUAGE;
  const minWordLength = options.minWordLength ?? DEFAULT_MIN_WORD_LENGTH;
  const strict = options.strict ?? false;
  const withSuggestions = options.suggestions ?? false;
  const maxSuggestions = options.maxSuggestions ?? DEFAULT_MAX_SUGGESTIONS;
  const ignore = toLowerSet(options.ignoreWords);
  const flag = toLowerSet(options.flagWords);
  const isProtectedWord = options.isProtectedWord;

  const dict = await loadDictionary(language);

  const makeIssue = (word: string, offset: number): SpellIssue => {
    const issue: SpellIssue = { offset, length: word.length, word };
    if (withSuggestions) issue.suggestions = dict.suggest(word, maxSuggestions);
    return issue;
  };

  const issues: SpellIssue[] = [];
  for (const { word, offset } of tokenize(text)) {
    const lower = word.toLowerCase();

    // Allowlist wins over everything else.
    if (ignore?.has(lower)) continue;
    if (isProtectedWord?.(word)) continue;

    // Explicit denylist: always flagged, even when the dictionary knows the
    // word and even when it is shorter than `minWordLength`.
    if (flag?.has(lower)) {
      issues.push(makeIssue(word, offset));
      continue;
    }

    if (word.length < minWordLength) continue;
    if (acceptedVerdict(word, language, strict, dict)) continue;

    issues.push(makeIssue(word, offset));
  }

  return issues;
}

/** Whether a single word is correctly spelled in the given language. */
export async function isCorrect(
  word: string,
  language: LanguageCode = DEFAULT_LANGUAGE,
  strict = false,
): Promise<boolean> {
  const dict = await loadDictionary(language);
  return acceptedVerdict(word, language, strict, dict);
}

function toLowerSet(words: Iterable<string> | undefined): Set<string> | undefined {
  if (!words) return undefined;
  const set = new Set<string>();
  for (const word of words) set.add(word.toLowerCase());
  return set;
}
