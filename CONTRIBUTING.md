## Contributing to the Real-Time Markdown Editor

Thank you for your interest in improving this project! 🎉  
We welcome contributions of any size—bug reports, documentation fixes, new features, or full demo implementations.

### Table of Contents
1. [Code of Conduct](CODE_OF_CONDUCT.md)
2. [How to Contribute](#how-to-contribute)
3. [Development Setup](#development-setup)
4. [Branching Model & Workflow](#branching-model--workflow)
5. [Commit Message Guidelines](#commit-message-guidelines)
6. [Testing](#testing)
7. [Submitting a Pull Request](#submitting-a-pull-request)
8. [Reporting Issues](#reporting-issues)

### How to Contribute
1. **Fork** the repository on GitHub.
2. **Clone** your fork locally.
3. Create a **new branch** for your change (see naming conventions below).
4. Make your changes, ensuring the code builds and tests pass.
5. Open a **Pull Request** (PR) against the `main` branch of the upstream repo.

### Development Setup
#### Prerequisites
- **Rust** ≥ 1.78 (`cargo`)
- **Node.js** ≥ 20 (`npm` or `pnpm`)
- **Docker** (optional, for containerised testing)
- **Git** (obviously)

#### Getting the Code
```bash
git clone https://github.com/sumanjangili/real-time-md-editor.git
cd real-time-md-editor
```
#### Installing Dependencies
```bash
# Backend (Rust)
cd backend && cargo build

# Front‑end (React)
cd frontend && npm ci  # installs exact versions from package‑lock.json
```
#### Running Locally
```bash
# Backend
cargo run --release

# Front‑end (in another terminal)
npm run dev
```
#### Docker (optional)
```bash
docker compose up -d
```

---

### Branching Model & Workflow

| Type | Prefix | Example |
| ------- | ------ | ---------- |
| Feature | `feat/` | `feat/add-audit-log` |
| Bugfix |` fix/` | `fix/incorrect-status-code` |
| Documentation | `docs/` | `docs/update-readme` |
| Refactor | `refactor/` | `refactor/cleanup-middleware`|

All branches should be created from the latest `main`.

---

### Commit Message Guidelines
Follow the Conventional Commits style:
```js
<type>(<scope>): <subject>

<body>
```

- `type`: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`
- `scope` (optional): the demo name or component, e.g.,` vault`,` api`, `ui`
- `subject`: short, imperative description (≤50 characters)

Example:
`feat(vault): add immutable consent receipt model`

---

### Testing
- **Backend**: `cargo test --all`
- **Frontend**: `npm test` (uses Jest/Vitest depending on the template)
- **Integration** (Docker): docker compose up --abort-on-container-exit --exit-code-from regulatory_api
Please ensure **all tests pass** before opening a PR.

---

### Submitting a Pull Request
1. Push your branch to your fork: `git push origin <branch-name>`
2. Open a PR on GitHub:
- Title: `<type>(<scope>): <short description>`
- Description: Explain what and why, reference any related issue (`Closes #123`).
3. Fill out the PR checklist (automated via GitHub Actions):

- [ ] **Code builds locally**  
  - `cargo build` (backend)  
  - `npm install && npm run build` (frontend)

- [ ] **All tests pass**  
  - `cargo test --all`  
  - `npm test` (or `npm run test`)

- [ ] **Linting passes**  
  - `cargo fmt -- --check`  
  - `cargo clippy -- -D warnings`  
  - `npm run lint`

- [ ] **Documentation updated (if applicable)**  
  - README / CONTRIBUTING / API docs reflect the new changes  
  - Inline code comments / Rust doc comments (`///`) are up‑to‑date4.

Copy the block above into your PR description or .github/pull_request_template.md. When the author checks each box, GitHub will display a visual checklist, and your CI workflow can enforce the same checks automatically.

> Documentation updated (if applicable)
Maintainers will review, request changes if needed, and merge once approved.

---

### Reporting Issues
- Use GitHub Issues.
- Include:
- A clear title.
- Steps to reproduce (for bugs) or a detailed description (for feature requests).
- Environment details (OS, Rust version, Node version, Docker version).
- Any relevant logs or screenshots.

---

#### Thank You!
Your contributions help make live collaborative development easier for everyone. 🙏

---


