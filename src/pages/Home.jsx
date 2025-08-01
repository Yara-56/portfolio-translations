import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope, FaArrowRight } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white relative overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl animate-pulse absolute -top-40 -left-40"></div>
        <div className="w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-2xl animate-pulse absolute bottom-20 right-0"></div>
      </div>

      <main className="relative z-10 px-4 max-w-6xl mx-auto pt-36 pb-24 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Texto */}
        <div data-aos="fade-right">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Cauan Lacerda <br />
            <span className="text-yellow-400">Tradução e Revisão</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Bem-vindo ao meu portfólio. Aqui você encontra meu trabalho como tradutor, versor, revisor e pesquisador em Línguas Modernas.
            Tradução não é apenas transpor palavras — é recriar sentidos, estilo e intenção.
          </p>
          <Link to="/projects">
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
              Ver Trabalhos <FaArrowRight />
            </button>
          </Link>

          <div className="flex gap-5 mt-10 text-2xl text-gray-400">
            <a href="#" className="hover:text-yellow-400" title="LinkedIn"><FaLinkedin /></a>
            <a href="#" className="hover:text-yellow-400" title="Instagram"><FaInstagram /></a>
            <a href="mailto:cauanlacerdaoliveira@gmail.com" className="hover:text-yellow-400" title="Email"><FaEnvelope /></a>
            <a href="https://wa.me/5531998579826" className="hover:text-yellow-400" title="WhatsApp" target="_blank"><FaWhatsapp /></a>
          </div>
        </div>

        {/* Avatar */}
        <div className="flex justify-center md:justify-end" data-aos="fade-left">
          <img
            src="https://avatars.githubusercontent.com/u/583231?v=4"
            alt="Cauan Lacerda"
            className="w-64 h-64 rounded-full border-4 border-yellow-400 shadow-xl object-cover"
          />
        </div>
      </main>
    </div>
  );
}
