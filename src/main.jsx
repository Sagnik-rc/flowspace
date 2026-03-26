/* ─────────────────────────────────────────────────────────────────────────
   main.jsx  —  Entry point. Wraps App in AppProvider so every component
                can call useApp() to access all state.
───────────────────────────────────────────────────────────────────────── */
import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./context/AppContext";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
