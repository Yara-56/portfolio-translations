import React, { useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

export default function InlineTranslationForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(toDateInput(new Date()));
  const [time, setTime] = useState(toTimeInput(new Date()));
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  const publishedAt = useMemo(() => {
    try { return new Date(`${date}T${time || "00:00"}:00`).toISOString(); }
    catch { return new Date().toISOString(); }
  }, [date, time]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    if (!title.trim()) return setErr("Informe um título.");
    setSaving(true);

    const payload = {
      title: title.trim(),
      content: content.trim(),
      published_at: publishedAt,
    };

    let resp;
    try {
      resp = await supabase.from("translations").insert(payload);
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

    setTitle(""); setContent("");
    onCreated?.();
  }

  return (
    <CardWrapper title="Nova tradução">
      <form onSubmit={handleSubmit} className="p-4 grid md:grid-cols-2 gap-5">
        <div className="space-y-4">
          <Field label="Título*" value={title} onChange={setTitle} placeholder="Ex.: Tradução comentada de Borges" required />
          <div className="grid grid-cols-2 gap-3">
            <Field type="date" label="Data" value={date} onChange={setDate} />
            <Field type="time" label="Hora (opcional)" value={time} onChange={setTime} />
          </div>
        </div>
        <div className="space-y-4">
          <Field as="textarea" rows={10} label="Texto" value={content} onChange={setContent} placeholder="Cole o texto traduzido..." />
        </div>
        <Actions err={err} saving={saving} cta="Publicar" />
      </form>
    </CardWrapper>
  );
}

function Field({ as = "input", label, value, onChange, ...rest }) {
  const Comp = as;
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <Comp className="w-full rounded-lg p-3 bg-black/30 border border-white/10" value={value} onChange={(e)=>onChange(e.target.value)} {...rest}/>
    </div>
  );
}
function Actions({ err, saving, cta="Publicar" }) {
  return (
    <div className="md:col-span-2 flex items-center justify-end gap-3">
      {err && <span className="text-red-300 text-sm mr-auto">{err}</span>}
      <button type="submit" disabled={saving} className="px-5 py-2 rounded-lg bg-yellow-400 text-black font-semibold disabled:opacity-60">
        {saving ? "Salvando…" : cta}
      </button>
    </div>
  );
}
function CardWrapper({ title, children }) {
  return (
    <div className="mt-6 border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/10"><h3 className="font-semibold">{title}</h3></div>
      {children}
    </div>
  );
}
function toDateInput(d){const x=new Date(d);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,"0")}-${String(x.getDate()).padStart(2,"0")}`;}
function toTimeInput(d){const x=new Date(d);return `${String(x.getHours()).padStart(2,"0")}:${String(x.getMinutes()).padStart(2,"0")}`;}
