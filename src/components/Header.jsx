import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Início", path: "/" },
    { label: "Traduções e Versões", path: "/translations" },
    { label: "Revisões e Edições", path: "/revisions" },
    { label: "Serviços", path: "/services" },
    { label: "Projetos", path: "/projects" },
  ];

  return (
    <header className="bg-gray-900 text-white fixed top-0 w-full shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">Cauan Lacerda</h1>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-8 font-medium">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="hover:text-yellow-400 transition duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menu"
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                fillRule="evenodd"
                d="M6 18L18 6M6 6l12 12"
                clipRule="evenodd"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 6h16M4 12h16M4 18h16"
                clipRule="evenodd"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-800 text-white px-6 pb-4 pt-2 flex flex-col gap-4 font-medium">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-400 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
