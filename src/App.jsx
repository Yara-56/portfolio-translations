import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import EditProject from "./pages/EditProject";
import Header from "./components/Header";
import Footer from "./components/Footer";

// páginas futuras
import Translations from "./pages/Translations";
import Revisions from "./pages/Revisions";
import Services from "./pages/Services";

export default function App() {
  return (
    <>
      <Header />

      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/edit/:id?" element={<EditProject />} />

          <Route path="/translations" element={<Translations />} />
          <Route path="/revisions" element={<Revisions />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}
