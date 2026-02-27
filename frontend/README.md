## Real‑Time Markdown Editor – Frontend
**A lightweight way to co‑author documents without the overhead of heavyweight office suites.**
> A lightweight React + Vite application that provides a live‑editing experience for Markdown documents.  
The UI connects to the Rust backend via a WebSocket endpoint to synchronize edits in real time.

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
- **Live collaborative editing** – WebSocket‑driven sync across multiple users.  
- **Markdown preview** – Side‑by‑side rendered view (GitHub‑flavoured).  
- **OAuth2 login** – GitHub / Google (handled by the backend).  
- **Responsive UI** – Tailwind CSS + utility‑first styling.  
- **Production‑ready build** – Optimised static bundle served by Nginx.

---

### Tech Stack
| Layer | Technology | Why |
|-------|------------|-----|
| Framework | **React** (Vite + TypeScript) | Fast dev server, modern ES modules. |
| Editor | **@uiw/react-codemirror** + **@codemirror/lang-markdown** | Powerful, extensible code editor with Markdown mode. |
| Styling | **Tailwind CSS** | Utility‑first, minimal CSS footprint. |
| Build | **Vite** | Lightning‑fast bundler for ES‑M. |
| Lint/Format | **ESLint**, **Prettier** (via ESLint config) | Consistent code style. |
| Package Manager | **npm** | Standard for Node ecosystems. |

---

### Prerequisites
- **Node.js ≥ 20** (the Dockerfile uses `node:20-bullseye-slim`).  
- **npm** (comes with Node).  
- Optional: **Docker** & **docker‑compose** if you prefer containerised development.

---

### Getting Started (local)

```bash
1. Clone the repo
git clone https://github.com/sumanjangili/real-time-md-editor.git
cd real-time-md-editor/frontend

2. Install exact dependencies (uses the lockfile)
npm ci   # fast, reproducible install

3. Run the dev server
npm run dev
# → Vite starts at http://localhost:5173 (or the port shown in the console)

Verify the connection
- The UI expects the backend to be reachable at /api/ws (proxy can be set in vite.config.ts).
- Start the backend (see backend/README) before trying collaborative features.

4. Building for Production
npm run build
# Output ends up in ./dist/ – ready to be copied into the Nginx runtime image.
```

---

### Running with Docker
The repository ships a multi‑stage Dockerfile that builds the frontend and bundles the static assets for the Nginx runtime.
```bash
1. From the repository root (where the Dockerfile lives)
docker build -t real-time-md-editor-frontend --target runtime .
# Or use docker-compose if you have a compose file that also brings up the backend.

2. Run the image (exposes port 80)
docker run -p 80:80 real-time-md-editor-frontend
```
The container serves the compiled files at http://localhost.

---

### License
This frontend is released under the **MIT License** (see the top‑level LICENSE file).

---

### Contributing
- Feel free to open pull requests, report bugs, or suggest enhancements via the GitHub Issues page.
- For larger feature work, consider creating a feature branch and linking the PR to the corresponding issue.

---

