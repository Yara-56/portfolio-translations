import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "../lib/supabase"; // <— usa as variáveis do .env.local
import fotoCauan from "../assets/fotoCauan.jpeg";

const TABS = ["introducao", "traducoes", "revisoes", "servicos", "projetos"];

export default function Home() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const initialTab = TABS.includes(params.get("tab") || "")
    ? params.get("tab")
    : "introducao";

  const [activeSection, setActiveSection] = useState(initialTab);
  const [featured, setFeatured] = useState([]);
  const [loadingFeat, setLoadingFeat] = useState(true);
  const [errorFeat, setErrorFeat] = useState("");
  const [translations, setTranslations] = useState([]);
  const [selectedTranslation, setSelectedTranslation] = useState(null);
  const [loadingTranslations, setLoadingTranslations] = useState(true);

  // AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Sincroniza aba com URL
  useEffect(() => {
    setActiveSection(initialTab);
  }, [initialTab]);

  const setTab = (tab) => {
    setActiveSection(tab);
    const next = new URLSearchParams(params);
    next.set("tab", tab);
    setParams(next, { replace: true });
  };

  // Busca traduções no Supabase
  useEffect(() => {
    let alive = true;
    const load = async () => {
      setLoadingTranslations(true);
      const { data, error } = await supabase
        .from("translations")
        .select("id, title, content")
        .order("created_at", { ascending: false });
      if (!alive) return;
      if (error) {
        console.error("Erro ao carregar as traduções:", error);
        setTranslations([]);
      } else {
        setTranslations(data || []);
      }
      setLoadingTranslations(false);
    };
    load();
    return () => {
      alive = false;
    };
  }, []);

  // Mensagens de cada aba + CTA
  const sectionContent = useMemo(() => {
    switch (activeSection) {
      case "traducoes":
        return {
          text: "Aqui estarão as traduções e versões realizadas por Cauan. Clique em um título para ver o texto completo.",
        };
      case "revisoes":
        return {
          text: "Aqui estarão as revisões e edições literárias, técnicas e acadêmicas.",
        };
      case "servicos":
        return {
          text: "Aqui estarão os serviços oferecidos, com prazos, valores e formas de contratação.",
        };
      case "projetos":
        return {
          text: "Aqui estarão os projetos, ensaios, vídeos e conteúdos autorais do Cauan.",
        };
      default:
        return {
          text: "",
        };
    }
  }, [activeSection]);

  // Componente de card simples (público)
  const Card = ({ item }) => (
    <Link
      to={`/projects/${item.slug}`}
      className="border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition block bg-white/5"
    >
      {item.cover_url && (
        <img src={item.cover_url} alt="" className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-300 mt-1">
          {item.type}
          {item.languages?.length ? ` · ${item.languages.join(", ")}` : ""}
          {item.categories?.length ? ` · ${item.categories.join(", ")}` : ""}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">
      {/* Fundo decorativo */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl animate-pulse absolute -top-40 -left-40" />
        <div className="w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-2xl animate-pulse absolute bottom-20 right-0" />
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
            Bem-vindo ao meu portfólio. Aqui você encontra meu trabalho como
            tradutor, versor, revisor e pesquisador em Línguas Modernas.
            Tradução não é apenas transpor palavras — é recriar sentidos, estilo
            e intenção.
          </p>

          {/* Navegação por abas */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { key: "traducoes", label: "Traduções e Versões" },
              { key: "revisoes", label: "Revisões e Edições" },
              { key: "servicos", label: "Serviços" },
              { key: "projetos", label: "Projetos" },
            ].map((b) => {
              const active = activeSection === b.key;
              return (
                <button
                  key={b.key}
                  onClick={() => setTab(b.key)}
                  className={`font-semibold px-5 py-2 rounded-full shadow-md transition
                    ${
                      active
                        ? "bg-yellow-400 text-black"
                        : "bg-yellow-500 hover:bg-yellow-400 text-black"
                    }`}
                  aria-pressed={active}
                >
                  {b.label}
                </button>
              );
            })}
          </div>

          {/* Seção de Traduções */}
          {activeSection === "traducoes" && (
            <div className="mt-6">
              <p className="text-gray-300">{sectionContent.text}</p>
              {loadingTranslations ? (
                <p>Carregando traduções...</p>
              ) : (
                <div className="mt-4">
                  {translations.length > 0 ? (
                    <ul className="space-y-2">
                      {translations.map((translation) => (
                        <li
                          key={translation.id}
                          className="cursor-pointer hover:text-yellow-400"
                          onClick={() => setSelectedTranslation(translation)}
                        >
                          {translation.title}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300">Nenhuma tradução disponível.</p>
                  )}
                </div>
              )}
              {selectedTranslation && (
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-yellow-400">
                    {selectedTranslation.title}
                  </h3>
                  <p className="text-gray-300 mt-2">{selectedTranslation.content}</p>
                </div>
              )}
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

      {/* Destaques (featured) */}
      <section className="relative z-10 px-4 w-full max-w-6xl mx-auto pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Destaques</h2>
          <Link to="/projects" className="text-yellow-400 hover:underline">
            Ver todos
          </Link>
        </div>

        {loadingFeat && (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-white/10 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loadingFeat && errorFeat && (
          <p className="text-red-300">{errorFeat}</p>
        )}

        {!loadingFeat && !errorFeat && featured.length === 0 && (
          <p className="text-gray-300">Sem destaques por enquanto.</p>
        )}

        {!loadingFeat && featured.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((item) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
