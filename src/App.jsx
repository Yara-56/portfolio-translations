import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import EditProject from "./pages/EditProject"; // se quiser manter
import Footer from "./components/Footer";
import Login from "./pages/Login";
// futuras
import Translations from "./pages/Translations";
import Revisions from "./pages/Revisions";
import Services from "./pages/Services";

// === Painel (Supabase) ===
import Admin from "./pages/Admin";
import AdminNew from "./pages/AdminNew";
import AdminEdit from "./pages/AdminEdit";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-white">
      <div className="flex-grow">
        <Routes>
          {/* públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/translations" element={<Translations />} />
          <Route path="/revisions" element={<Revisions />} />
          <Route path="/services" element={<Services />} />

          {/* mantém sua rota antiga (opcional) */}
          <Route path="/edit/:id?" element={<EditProject />} />

          {/* painel admin */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/new" element={<AdminNew />} />
          <Route path="/admin/edit/:id" element={<AdminEdit />} />

          {/* 404 → home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
