import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ThemeContextProvider from "./context/ThemeContextProvider"; // ✅ Correct Import Path

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider> {/* ✅ Ensure it's wrapping App */}
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);
