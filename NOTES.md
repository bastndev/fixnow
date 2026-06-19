# 📦 Essential npm commands for publishing packages

## Login

```bash
npm login --auth-type=web
```

Authenticates your npm account from the browser.

---

## Verify session

```bash
npm whoami
```

Shows the user you are authenticated as.

---

## Check if a name is available

```bash
npm view <package-name>
```

If it returns `E404`, the name is free to publish.

---

## Simulate the package to publish

```bash
npm pack --dry-run
```

Shows exactly which files will be included in the package.

---

## Publish the package

```bash
npm publish
```

Publishes the package to npm.

<br>
<br>
<br>
<br>

---

## Update version (Bug fix)

```bash
npm version patch
```

Increments the version from `1.0.0` → `1.0.1`.

---

## Update version (New feature)

```bash
npm version minor
```

Increments the version from `1.0.0` → `1.1.0`.

---

## Update version (Breaking change)

```bash
npm version major
```

Increments the version from `1.0.0` → `2.0.0`.

---

## Logout

```bash
npm logout
```

Logs out from the current account.

---

## View package information

```bash
npm view <package-name>
```

Shows information of a published package.

---

## Install a package

```bash
npm install <package-name>
```

Installs the package from npm.

---

<br>

---

# 📦 Publish a package to npm

## 1. Login (only the first time or when switching accounts)

```bash
npm login --auth-type=web
```

Verify that the session is active:

```bash
npm whoami
```

Expected output:

```text
bastndev
```

---

## 2. Enter the project

```bash
cd path/to/project
```

---

## 3. Check that the name is available

```bash
npm view <package-name>
```

Example:

```bash
npm view fixnow
```

If an error similar to this appears:

```text
npm ERR! code E404
```

It means the name is available to publish.

---

## 4. Review which files will be published

```bash
npm pack --dry-run
```

Verify that only the necessary files appear.

For example:

```
LICENSE
README.md
package.json
dist/
dictionaries/
```

And that these DO NOT appear:

```
src/
test/
.vscode/
.git/
node_modules/
```

---

## 5. Publish the package

```bash
npm publish
```

If the project has this script:

```json
"prepublishOnly": "npm run build"
```

npm will automatically run:

```
npm run build
↓
Pack
↓
Publish
```

---

# 🚀 Update an existing version

## Bug fix

```bash
npm version patch
npm publish
```

Example:

```
1.0.0
↓
1.0.1
```

---

## Compatible new feature

```bash
npm version minor
npm publish
```

Example:

```
1.0.1
↓
1.1.0
```

---

## Incompatible change (Breaking Change)

```bash
npm version major
npm publish
```

Example:

:

```
1.1.0
↓
2.0.0
```

---

# ✅ Check that the publication was successful

View package information:

```bash
npm view <package-name>
```

Example:

```bash
npm view fixnow
```

Or install it:

```bash
npm install <package-name>
```

Example:

```bash
npm install fixnow
```

---

# 📋 Pre-publish checklist

- [ ] `npm whoami` returns my username.
- [ ] The package name is available (only for the first publication).
- [ ] The version is correct (`package.json`).
- [ ] `npm pack --dry-run` shows only the necessary files.
- [ ] The tests pass successfully.
- [ ] The README is updated.
- [ ] The license is included.
- [ ] Run `npm publish`.

---

# 📝 Full flow (first publication)

```bash
npm login --auth-type=web
npm whoami

cd path/to/project

npm view <package-name>

npm pack --dry-run

npm publish
```

---

# 📝 Flow for future versions

```bash
cd path/to/project

npm version patch   # or minor / major

npm publish
```
