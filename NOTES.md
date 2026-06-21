# 📦 Essential bun commands for publishing packages

## Login

```bash
bun login --auth-type=web
```

Authenticates your npm account from the browser.

---

## Verify session

```bash
bun whoami
```

Shows the user you are authenticated as.

---

## Check if a name is available

```bash
bun pm view <package-name>
```

If it returns `E404`, the name is free to publish.

---

## Simulate the package to publish

```bash
bun pm pack --dry-run
```

Shows exactly which files will be included in the package.

---

## Publish the package

```bash
bun publish
```

Publishes the package to npm.

<br>
<br>
<br>
<br>

---

<br>
<br>
<br>
<br

##  

# Update 

```bash
bun pm version patch; git push --follow-tags; bun publish
```

<br>

## Update version (Bug fix)

```bash
bun pm version patch
```

Increments the version from `1.0.0` → `1.0.1`.

---

## Update version (New feature)

```bash
bun pm version minor
```

Increments the version from `1.0.0` → `1.1.0`.

---

## Update version (Breaking change)

```bash
bun pm version major
```

Increments the version from `1.0.0` → `2.0.0`.

---

## Logout

```bash
bun logout
```

Logs out from the current account.

---

## View package information

```bash
bun pm view <package-name>
```

Shows information of a published package.

---

## Install a package

```bash
bun add <package-name>
```

Installs the package from npm.

---

<br>

---

# 📦 Publish a package to npm

## 1. Login (only the first time or when switching accounts)

```bash
bun login --auth-type=web
```

Verify that the session is active:

```bash
bun whoami
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
bun pm view <package-name>
```

Example:

```bash
bun pm view fixnow
```

If an error similar to this appears:

```text
npm ERR! code E404
```

It means the name is available to publish.

---

## 4. Review which files will be published

```bash
bun pm pack --dry-run
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
bun publish
```

If the project has this script:

```json
"prepublishOnly": "bun run build"
```

bun will automatically run:

```
bun run build
↓
Pack
↓
Publish
```

---

# 🚀 Update an existing version

## Bug fix

```bash
bun pm version patch
bun publish
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
bun pm version minor
bun publish
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
bun pm version major
bun publish
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
bun pm view <package-name>
```

Example:

```bash
bun pm view fixnow
```

Or install it:

```bash
bun add <package-name>
```

Example:

```bash
bun add fixnow
```

---

# 📋 Pre-publish checklist

- [ ] `bun whoami` returns my username.
- [ ] The package name is available (only for the first publication).
- [ ] The version is correct (`package.json`).
- [ ] `bun pm pack --dry-run` shows only the necessary files.
- [ ] The tests pass successfully.
- [ ] The README is updated.
- [ ] The license is included.
- [ ] Run `bun publish`.

---

# 📝 Full flow (first publication)

```bash
bun login --auth-type=web
bun whoami

cd path/to/project

bun pm view <package-name>

bun pm pack --dry-run

bun publish
```

---

# 📝 Flow for future versions

```bash
cd path/to/project

bun pm version patch   # or minor / major

bun publish
```