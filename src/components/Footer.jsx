import React from "react";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 text-gray-400 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">Cauan Lacerda</h3>
          <p className="text-sm mt-1">
            Tradutor, Versor, Revisor e Pesquisador • Porto Alegre - RS
          </p>
          <p className="text-sm">© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>

        <div className="flex gap-6 text-2xl">
          <a href="#" className="hover:text-yellow-400" title="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="#" className="hover:text-yellow-400" title="Instagram">
            <FaInstagram />
          </a>
          <a href="mailto:cauanlacerdaoliveira@gmail.com" className="hover:text-yellow-400" title="E-mail">
            <FaEnvelope />
          </a>
          <a href="https://wa.me/5531998579826" className="hover:text-yellow-400" title="WhatsApp" target="_blank">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-500">
        Desenvolvido por Yara e Cauan com React + TailwindCSS
      </div>
    </footer>
  );
}
