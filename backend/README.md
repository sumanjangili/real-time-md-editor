
## Real‑Time Markdown Editor – Backend
**A lightweight way to co‑author documents without the overhead of heavyweight office suites.**
> A small, high‑performance Rust service built with **Actix‑Web** that powers the collaborative editing experience.  
It handles WebSocket synchronization, OAuth2 authentication, JWT session handling, and persistence of documents in PostgreSQL (or SQLite for single‑node setups).

---

### Table of Contents
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Prerequisites](#prerequisites)  
4. [Getting Started (local)](#getting-started-local)  
5. [Running with Docker](#running-with-docker)    
6. [License](#license)  

---

### Features
- **WebSocket‑driven real‑time sync** – Low‑latency broadcast of Markdown changes.  
- **OAuth2 login** – GitHub & Google providers (via `oauth2` crate).  
- **Role‑Based Access Control** – Owner / editor / viewer permissions enforced in middleware.  
- **Document versioning** – Snapshots stored in PostgreSQL (or SQLite).  
- **Health endpoint** – `/api/ping` used by Docker healthcheck.  

---

### Tech Stack
| Component | Crate / Tool | Reason |
|-----------|--------------|--------|
| Web framework | **actix‑web 4.5** | Mature, async, excellent WebSocket support. |
| CORS | **actix‑cors** | Secure cross‑origin requests. |
| WebSockets | **actix‑ws 0.3.1** | Integrated with Actix runtime. |
| Async runtime | **tokio 1.38 (full)** | High‑performance async I/O. |
| JSON handling | **serde / serde_json** | Zero‑cost serialization. |
| Database | **sqlx 0.8.6** (Postgres or SQLite) | Compile‑time checked queries, async. |
| Auth | **oauth2 4.4**, **jsonwebtoken 9.2** | Standard OAuth2 flow + JWT tokens. |
| Environment | **dotenvy** | `.env` support for local dev. |
| Logging | **env_logger 0.11**, **log 0.4** | Structured logging. |
| TLS (for OAuth) | **openssl 0.10** | Required by `oauth2` for HTTPS. |

---

### Prerequisites
- **Rust toolchain** (stable) – `rustup` installed.  
- **Cargo** (bundled with Rust).  
- **PostgreSQL** (or SQLite) instance reachable from the container.  
- **Docker** (optional, for containerised builds).  

---

### Getting Started (local)
```bash
1. Clone the repo (if you haven’t already)
git clone https://github.com/sumanjangili/real-time-md-editor.git
cd real-time-md-editor/backend

2. Install Rust (if missing)
curl https://sh.rustup.rs -sSf | sh
source $HOME/.cargo/env

3. Set up environment variables
cp .env.example .env   # edit the file with your DB credentials & OAuth secrets
Example entries:
# DATABASE_URL=postgres://user:password@localhost/md_editor
# GITHUB_CLIENT_ID=…
# GITHUB_CLIENT_SECRET=…

4. Run migrations (if you use sqlx migrations)
cargo install sqlx-cli --no-default-features --features postgres
sqlx migrate run

5. Start the server in dev mode
cargo run
# Server listens on 0.0.0.0:8080 (configurable via .env)
# Health check: curl http://localhost:8080/api/ping
```
#### Testing the WebSocket
You can use wscat or a browser console:
```bash
npm install -g wscat
wscat -c ws://localhost:8080/api/ws
```
Send a JSON payload like { "doc_id": "demo", "content": "# Hello" } and watch the broadcast.

---

### Running with Docker
The repo includes a multi‑stage Dockerfile that compiles a statically linked binary and runs it in a tiny Alpine image.
```bash
# From the repository root (where the Dockerfile lives)
docker build -t real-time-md-editor-backend --target runtime .

# Run the container (adjust env vars as needed)
docker run -p 8080:8080 \
  -e DATABASE_URL=postgres://user:pass@db-host/md_editor \
  -e GITHUB_CLIENT_ID=… -e GITHUB_CLIENT_SECRET=… \
  real-time-md-editor-backend
```
#### Docker‑Compose (optional) – you can spin up both frontend and backend together:
```js
services:
  backend:
    build:
      context: .
      dockerfile: backend/Dockerfile
    ports: ["8080:8080"]
    environment:
      DATABASE_URL: postgres://user:pass@db/md_editor
      # …other env vars…

  frontend:
    build:
      context: .
      dockerfile: frontend/Dockerfile
    ports: ["80:80"]
    depends_on: [backend]
```

---

### License
The backend is also released under the **MIT License** (see the repository‑wide LICENSE file).

#### Contributing
- Feel free to open pull requests, report bugs, or suggest enhancements via the GitHub Issues page.
- For larger feature work, consider creating a feature branch and linking the PR to the corresponding issue.

---

