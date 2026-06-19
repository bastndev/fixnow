import { loadDictionary } from './dictionary';
import { isAccepted } from './lang';
import type { LanguageCode } from './languages';
import { tokenize } from './tokenize';
import type { CheckOptions, SpellIssue } from './types';

const DEFAULT_LANGUAGE: LanguageCode = 'es';
const DEFAULT_MIN_WORD_LENGTH = 3;
const DEFAULT_MAX_SUGGESTIONS = 5;

/** Finds misspelled words in `text` for the given language. */
export async function checkText(text: string, options: CheckOptions = {}): Promise<SpellIssue[]> {
  if (!text || text.trim().length < 2) return [];

  const language = options.language ?? DEFAULT_LANGUAGE;
  const minWordLength = options.minWordLength ?? DEFAULT_MIN_WORD_LENGTH;
  const strict = options.strict ?? false;
  const withSuggestions = options.suggestions ?? false;
  const maxSuggestions = options.maxSuggestions ?? DEFAULT_MAX_SUGGESTIONS;
  const ignore = toLowerSet(options.ignoreWords);
  const isProtectedWord = options.isProtectedWord;

  const dict = await loadDictionary(language);
  const verdicts = new Map<string, boolean>();

  const issues: SpellIssue[] = [];
  for (const { word, offset } of tokenize(text)) {
    if (word.length < minWordLength) continue;

    const lower = word.toLowerCase();
    if (ignore?.has(lower)) continue;
    if (isProtectedWord?.(word)) continue;

    let correct = verdicts.get(lower);
    if (correct === undefined) {
      correct = isAccepted(word, language, dict, strict);
      verdicts.set(lower, correct);
    }
    if (correct) continue;

    const issue: SpellIssue = { offset, length: word.length, word };
    if (withSuggestions) issue.suggestions = dict.suggest(word, maxSuggestions);
    issues.push(issue);
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
  return isAccepted(word, language, dict, strict);
}

function toLowerSet(words: Iterable<string> | undefined): Set<string> | undefined {
  if (!words) return undefined;
  const set = new Set<string>();
  for (const word of words) set.add(word.toLowerCase());
  return set;
}
