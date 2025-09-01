// src/components/Footer.jsx
import React, { useState } from "react";
import {
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import LoginModal from "./LoginModal";
import { useAuth } from "../contexts/AuthContext";

export default function Footer() {
  const { isAdmin, signOut } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#0f172a] text-gray-400 py-10 mt-0 border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">Cauan Lacerda</h3>
            <p className="text-sm mt-1">
              Tradutor, Versor, Revisor e Pesquisador • Porto Alegre - RS
            </p>
            <p className="text-sm">
              © {new Date().getFullYear()} Todos os direitos reservados.
            </p>
          </div>

          <div className="flex gap-6 text-2xl">
            <a href="https://www.linkedin.com/in/cauanlacerda" className="hover:text-yellow-400" title="LinkedIn" target="_blank" rel="noreferrer"><FaLinkedin /></a>
            <a href="https://www.instagram.com/cauan.tradutor" className="hover:text-yellow-400" title="Instagram" target="_blank" rel="noreferrer"><FaInstagram /></a>
            <a href="mailto:cauanlacerdaoliveira@gmail.com" className="hover:text-yellow-400" title="E-mail"><FaEnvelope /></a>
            <a href="https://wa.me/5531998579826" className="hover:text-yellow-400" title="WhatsApp" target="_blank" rel="noreferrer"><FaWhatsapp /></a>
          </div>
        </div>

        {/* Aqui fica o controle. Visitante vê "Configurações". Admin vê "Modo Edição" + "Sair". */}
        <div className="flex justify-center mt-6">
          {!isAdmin ? (
            <button
              onClick={() => setLoginOpen(true)}
              className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-all"
            >
              Configurações
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="px-6 py-3 rounded-full bg-yellow-400 text-black font-semibold">
                Modo Edição
              </span>
              <button
                onClick={signOut}
                className="px-6 py-3 bg-white/10 rounded-full font-semibold hover:bg-white/20 transition-all"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </footer>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
