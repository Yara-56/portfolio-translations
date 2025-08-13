import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";

export default function Admin() {
  const [session, setSession] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Verifica a sessão do usuário logado
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (!data.session) {
        // Se não estiver autenticado, redireciona para a página de login
        navigate("/login");
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      if (!sess) {
        // Redireciona para login caso a sessão seja perdida
        navigate("/login");
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!session) return;
    // Carregar projetos do banco de dados
    supabase
      .from("projects")
      .select("*")
      .order("updated_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error) setProjects(data || []);
      });
  }, [session]);

  if (!session) {
    return <div>Carregando...</div>; // Mostrar um estado de carregamento enquanto verifica a sessão
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel de Projetos</h1>
        <button
          className="px-4 py-2 border rounded"
          onClick={() => supabase.auth.signOut()}
        >
          Sair
        </button>
      </div>

      <Link to="/admin/new" className="inline-block mt-6 underline">
        Novo Projeto
      </Link>

      <ul className="mt-6 divide-y">
        {projects.map((p) => (
          <li key={p.id} className="py-4 flex justify-between">
            <div>
              <h2 className="font-medium">{p.title}</h2>
              <p className="text-sm text-gray-600">
                {p.slug} · {p.visibility}
              </p>
            </div>
            <Link to={`/admin/edit/${p.id}`} className="underline">
              Editar
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
