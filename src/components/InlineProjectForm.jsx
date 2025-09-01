import React, { useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

export default function InlineProjectForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [type, setType] = useState("");
  const [languages, setLanguages] = useState("");
  const [categories, setCategories] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const slug = useMemo(() => slugify(title), [title]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    if (!title.trim()) return setErr("Informe um título.");
    setSaving(true);

    const payload = {
      title: title.trim(),
      slug,
      cover_url: coverUrl.trim() || null,
      type: type.trim() || null,
      languages: splitCSV(languages),
      categories: splitCSV(categories),
      content: content.trim() || null,
      updated_at: new Date().toISOString(),
    };

    let resp;
    try {
      resp = await supabase.from("projects").insert(payload);
    } catch {
      setSaving(false);
      setErr("Falha na conexão com o banco.");
      return;
    }

    setSaving(false);

    if (!resp || resp.error) {
      setErr(resp?.error?.message || "Não foi possível salvar.");
      return;
    }

    setTitle(""); setCoverUrl(""); setType(""); setLanguages(""); setCategories(""); setContent("");
    onCreated?.();
  }

  return (
    <div className="mt-6 border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/10"><h3 className="font-semibold">Novo projeto</h3></div>
      <form onSubmit={handleSubmit} className="p-4 grid md:grid-cols-2 gap-5">
        <div className="space-y-4">
          <Field label="Título*" value={title} onChange={setTitle} required />
          <Field label="Capa (URL opcional)" value={coverUrl} onChange={setCoverUrl} placeholder="https://…" />
          <Field label="Tipo (ex.: Ensaio, Projeto)" value={type} onChange={setType} />
        </div>
        <div className="space-y-4">
          <Field label="Idiomas (vírgula)" value={languages} onChange={setLanguages} placeholder="PT, EN, ES" />
          <Field label="Categorias (vírgula)" value={categories} onChange={setCategories} placeholder="Literatura, Técnica" />
          <Field as="textarea" rows={6} label="Descrição (opcional)" value={content} onChange={setContent} />
        </div>
        <div className="md:col-span-2 flex items-center justify-end gap-3">
          {err && <span className="text-red-300 text-sm mr-auto">{err}</span>}
          <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-yellow-400 text-black font-semibold disabled:opacity-60">
            {saving ? "Salvando…" : "Adicionar projeto"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ as="input", label, value, onChange, ...rest }) {
  const Comp = as;
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <Comp className="w-full rounded-lg p-3 bg-black/30 border border-white/10" value={value} onChange={(e)=>onChange(e.target.value)} {...rest}/>
    </div>
  );
}
function slugify(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)+/g,"");}
function splitCSV(s){return (s||"").split(",").map(x=>x.trim()).filter(Boolean);}
