import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import fotoCauan from "../assets/fotoCauan.jpeg";

export default function Home() {
  const [activeSection, setActiveSection] = useState("introducao");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case "traducoes":
        return <p className="text-gray-300 mt-6">Aqui estarão as traduções e versões realizadas por Cauan.</p>;
      case "revisoes":
        return <p className="text-gray-300 mt-6">Aqui estarão as revisões e edições literárias, técnicas e acadêmicas.</p>;
      case "servicos":
        return <p className="text-gray-300 mt-6">Aqui estarão os serviços oferecidos, com prazos, valores e formas de contratação.</p>;
      case "projetos":
        return <p className="text-gray-300 mt-6">Aqui estarão os projetos, ensaios, vídeos e conteúdos autorais do Cauan.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl animate-pulse absolute -top-40 -left-40"></div>
        <div className="w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-2xl animate-pulse absolute bottom-20 right-0"></div>
      </div>

      {/* Conteúdo principal */}
      <main className="relative z-10 px-4 w-full max-w-6xl mx-auto flex-grow py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Texto de apresentação */}
        <div data-aos="fade-right">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Cauan Lacerda <br />
            <span className="text-yellow-400">Tradução e Revisão</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Bem-vindo ao meu portfólio. Aqui você encontra meu trabalho como tradutor, versor, revisor e pesquisador em Línguas Modernas.
            Tradução não é apenas transpor palavras — é recriar sentidos, estilo e intenção.
          </p>

          {/* Botões de navegação */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveSection("traducoes")}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full shadow-md transition"
            >
              Traduções e Versões
            </button>
            <button
              onClick={() => setActiveSection("revisoes")}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full shadow-md transition"
            >
              Revisões e Edições
            </button>
            <button
              onClick={() => setActiveSection("servicos")}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full shadow-md transition"
            >
              Serviços
            </button>
            <button
              onClick={() => setActiveSection("projetos")}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-5 py-2 rounded-full shadow-md transition"
            >
              Projetos
            </button>
          </div>

          {/* Seção dinâmica */}
          <div className="mt-6">{renderSection()}</div>
        </div>

        {/* Foto */}
        <div className="flex justify-center md:justify-end" data-aos="fade-left">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl">
            <img
              src={fotoCauan}
              alt="Cauan Lacerda"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
