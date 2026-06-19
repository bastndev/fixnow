import type { LanguageCode } from '../languages';
import type { Dictionary } from '../types';
import { acceptSpanish } from './es';

/**
 * Returns true when `word` is correctly spelled for `language`.
 *
 * Spanish gets accent- and enclitic-aware handling. Every other language uses
 * plain membership; the dictionary wrapper already applies compound matching
 * where the language needs it (German).
 */
export function isAccepted(
  word: string,
  language: LanguageCode,
  dict: Dictionary,
  strict: boolean,
): boolean {
  if (language === 'es') return acceptSpanish(word, dict, strict);
  return dict.has(word) || dict.has(word.toLowerCase());
}
