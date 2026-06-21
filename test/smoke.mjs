import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

import {
  SUPPORTED_LANGUAGES,
  checkText,
  createChecker,
  isCorrect,
  suggest,
} from '../dist/index.js';

console.log('supported languages:', SUPPORTED_LANGUAGES.join(', '));

// The CJS build must load and expose the same API (this is what the VSCode
// extension's esbuild CJS host bundle will require()).
const require = createRequire(import.meta.url);
const cjs = require('../dist/index.cjs');
assert.equal(typeof cjs.checkText, 'function', 'CJS build exports checkText');

// --- Spanish -------------------------------------------------------------
assert.equal((await checkText('código', { language: 'es' })).length, 0, 'es: "código" is correct');
const esIssues = await checkText('Esto es un herror', { language: 'es', suggestions: true });
const herror = esIssues.find((i) => i.word === 'herror');
assert.ok(herror, 'es: "herror" is flagged');
console.log('es  "herror" ->', herror.suggestions);

// Lenient mode tolerates accent omissions; strict mode flags them.
assert.equal((await checkText('codigo', { language: 'es' })).length, 0, 'es lenient: "codigo" accepted');
assert.ok(
  (await checkText('codigo', { language: 'es', strict: true })).length > 0,
  'es strict: "codigo" flagged',
);

// --- French --------------------------------------------------------------
assert.equal(await isCorrect('bonjour', 'fr'), true, 'fr: "bonjour" is correct');
assert.equal(await isCorrect('bonjoor', 'fr'), false, 'fr: "bonjoor" is a typo');
console.log('fr  "bonjoor" ->', await suggest('bonjoor', { language: 'fr', max: 3 }));

// --- German (compound matching enabled) ----------------------------------
assert.equal(await isCorrect('Haus', 'de'), true, 'de: "Haus" is correct');

// --- English -------------------------------------------------------------
assert.equal(await isCorrect('hello', 'en'), true, 'en: "hello" is correct');
assert.equal(await isCorrect('helo', 'en'), false, 'en: "helo" is a typo');
console.log('en  "helo"  ->', await suggest('helo', { language: 'en', max: 3 }));

// --- Russian -------------------------------------------------------------
assert.equal(await isCorrect('привет', 'ru'), true, 'ru: "привет" is correct');
assert.equal(await isCorrect('привед', 'ru'), false, 'ru: "привед" is a typo');

// --- Portuguese ----------------------------------------------------------
assert.equal(await isCorrect('obrigado', 'pt'), true, 'pt: "obrigado" is correct');
assert.equal(await isCorrect('obrigaado', 'pt'), false, 'pt: "obrigaado" is a typo');

// --- Arabic & Vietnamese load and return a verdict -----------------------
assert.equal(typeof (await isCorrect('عمل', 'ar')), 'boolean', 'ar: returns a verdict');
assert.equal(typeof (await isCorrect('việc', 'vi')), 'boolean', 'vi: returns a verdict');

// --- ignoreWords / flagWords ---------------------------------------------
assert.equal(
  (await checkText('Esto es un herror', { language: 'es', ignoreWords: ['herror'] })).length,
  0,
  'ignoreWords suppresses a flagged word',
);
const flagged = await checkText('Esta palabra es correcta', { language: 'es', flagWords: ['correcta'] });
assert.ok(flagged.some((i) => i.word === 'correcta'), 'flagWords flags a valid dictionary word');
assert.equal(
  (await checkText('palabra correcta', {
    language: 'es',
    flagWords: ['correcta'],
    ignoreWords: ['correcta'],
  })).length,
  0,
  'ignoreWords takes precedence over flagWords',
);

// --- unsupported language rejects with a clear error ---------------------
await assert.rejects(
  checkText('some text here', { language: 'ja' }),
  /unsupported language/i,
  'unsupported language rejects with a clear message',
);

// --- Bound checker -------------------------------------------------------
const es = createChecker('es');
assert.equal(await es.isCorrect('palabra'), true, 'createChecker("es") works');

console.log('\n✅ smoke test passed');
