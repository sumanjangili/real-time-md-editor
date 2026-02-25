// src/App.tsx
import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Editor from "./components/Editor";

/**
 * Helper type for the WebSocket instance we keep in a ref.
 */
type WsRef = {
  socket: WebSocket | null;
};

/**
 * Main application component.
 */
function App() {
  // -------------------------------------------------------------------------
  //  UI state (kept from the original Vite+React demo)
  // -------------------------------------------------------------------------
  const [count, setCount] = useState(0);

  // -------------------------------------------------------------------------
  //  WebSocket handling
  // -------------------------------------------------------------------------
  // We store the socket in a ref so the same instance survives re‑renders.
  const wsRef = useRef<WsRef>({ socket: null });

  /**
   * Sends a text message through the WebSocket if it is open.
   * The Editor component can call this to broadcast markdown updates.
   */
  const sendMessage = (payload: string) => {
    const ws = wsRef.current.socket;
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(payload);
    } else {
      console.warn("WebSocket not ready – dropping message:", payload);
    }
  };

  // Establish the connection once when the component mounts.
  useEffect(() => {
    // -----------------------------------------------------------------------
    //  1️⃣ Build the WS URL
    // -----------------------------------------------------------------------
    // Vite injects env vars prefixed with VITE_ at build time.
    // Example: VITE_WS_URL=ws://localhost:8080/ws
    const wsUrl =
      (import.meta.env.VITE_WS_URL as string) ||
      "ws://localhost:8080/ws";

    // -----------------------------------------------------------------------
    //  2️⃣ Create the socket
    // -----------------------------------------------------------------------
    const socket = new WebSocket(wsUrl);
    wsRef.current.socket = socket;

    // -----------------------------------------------------------------------
    //  3️⃣ Wire up event listeners
    // -----------------------------------------------------------------------
    socket.addEventListener("open", () => {
      console.info("🔗 WebSocket connection opened →", wsUrl);
      // You can send an initial handshake/message here if you want:
      // socket.send(JSON.stringify({ type: "join", user: "anonymous" }));
    });

    socket.addEventListener("message", (event) => {
      // `event.data` is a string (or Blob) – we expect plain text for now.
      console.info("📨 Message from server:", event.data);
      // If you want to feed incoming updates into the editor, you could
      // expose a callback prop from <Editor /> and call it here.
    });

    socket.addEventListener("close", (event) => {
      console.info(
        `❌ WebSocket closed (code=${event.code}, reason="${event.reason}")`
      );
    });

    socket.addEventListener("error", (event) => {
      console.error("⚠️ WebSocket error:", event);
    });

    // -----------------------------------------------------------------------
    //  4️⃣ Cleanup on unmount
    // -----------------------------------------------------------------------
    return () => {
      console.info("🧹 Cleaning up WebSocket");
      socket.close();
      wsRef.current.socket = null;
    };
  }, []); // empty deps → run once

  // -------------------------------------------------------------------------
  //  Render UI
  // -------------------------------------------------------------------------
  return (
    <div className="App">
      {/* Existing Vite + React demo */}
      <h1>Real‑Time Collaborative Markdown Editor</h1>

      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>

        <p>
          A lightweight way to co‑author documents without the overhead of
          heavyweight office suites.
        </p>

        <p>
          <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </p>
      </div>

      {/* Custom editor component – we pass the `sendMessage` helper so it can
          broadcast changes to every connected peer. */}
      <Editor sendMessage={sendMessage} />
    </div>
  );
}

export default App;
