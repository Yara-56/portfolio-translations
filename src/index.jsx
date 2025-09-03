// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // <— importe o Provider
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";

AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>       {/* <— envolva o App aqui */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
