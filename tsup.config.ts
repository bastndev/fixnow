import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts' },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: false,
  target: 'node20',
  // Inline cspell-trie-lib (and its deps) so the published package has zero
  // runtime dependencies and the CJS build works without the ESM-only import
  // dance the extension currently needs.
  noExternal: [/.*/],
  // Provides import.meta.url in the CJS output and __dirname in the ESM output,
  // so dictionary paths resolve correctly in both.
  shims: true,
  outExtension({ format }) {
    return { js: format === 'esm' ? '.js' : '.cjs' };
  },
});
