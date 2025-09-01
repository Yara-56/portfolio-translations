// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectView from "./pages/ProjectView";
import Videos from "./pages/Videos";
import VideoView from "./pages/VideoView";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f172a] text-white">
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectView />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/videos/:slug" element={<VideoView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
