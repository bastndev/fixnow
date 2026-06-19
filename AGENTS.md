# AGENTS.md

## Project

- Tiny multilingual spell checker with suggestions. Arabic, German, Spanish, French and Vietnamese dictionaries bundled — one install, zero runtime dependencies..
- Language: TypeScript.

## Package manager

- Use `npm` for this workspace. The lockfile is `package-lock.json`.
- Run package scripts with `npm run <script>`.

## Commands

```bash
npm run test         # run tests
```

No linter, formatter, test runner is configured.

## Architecture

- Project: fixnow.
- Package main: `./dist/index.cjs`.

## Source entry points

- `src/index.ts` (48 lines) — exports API.

## Runtime assets and packaging

- `dist/` is ignored, so build before launching, testing, or packaging.
- TypeScript uses module `ESNext`, target `ES2022`, strict mode.

## Testing and launch

- Test with `npm run test` (node test/smoke.mjs).

## Caveats

- No linter detected — no `lint` script, no ESLint config.
- No formatter detected — no Prettier config or format script.

## Boundaries

- Prefer existing local patterns and helper APIs before adding new abstractions.
- Keep generated, packaged, and runtime asset boundaries intact; do not move files across host/webview ownership without updating build and packaging config.
