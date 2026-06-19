# Third-Party Notices

`fixnow`'s own code is licensed under the MIT License (see `LICENSE`).
The package additionally **bundles** the following third-party material. Each
component keeps its original license, reproduced below or in the referenced
files.

---

## Bundled dictionary data (`dictionaries/`)

The compiled word-list tries are derived from the
[cspell-dicts](https://github.com/streetsidesoftware/cspell-dicts) project.
The full license text for each is kept next to the data in
`dictionaries/<lang>/LICENSE`.

| Language | Folder | Source package | License |
| --- | --- | --- | --- |
| Arabic | `dictionaries/ar` | `@cspell/dict-ar` | LGPL-3.0-only |
| German | `dictionaries/de` | `@cspell/dict-de-de` | LGPL-3.0-only |
| Spanish | `dictionaries/es` | `@cspell/dict-es-es` | LGPL-3.0-only |
| French | `dictionaries/fr` | `@cspell/dict-fr-fr` | MIT |
| Vietnamese | `dictionaries/vi` | `@cspell/dict-vi-vn` | MIT |

### LGPL-3.0 components (Arabic, German, Spanish)

These dictionaries are licensed under the **GNU Lesser General Public License
v3.0**. In compliance with the LGPL:

- The complete license text ships in each `dictionaries/<lang>/LICENSE`.
- The data is used as a separable, replaceable component: it lives in plain
  `.trie.gz` files under `dictionaries/`, which you may replace with your own
  compatible dictionary build.
- The corresponding sources are the upstream cspell-dicts dictionaries linked
  above (built from their respective Hunspell sources).

> **Note:** Portuguese (Brazil) and Russian are intentionally **not** bundled,
> because their cspell dictionaries are GPL-3.0 and cannot be combined into an
> MIT-licensed package. They can be shipped as a separate, GPL-licensed add-on
> if needed.

---

## Bundled library

- **cspell-trie-lib** — MIT License — © Street Side Software.
  Inlined into `dist/` to provide trie decoding and suggestions. See
  <https://github.com/streetsidesoftware/cspell>.
