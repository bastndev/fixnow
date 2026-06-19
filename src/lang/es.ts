import type { Dictionary } from '../types';

// Enclitic pronoun clusters that attach to infinitives/gerunds/imperatives
// (e.g. corregir + me -> corregirme). Longest-first so "melo" is tried before
// "lo"/"me".
const ENCLITICS = [
  'noslo', 'nosla', 'melo', 'mela', 'telo', 'tela', 'selo', 'sela', 'oslo', 'osla',
  'nos', 'les', 'los', 'las', 'os', 'me', 'te', 'se', 'lo', 'la', 'le',
];

const ACUTE_ACCENT: Record<string, string> = {
  a: 'á', // á
  e: 'é', // é
  i: 'í', // í
  o: 'ó', // ó
  u: 'ú', // ú
};

function deaccent(value: string): string {
  return value.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

// Accept a word as correct if it matches a dictionary entry once Spanish acute
// accents are ignored — i.e. the user typed "codigo"/"tambien" but the trie
// only knows "código"/"también". We strip accents to a base form, then test
// every combination of accented vowels. Bounded to 6 vowels (≤64 lookups).
function matchesIgnoringAccents(lowerWord: string, dict: Dictionary): boolean {
  if (dict.has(lowerWord)) return true;

  const base = deaccent(lowerWord);
  const vowelPositions: number[] = [];
  for (let i = 0; i < base.length; i++) {
    if (ACUTE_ACCENT[base[i]!]) vowelPositions.push(i);
  }
  if (vowelPositions.length === 0 || vowelPositions.length > 6) return false;

  const chars = base.split('');
  const combinations = 1 << vowelPositions.length;
  for (let mask = 0; mask < combinations; mask++) {
    for (let bit = 0; bit < vowelPositions.length; bit++) {
      const pos = vowelPositions[bit]!;
      chars[pos] = mask & (1 << bit) ? ACUTE_ACCENT[base[pos]!]! : base[pos]!;
    }
    if (dict.has(chars.join(''))) return true;
  }
  return false;
}

// The es dictionary covers most verb+pronoun forms but has gaps (e.g.
// "corregirme"). Strip a trailing enclitic and accept the word only when the
// remaining stem is a real infinitive/gerund, so true typos stay flagged.
function isEncliticVerb(lowerWord: string, dict: Dictionary): boolean {
  for (const clitic of ENCLITICS) {
    if (lowerWord.length <= clitic.length + 2 || !lowerWord.endsWith(clitic)) continue;

    const stem = lowerWord.slice(0, lowerWord.length - clitic.length);
    if (!stem.endsWith('r') && !stem.endsWith('ndo')) continue;

    if (dict.has(stem) || dict.has(deaccent(stem))) return true;
  }
  return false;
}

/**
 * Spanish-aware acceptance. In lenient mode (default) accent omissions are
 * tolerated; in strict mode only exact dictionary forms (and enclitic verbs)
 * are accepted.
 */
export function acceptSpanish(word: string, dict: Dictionary, strict: boolean): boolean {
  const lower = word.toLowerCase();
  const inDictionary = strict
    ? dict.has(word) || dict.has(lower)
    : dict.has(word) || matchesIgnoringAccents(lower, dict);
  return inDictionary || isEncliticVerb(lower, dict);
}
