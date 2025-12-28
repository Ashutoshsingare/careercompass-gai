import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error("Root element (#root) not found");
}

// Visible boot marker (helps diagnose blank-screen startup failures)
rootEl.innerHTML = "<div style=\"padding:16px;font-family:system-ui;color:rgba(255,255,255,0.85)\">Loading…</div>";

const showFatal = (title: string, detail?: string) => {
  const safeDetail = (detail || "").replace(/[<>]/g, "");
  rootEl.innerHTML = `
    <div style="padding:16px;font-family:system-ui;color:rgba(255,255,255,0.92)">
      <div style="font-weight:700;margin-bottom:8px;">${title}</div>
      <pre style="white-space:pre-wrap;opacity:0.85;">${safeDetail}</pre>
    </div>
  `;
};

window.addEventListener("error", (e) => {
  showFatal("App crashed", e.error?.message || e.message);
});

window.addEventListener("unhandledrejection", (e) => {
  const reason = (e.reason && (e.reason.message || String(e.reason))) || "Unknown rejection";
  showFatal("Unhandled promise rejection", reason);
});

try {
  createRoot(rootEl).render(<App />);
} catch (e) {
  showFatal("Failed to start app", e instanceof Error ? e.message : String(e));
}
