import React, { useState } from "react";
import { supabase } from "../lib/supabase";

export default function InlineServiceForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [priceText, setPriceText] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(null);
    if (!title.trim()) return setErr("Informe um título.");
    setSaving(true);

    const payload = {
      title: title.trim(),
      price_text: priceText.trim(),
      description: description.trim(),
      published_at: new Date().toISOString(),
    };

    let resp;
    try {
      resp = await supabase.from("services").insert(payload);
    } catch (e) {
      // se algo explodir antes do retorno padrao do supabase
      setSaving(false);
      setErr("Falha na conexão com o banco.");
      return;
    }

    setSaving(false);

    // resp pode ser undefined/null em caso de erro não previsto — seja defensivo
    if (!resp || resp.error) {
      setErr(resp?.error?.message || "Não foi possível salvar.");
      return;
    }

    // sucesso
    setTitle("");
    setPriceText("");
    setDescription("");
    onCreated?.();
  }

  return (
    <div className="mt-6 border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="font-semibold">Novo serviço</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-4 grid md:grid-cols-2 gap-5">
        <div className="space-y-4">
          <Field
            label="Título*"
            value={title}
            onChange={setTitle}
            placeholder="Ex.: Revisão acadêmica completa"
            required
          />
          <Field
            label="Preço / Faixa (texto)"
            value={priceText}
            onChange={setPriceText}
            placeholder="Ex.: a partir de R$ 200"
          />
        </div>

        <div className="space-y-4">
          <Field
            as="textarea"
            rows={8}
            label="Descrição"
            value={description}
            onChange={setDescription}
            placeholder="Explique escopo, prazos, diferenciais…"
          />
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-3">
          {err && <span className="text-red-300 text-sm mr-auto">{err}</span>}
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2 rounded-lg bg-yellow-400 text-black font-semibold disabled:opacity-60"
          >
            {saving ? "Salvando…" : "Publicar"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ as = "input", label, value, onChange, ...rest }) {
  const Comp = as;
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <Comp
        className="w-full rounded-lg p-3 bg-black/30 border border-white/10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        {...rest}
      />
    </div>
  );
}
