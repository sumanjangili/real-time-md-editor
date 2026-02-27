## CHANGELOG
All notable changes to the **Real-Time Markdown Editor** are documented in this file.

The format follows **Keep a Changelog** conventions and adheres to [Semantic Versioning](https://semver.org/).

### [Unreleased]

#### Added
- Placeholder for upcoming features, bug‑fixes, and improvements.

#### Changed
- N/A

#### Fixed
- N/A

#### Removed
- N/A

---

### [v0.2.0] – 2026‑03‑31 (Planned – Post‑MVP)
#### Added
- **Webhooks** – Trigger external CI pipelines on document save/merge.
- **PDF export** – Server‑side generation via pandoc.
- **Marketplace extensions** – Initial Code extension scaffolding for syncing with the server.
- **Optional plugins** – Diagram rendering (Mermaid, PlantUML) support.

#### Changed
- Refactored Docker image to separate production runtime from build stage for smaller footprint.
- Updated authentication flow to support SSO providers in addition to GitHub.

#### Fixed
- Minor UI glitches in the version‑history diff view.
- Race condition in WebSocket broadcast under high‑concurrency load.
  
#### Removed
- Deprecated legacy sqlite‑only mode (PostgreSQL is now the default).
  
---

### [v0.1.0] – 2026‑02‑27 (MVP Release)
#### Added
- Initial release of Real-Time Markdown Editor project:
  - **Live collaborative editing** - WebSocket‑driven real‑time sync of markdown text between multiple users.
  - **Markdown preview** - Side‑by‑side rendered view using GitHub‑flavored Markdown.
  - **Authentication & RBAC** – OAuth2 (GitHub) login plus role‑based permissions (owner, editor, viewer).
  - **Document version history** – Snapshots stored in PostgreSQL/SQLite with a diff UI for recovering or auditing changes.
  - **Export options** – Ability to download documents as .md, .pdf (via pandoc), or HTML.
  - **Self‑hosting script** – One‑click Docker‑Compose deployment covering both backend and frontend services.
  - **API hooks** – Basic webhook skeleton that can be extended to trigger CI pipelines on save/merge.
  - **Tech stack foundation** –
       - Backend: Rust (Actix‑Web or Axum) + tokio‑tungstenite for WebSockets, serde_json for messaging, PostgreSQL/SQLite for storage.
       - Frontend: React + Vite + TypeScript, editor built with react-codemirror (or Slate) in markdown mode, styled with Tailwind CSS.
       - Docker: Multi‑stage builds producing small Alpine‑based runtime images.

### Changed
- First stable release – marks the transition from prototype to a usable MVP.
- Updated realtime engine to tokio‑tungstenite for lower latency and better scalability.

### Fixed
- OAuth token refresh handling for GitHub provider.
- CORS configuration between the Rust API and the React development server.

### Removed
- No components removed in this release (it is the inaugural MVP).

---

### [v0.0.1] – 2026‑02‑20 (Prototype)
#### Added
- Project concept and problem statement.
- High‑level architecture diagram and technology rationale.
- Minimal “Hello World” boilerplate:
   - Rust Actix‑Web server exposing /api/ping.
   - React/Vite frontend fetching /api/ping.

#### Changed
- N/A 

#### Fixed
- N/A
  
#### Removed
- N/A 

### How to Read This File
- Versions are listed in reverse chronological order (most recent first).
- Each entry groups changes by type (`Added`, `Changed`, `Fixed`, `Removed`).
- **When starting a new release**, copy the “Unreleased” section to a new version block with the release date, then move completed items under the appropriate headings.
- Keep entries concise but descriptive enough for developers and stakeholders to understand the impact.

---



