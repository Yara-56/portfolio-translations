import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import EditProject from "./pages/EditProject";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/edit/:id?" element={<EditProject />} />
    </Routes>
  );
}
