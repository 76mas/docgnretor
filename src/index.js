// app/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/global.css"; // لو عندك ستايل عام

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
