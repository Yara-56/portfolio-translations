import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { supabase } from "../lib/supabase";
import fotoCauan from "../assets/fotoCauan.jpeg";
import { useAuth } from "../contexts/AuthContext";

import InlineTranslationForm from "../components/InlineTranslationForm";
import InlineRevisionForm from "../components/InlineRevisionForm";
import InlineServiceForm from "../components/InlineServiceForm";
import InlineProjectForm from "../components/InlineProjectForm";
import InlineVideoForm from "../components/InlineVideoForm";

const TABS = [
  "introducao",
  "traducoes",
  "revisoes",
  "servicos",
  "projetos",
  "videos",
];

export default function Home() {
  const auth = useAuth(); // Chama o hook useAuth
  console.log("Resultado de useAuth:", auth); // Adiciona o console.log para verificar o que está retornando

  const { isAdmin } = auth || { isAdmin: false }; 

  const [params, setParams] = useSearchParams();

  // ---- Tabs / URL sync ------------------------------------------------------
  const initialTab = TABS.includes(params.get("tab") || "")
    ? params.get("tab")
    : "introducao";
  const [activeSection, setActiveSection] = useState(initialTab);
  useEffect(() => {
    setActiveSection(initialTab);
  }, [initialTab]);

  const setTab = (tab) => {
    const next = new URLSearchParams(params);
    next.set("tab", tab);
    setParams(next, { replace: true });
    setActiveSection(tab);
  };

  // ---- AOS ------------------------------------------------------------------
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // ---- Destaques (projects) -------------------------------------------------
  const [featured, setFeatured] = useState([]);
  const [loadingFeat, setLoadingFeat] = useState(true);
  const [errorFeat, setErrorFeat] = useState("");

  useEffect(() => {
    (async () => {
      setLoadingFeat(true);
      setErrorFeat("");
      let resp;
      try {
        resp = await supabase
          .from("projects")
          .select(
            "id, slug, title, cover_url, type, languages, categories, updated_at"
          )
          .order("updated_at", { ascending: false })
          .limit(6);
      } catch {
        setErrorFeat("Não foi possível carregar os destaques.");
        setFeatured([]);
        setLoadingFeat(false);
        return;
      }
      if (!resp || resp.error) {
        setErrorFeat("Não foi possível carregar os destaques.");
        setFeatured([]);
      } else {
        setFeatured(resp.data || []);
      }
      setLoadingFeat(false);
    })();
  }, []);

  // ---- Traduções ------------------------------------------------------------
  const [translations, setTranslations] = useState([]);
  const [loadingTranslations, setLoadingTranslations] = useState(true);
  const [selectedTranslation, setSelectedTranslation] = useState(null);

  async function reloadTranslations() {
    setLoadingTranslations(true);
    let resp;
    try {
      resp = await supabase
        .from("translations")
        .select("id, title, content, published_at, created_at")
        .order("published_at", { ascending: false });
    } catch {
      setTranslations([]);
      setLoadingTranslations(false);
      return;
    }
    if (!resp || resp.error) setTranslations([]);
    else setTranslations(resp.data || []);
    setLoadingTranslations(false);
  }
  useEffect(() => {
    reloadTranslations();
  }, []);

  // ---- Revisões -------------------------------------------------------------
  const [revisions, setRevisions] = useState([]);
  const [loadingRevisions, setLoadingRevisions] = useState(true);

  async function reloadRevisions() {
    setLoadingRevisions(true);
    let resp;
    try {
      resp = await supabase
        .from("revisions")
        .select("id, title, content, published_at, created_at")
        .order("published_at", { ascending: false });
    } catch {
      setRevisions([]);
      setLoadingRevisions(false);
      return;
    }
    if (!resp || resp.error) setRevisions([]);
    else setRevisions(resp.data || []);
    setLoadingRevisions(false);
  }
  useEffect(() => {
    reloadRevisions();
  }, []);

  // ---- Serviços -------------------------------------------------------------
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  async function reloadServices() {
    setLoadingServices(true);
    let resp;
    try {
      resp = await supabase
        .from("services")
        .select("id, title, price_text, description, published_at")
        .order("published_at", { ascending: false });
    } catch {
      setServices([]);
      setLoadingServices(false);
      return;
    }
    if (!resp || resp.error) setServices([]);
    else setServices(resp.data || []);
    setLoadingServices(false);
  }
  useEffect(() => {
    reloadServices();
  }, []);

  // ---- Projetos -------------------------------------------------------------
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  async function reloadProjects() {
    setLoadingProjects(true);
    let resp;
    try {
      resp = await supabase
        .from("projects")
        .select(
          "id, slug, title, cover_url, type, languages, categories, updated_at"
        )
        .order("updated_at", { ascending: false })
        .limit(20);
    } catch {
      setProjects([]);
      setLoadingProjects(false);
      return;
    }
    if (!resp || resp.error) setProjects([]);
    else setProjects(resp.data || []);
    setLoadingProjects(false);
  }
  useEffect(() => {
    reloadProjects();
  }, []);

  // ---- Vídeos ---------------------------------------------------------------
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(true);

  async function reloadVideos() {
    setLoadingVideos(true);
    let resp;
    try {
      resp = await supabase
        .from("videos")
        .select("id, title, youtube_url, slug, published_at")
        .order("published_at", { ascending: false })
        .limit(20);
    } catch {
      setVideos([]);
      setLoadingVideos(false);
      return;
    }
    if (!resp || resp.error) setVideos([]);
    else setVideos(resp.data || []);
    setLoadingVideos(false);
  }
  useEffect(() => {
    reloadVideos();
  }, []);

  // ---- Copy de cada aba -----------------------------------------------------
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
        return { text: "Serviços oferecidos, pacotes, prazos e diferenciais." };
      case "projetos":
        return {
          text: "Projetos e conteúdos autorais — ensaios, artigos, vídeos, colaborações.",
        };
      case "videos":
        return {
          text: "Vídeos e aparições — com YouTube embed para assistir aqui mesmo.",
        };
      default:
        return { text: "" };
    }
  }, [activeSection]);

  // ---- Card de Projeto ------------------------------------------------------
  const ProjectCard = ({ item }) => (
    <Link
      to={`/projects/${item.slug}`}
      className="border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition block bg-white/5"
    >
      {item.cover_url && (
        <img
          src={item.cover_url}
          alt={`Capa do projeto ${item.title}`}
          className="w-full h-40 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-300 mt-1">
          {item.type}
          {Array.isArray(item.languages) && item.languages.length
            ? ` · ${item.languages.join(", ")}`
            : ""}
          {Array.isArray(item.categories) && item.categories.length
            ? ` · ${item.categories.join(", ")}`
            : ""}
        </p>
      </div>
    </Link>
  );

  // ---- Util: extrair ID do YouTube -----------------------------------------
  function extractYouTubeId(url) {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
      if (u.searchParams.get("v")) return u.searchParams.get("v");
      const m = u.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      return m ? m[1] : null;
    } catch {
      return null;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden relative">
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
            Bem-vindo ao meu portfólio. Tradução não é apenas transpor palavras
            — é recriar sentidos, estilo e intenção.
          </p>

          {/* Navegação por abas */}
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              { key: "traducoes", label: "Traduções e Versões" },
              { key: "revisoes", label: "Revisões e Edições" },
              { key: "servicos", label: "Serviços" },
              { key: "projetos", label: "Projetos" },
              { key: "videos", label: "Vídeos" },
            ].map((b) => {
              const active = activeSection === b.key;
              return (
                <button
                  key={b.key}
                  onClick={() => setTab(b.key)}
                  className={`font-semibold px-5 py-2 rounded-full shadow-md transition ${
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

          {/* Seções */}
          {activeSection !== "introducao" && (
            <div className="mt-6">
              <p className="text-gray-300">{sectionContent.text}</p>

              {/* TRADUÇÕES */}
              {activeSection === "traducoes" && (
                <>
                  {isAdmin && (
                    <InlineTranslationForm onCreated={reloadTranslations} />
                  )}

                  {loadingTranslations ? (
                    <p className="mt-3">Carregando traduções...</p>
                  ) : translations.length > 0 ? (
                    <ul className="space-y-2 mt-4">
                      {translations.map((t) => {
                        const opened = selectedTranslation?.id === t.id;
                        return (
                          <li
                            key={t.id}
                            className="bg-white/5 border border-white/10 rounded-lg"
                          >
                            <button
                              className="w-full text-left p-3 hover:bg-white/10 transition flex items-center justify-between"
                              onClick={() =>
                                setSelectedTranslation(opened ? null : t)
                              }
                              title={
                                opened ? "Ocultar conteúdo" : "Ver conteúdo"
                              }
                            >
                              <span className="font-semibold">{t.title}</span>
                              <span className="text-xs text-gray-400 ml-3">
                                {t.published_at
                                  ? new Date(t.published_at).toLocaleDateString(
                                      "pt-BR",
                                      {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      }
                                    )
                                  : ""}
                              </span>
                            </button>

                            {opened && t.content && (
                              <div className="px-3 pb-3">
                                <p className="text-gray-300 whitespace-pre-wrap">
                                  {t.content}
                                </p>
                                <div className="mt-2">
                                  <button
                                    className="text-yellow-400 text-sm hover:underline"
                                    onClick={() => setSelectedTranslation(null)}
                                  >
                                    Ver menos
                                  </button>
                                </div>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-gray-300 mt-3">
                      Nenhuma tradução disponível.
                    </p>
                  )}
                </>
              )}

              {/* REVISÕES */}
              {activeSection === "revisoes" && (
                <>
                  {isAdmin && (
                    <InlineRevisionForm onCreated={reloadRevisions} />
                  )}

                  {loadingRevisions ? (
                    <p className="mt-3">Carregando revisões...</p>
                  ) : revisions.length > 0 ? (
                    <ul className="space-y-3 mt-4">
                      {revisions.map((r) => (
                        <li
                          key={r.id}
                          className="p-4 rounded-lg bg-white/5 border border-white/10"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-semibold">{r.title}</p>
                            <span className="text-xs text-gray-400">
                              {r.published_at
                                ? new Date(r.published_at).toLocaleDateString(
                                    "pt-BR",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : ""}
                            </span>
                          </div>
                          {r.content && (
                            <p className="text-gray-300 text-sm mt-2 whitespace-pre-wrap">
                              {r.content}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300 mt-3">
                      Nenhuma revisão disponível.
                    </p>
                  )}
                </>
              )}

              {/* SERVIÇOS */}
              {activeSection === "servicos" && (
                <>
                  {isAdmin && <InlineServiceForm onCreated={reloadServices} />}

                  {loadingServices ? (
                    <p className="mt-3">Carregando serviços...</p>
                  ) : services.length > 0 ? (
                    <ul className="grid md:grid-cols-2 gap-4 mt-4">
                      {services.map((s) => (
                        <li
                          key={s.id}
                          className="p-4 rounded-xl bg-white/5 border border-white/10"
                        >
                          <p className="font-semibold">{s.title}</p>
                          {s.price_text && (
                            <p className="text-yellow-300 text-sm mt-1">
                              {s.price_text}
                            </p>
                          )}
                          {s.description && (
                            <p className="text-gray-300 text-sm mt-2 whitespace-pre-wrap">
                              {s.description}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-300 mt-3">
                      Nenhum serviço disponível.
                    </p>
                  )}
                </>
              )}

              {/* PROJETOS */}
              {activeSection === "projetos" && (
                <>
                  {isAdmin && <InlineProjectForm onCreated={reloadProjects} />}

                  {loadingProjects ? (
                    <p className="mt-3">Carregando projetos...</p>
                  ) : projects.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
                      {projects.map((p) => (
                        <ProjectCard key={p.id} item={p} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-300 mt-3">
                      Nenhum projeto disponível.
                    </p>
                  )}
                </>
              )}

              {/* VÍDEOS */}
              {activeSection === "videos" && (
                <>
                  {isAdmin && <InlineVideoForm onCreated={reloadVideos} />}

                  {loadingVideos ? (
                    <p className="mt-3">Carregando vídeos...</p>
                  ) : videos.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-6 mt-4">
                      {videos.map((v) => {
                        const vid = extractYouTubeId(v.youtube_url);
                        return (
                          <div
                            key={v.id}
                            className="rounded-xl overflow-hidden border border-white/10 bg-white/5"
                          >
                            <Link to={`/videos/${v.slug || v.id}`}>
                              <div className="aspect-video w-full bg-black/30">
                                {vid ? (
                                  <iframe
                                    className="w-full h-full"
                                    src={`https://www.youtube.com/embed/${vid}`}
                                    title={v.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                  />
                                ) : (
                                  <div className="w-full h-full grid place-items-center text-gray-400 text-sm">
                                    URL inválida
                                  </div>
                                )}
                              </div>
                            </Link>
                            <div className="p-3">
                              <Link
                                to={`/videos/${v.slug || v.id}`}
                                className="font-semibold hover:text-yellow-300"
                              >
                                {v.title}
                              </Link>
                              {v.published_at && (
                                <p className="text-xs text-gray-400 mt-1">
                                  {new Date(v.published_at).toLocaleDateString(
                                    "pt-BR",
                                    {
                                      day: "2-digit",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-300 mt-3">
                      Nenhum vídeo disponível.
                    </p>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Foto */}
        <div
          className="flex justify-center md:justify-end"
          data-aos="fade-left"
        >
          <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl">
            <img
              src={fotoCauan}
              alt="Cauan Lacerda"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </main>

      {/* Destaques (de projetos) */}
      <section className="relative z-10 px-4 w-full max-w-6xl mx-auto pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Destaques</h2>
          <Link to="/projects" className="text-yellow-400 hover:underline">
            Ver todos
          </Link>
        </div>

        {loadingFeat ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-48 rounded-xl bg-white/10 animate-pulse"
              />
            ))}
          </div>
        ) : errorFeat ? (
          <p className="text-red-300">{errorFeat}</p>
        ) : featured.length === 0 ? (
          <p className="text-gray-300">Sem destaques por enquanto.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
