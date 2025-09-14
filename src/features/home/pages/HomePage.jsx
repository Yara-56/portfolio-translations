import React, { useEffect, useMemo } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { TabBar } from "@/shared/components/ui/TabBar";
import fotoCauan from "@/assets/fotoCauan.jpeg";
import { useAuth } from "@/contexts/AuthContext";
import { useTabs } from "@/features/home/hooks/useTabs";

import TranslationsSection from "@/features/home/components/TranslationsSection";
import RevisionsSection   from "@/features/home/components/RevisionsSection";
import ServicesSection    from "@/features/home/components/ServicesSection";
import ProjectsSection    from "@/features/home/components/ProjectsSection";
import VideosSection      from "@/features/home/components/VideosSection";
import FeaturedSection    from "@/features/home/components/FeaturedSection";

const TABS = ["introducao","traducoes","revisoes","servicos","projetos","videos"];

export default function HomePage() {
  const { isAdmin = false } = useAuth() || {};
  const { active, setTab } = useTabs(TABS, "introducao");

  useEffect(() => { AOS.init({ duration: 800, once: true }); }, []);

  const copy = useMemo(() => {
    switch (active) {
      case "traducoes": return { text: "Aqui estarão as traduções e versões realizadas por Cauan. Clique em um título para ver o texto completo." };
      case "revisoes":  return { text: "Aqui estarão as revisões e edições literárias, técnicas e acadêmicas." };
      case "servicos":  return { text: "Serviços oferecidos, pacotes, prazos e diferenciais." };
      case "projetos":  return { text: "Projetos e conteúdos autorais — ensaios, artigos, vídeos, colaborações." };
      case "videos":    return { text: "Vídeos e aparições — com YouTube embed para assistir aqui mesmo." };
      default:          return { text: "" };
    }
  }, [active]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden relative">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl animate-pulse absolute -top-40 -left-40" />
        <div className="w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-2xl animate-pulse absolute bottom-20 right-0" />
      </div>

      {/* Conteúdo principal */}
      <main className="relative z-10 px-4 w-full max-w-6xl mx-auto flex-grow py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Texto de apresentação + Tabs */}
        <div data-aos="fade-right">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Cauan Lacerda <br /><span className="text-yellow-400">Tradução e Revisão</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Bem-vindo ao meu portfólio. Tradução não é apenas transpor palavras — é recriar sentidos, estilo e intenção.
          </p>

          <TabBar
            tabs={[
              { key: "traducoes", label: "Traduções e Versões" },
              { key: "revisoes",  label: "Revisões e Edições" },
              { key: "servicos",  label: "Serviços" },
              { key: "projetos",  label: "Projetos" },
              { key: "videos",    label: "Vídeos" },
            ]}
            active={active}
            onChange={setTab}
          />

          {active !== "introducao" && (
            <div className="mt-6">
              <p className="text-gray-300">{copy.text}</p>
              {active === "traducoes" && <TranslationsSection isAdmin={isAdmin} />}
              {active === "revisoes"   && <RevisionsSection   isAdmin={isAdmin} />}
              {active === "servicos"   && <ServicesSection    isAdmin={isAdmin} />}
              {active === "projetos"   && <ProjectsSection    isAdmin={isAdmin} />}
              {active === "videos"     && <VideosSection      isAdmin={isAdmin} />}
            </div>
          )}
        </div>

        {/* Foto */}
        <div className="flex justify-center md:justify-end" data-aos="fade-left">
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl">
            <img src={fotoCauan} alt="Cauan Lacerda" className="w-full h-full object-cover" />
          </div>
        </div>
      </main>

      {/* Destaques */}
      <FeaturedSection />
    </div>
  );
}
