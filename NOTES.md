# ✅ NPM Provenance with GitHub Actions

Guide to enable the verified badge on npmjs.com.

---

## Step 1 — npm Token

Go to [npmjs.com/settings/~/tokens](https://www.npmjs.com/settings/~/tokens)

→ **Generate New Token** → **Granular Access Token**

| Field | Value |
|-------|-------|
| Token name | `github-<package-name>` |
| Bypass two-factor authentication (2FA) | ✅ checked |
| Permissions | **Read and write** |
| Select packages | only `<package-name>` |
| Expiration | 90 days (maximum) |

→ **Generate token** → copy the `npm_...`

---

## Step 2 — GitHub Secret

Go to the repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Field | Value |
|-------|-------|
| Name | `NPM_TOKEN` |
| Secret | the copied `npm_...` |

→ **Add secret**

---

## Step 3 — Workflow

Create `.github/workflows/publish.yml`:

```yaml
name: Publish

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read

    steps:
      - uses: actions/checkout@v4

      - uses: oven-sh/setup-bun@v2
        with:
          bun-version: latest

      - name: Install dependencies
        run: bun install

      - name: Build
        run: bun run build

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'

      - name: Publish with provenance
        run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Commit and push to `main`.

---

## Step 4 — Publish

Every time you want to release a new version:

```bash
# From main (with changes already merged)
git tag v1.0.0 && git push origin v1.0.0
```

GitHub Actions handles build + publish + provenance automatically.

---

## Daily workflow

```
work on dev
    ↓
merge to main (from GitHub)
    ↓
git tag vX.X.X && git push origin vX.X.X
    ↓
✅ GitHub Actions publishes with provenance
```

---

## Notes

- The tag must match the version in `package.json` (e.g. `v2.0.5` → `"version": "2.0.5"`)
- If the tag already exists: `git tag -d vX.X.X && git push origin --delete vX.X.X && git tag vX.X.X && git push origin vX.X.X`
- Token expires every 90 days — renew on npm and update the secret in GitHub
- Each package needs its own `NPM_TOKEN` with its specific package selected