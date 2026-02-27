## Real‑Time Collaborative Markdown Editor
**A lightweight way to co‑author documents without the overhead of heavyweight office suites.**
> "
> Live, lightweight, self‑hosted Markdown editing for remote teams, writers, and developers.
Built with Rust (high‑performance backend) and React + Vite (fast, modern UI).
> "

[![Sponsor](https://img.shields.io/badge/Sponsor-💖-orange)](https://github.com/sponsors/sumanjangili)
>  Why sponsor? 
> - Privacy‑first tooling is increasingly demanded by regulated industries (finance, healthcare). 
> - Your support helps us keep the core free while delivering enterprise‑grade extensions.
> - Sponsors gain visibility among a technically savvy audience that values open‑source, security, and performance.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Rust](https://img.shields.io/badge/Rust-1.78+-red.svg)](Rust)
[![Node](https://img.shields.io/badge/Node-20+-green.svg)](Node)

---

### Table of Contents
1. [Why It Solves a Real Pain Point](#why-it-solves-a-real-pain-point)
2. [Core Features (MVP)](#core-features-mvp)
3. [Tech Stack & Architecture](#tech-stack--architecture)
4. [One‑Click Deploy (Docker Compose)](#one‑click‑deploy‑docker‑compose)
5. [Development Workflow](#development-workflow)
6. [Roadmap & Future Enhancements](#roadmap--future-enhancements)
7. [Contributing](#contributing)
8. [License](#license)

---

### Why It Solves a Real Pain Point

| Problem | Existing Solutions | Gap / Limitation  | How This Project Helps |
| ------- | ------------------ | ----------------- | ---------------------- |
| **Fragmented collaboration** – Teams bounce between emails, shared drives, and comment threads. | Google Docs, Notion, Confluence | Closed‑source, heavy UI, subscription‑only, limited export control. | Provides a lightweight, markdown‑first environment that lives in your own infrastructure. |
| **Data‑privacy concerns** – Proprietary SaaS stores content on third‑party servers. | Google Docs, Microsoft 365 | No end‑to‑end encryption, compliance headaches. | **Self‑hosted** with PostgreSQL storage; you retain full ownership of every document. |
| **CI/CD integration** – Documentation needs to be part of the release pipeline (e.g., auto‑publish API docs). | Confluence, Notion APIs | Complex, proprietary, costly. | Built‑in **webhooks** and version snapshots that can trigger any CI workflow (GitHub Actions, GitLab CI, etc.). |
| **Cost for small teams** – Subscriptions quickly become expensive for startups or hobby projects. | All major SaaS | Per‑seat pricing, hidden fees. | **Free, open‑source core**; optional paid SaaS hosting or sponsorship tiers for advanced features. |
| **Heavy UI & learning curve** – Rich editors can be overwhelming for developers who just need plain text. | Google Docs, Office Online | Feature bloat, unnecessary formatting options. | **Markdown‑centric**, minimal UI, instant preview – perfect for developers, technical writers, and product managers. |

---

### Core Features (MVP)

| Feature | Description | Value Delivered |
| ------- | ----------- | --------------- |
| **Live collaborative editing** | WebSocket‑driven sync of markdown text between any number of users. | Eliminates “email‑back‑and‑forth”, prevents version conflicts. |
| **Markdown preview** | Side‑by‑side GitHub‑flavoured markdown rendering. | Immediate visual feedback; no need to export for review. |
| **Authentication & RBAC** | OAuth2 (GitHub, Google) + role‑based permissions (owner, editor, viewer). | Secure, granular access control for teams of any size. |
| **Document version history** | Snapshots stored in PostgreSQL (or SQLite) with diff view. | Recover mistakes, audit changes, comply with governance policies. |
| **Export options** | Download as .md, .pdf (via Pandoc), or .html. | Easy sharing outside the app; printable PDFs for stakeholders. |
| **One‑click Docker Compose deployment** | Pre‑configured docker-compose.yml for backend, frontend, and Postgres. | Low barrier to adoption; works on any machine with Docker. |
| **API hooks** | Webhooks on save/merge to trigger CI pipelines (auto‑publish docs, run tests). | Seamless integration with existing DevOps workflows. |
| **Responsive UI** | Tailwind‑CSS powered layout, works on desktop & tablets. | Modern look with minimal CSS bloat. |

---

### Tech Stack & Architecture

| Layer | Technology | Rationale |
| ----- | ---------- | --------- |
| **Backend** | Rust - Actix‑Web | High performance, safe concurrency, tiny binaries – ideal for real‑time websockets. |
| **Realtime engine** | tokio-tungstenite + serde_json | Async, low‑latency messaging over WebSockets. |
| **Database** | PostgreSQL (or SQLite for single‑node) | Reliable ACID storage for documents & version history. |
| **Auth** | oauth2 crate + JWT | Standard, secure token‑based authentication. |
| **Frontend** | React (Vite + TypeScript) | Fast development, rich component ecosystem, easy hot‑module reloading. |
| **Editor** | react-codemirror or Slate with markdown mode | Powerful text editing with syntax highlighting. |
| **Styling** | Tailwind CSS | Utility‑first, responsive UI with minimal CSS footprint. |
| **Containerisation** | Multi‑stage Docker builds (Rust → Alpine, Node → Alpine) | Small final images, reproducible builds. |
| **Orchestration** | Docker Compose | Simple, one‑command local/deployment setup. |

---

### One‑Click Deploy (Docker Compose)
The repository ships with a ready‑to‑use docker-compose.yml.

Running the stack takes under a minute on any machine with Docker installed.

#### 1. Start the stack
```bash
   docker compose up -d
```
**Docker Compose will:**
- Pull/build the three images (real-time-md-editor-backend, real-time-md-editor-frontend, postgres:15-alpine).
- Start containers in detached mode.
- Run a health‑check on the backend (/api/ping).

#### 2. Verify the deployment
```bash
   # Backend health‑check – should output "pong"
   curl -s http://localhost:8080/api/ping 
   # → pong
```
**Open the UI:**
```bash
   # macOS
   open http://localhost:3000
   # Linux
   xdg-open http://localhost:3000  
   # Or just paste the URL into any browser.
```
You should see the Markdown editor loading.

**In‑container connectivity test**
```bash
   docker compose exec frontend sh -c "wget -qO- http://backend:8080/api/ping"  
   # → pong
```
If you see pong, the internal Docker network is functioning correctly.

#### 3. Stop / clean up
```bash
   docker compose down --volumes   # removes containers, network, and the Postgres volume
```
Remove --volumes if you want to keep the database.

---

### Development Workflow

| Action | command |
| ------ | ------- |
| **Rebuild only the backend** | docker compose build backend && docker compose up -d backend |
| **Rebuild only the frontend** | docker compose build frontend && docker compose up -d frontend |
| **Run tests (backend)** | cd backend && cargo test |
| **Run lint / format (frontend)** | cd frontend && npm run lint && npm run format |
| **Hot‑reload during UI development** | cd frontend && npm run dev (exposes on http://localhost:5173) |
| **Run backend locally (without Docker)** | cd backend && cargo run (listens on 0.0.0.0:8080) |

>"
> Tip: Keep the docker-compose.yml as the source of truth for ports and container names. Adjust only when you have a concrete reason (e.g., port conflict on the host).
> "

---

### Roadmap & Future Enhancements

| Milestones | Planned Features |
| ------ | ------- |
| **Post‑MVP (Month 2‑3)** | • Webhooks for CI/CD triggers • PDF export via Pandoc (server‑side) • Diagram rendering plugin (Mermaid) |
| **RVersion 2 (Month 4‑6)** | • Real‑time cursor presence & user avatars • Full‑text search (PostgreSQL tsvector) • Multi‑tenant mode (multiple workspaces) |
| **Enterprise Tier** | • SSO (SAML/OIDC) • Auditing & compliance logs • Dedicated support SLA |
| **Community Extensions** | • VS Code extension for live sync • Plugin marketplace for custom renderers (PlantUML, MathJax) |

---

### Contributing
We welcome contributions of any kind—code, documentation, design, or ideas.
1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/websocket‑optimisation`).
3. Write tests and ensure the CI pipeline passes.
4. Submit a Pull Request with a clear description of the change.
Please read the CONTRIBUTING.md for coding standards, commit guidelines, and the code‑review process.

#### Good First Issues
- Add unit tests for the version‑diff algorithm.
- Implement a simple “copy‑link” button for the generated share URL.
- Polish the Tailwind theme (dark mode support).

---

### License
The **Real‑Time Collaborative Markdown Editor** is released under the **MIT License**.See the LICENSE file for full terms.

#### Thank you!
If you find this project useful, please ⭐ the repository, spread the word, and consider supporting us through sponsorship. Together we can keep collaborative writing fast, private, and affordable for everyone.

- Repository: [https://github.com/sumanjangili/real‑time‑md‑editor](https://github.com/sumanjangili/real‑time‑md‑editor)
- Support / Issues: [https://github.com/sumanjangili/real‑time‑md‑editor/issues](https://github.com/sumanjangili/real‑time‑md‑editor/issues)

---

> For any questions, open an issue on GitHub or contact the maintainer at **contact@sumanjangili.com**.
