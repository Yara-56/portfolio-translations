import React, { useEffect, useState } from "react";
import { TranslationsApi } from "@/features/translations/api";
import InlineTranslationForm from "@/components/InlineTranslationForm";

export default function TranslationsSection({ isAdmin }) {
  const [items, setItems] = useState([]);
  const [sel, setSel] = useState(null);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      setLoading(true);
      setItems(await TranslationsApi.list());
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { reload(); }, []);

  return (
    <>
      {isAdmin && <InlineTranslationForm onCreated={reload} />}
      {loading ? (
        <p className="mt-3">Carregando traduções...</p>
      ) : items.length ? (
        <ul className="space-y-2 mt-4">
          {items.map((t) => {
            const opened = sel?.id === t.id;
            return (
              <li key={t.id} className="bg-white/5 border border-white/10 rounded-lg">
                <button
                  className="w-full text-left p-3 hover:bg-white/10 transition flex items-center justify-between"
                  onClick={() => setSel(opened ? null : t)}
                  title={opened ? "Ocultar conteúdo" : "Ver conteúdo"}
                >
                  <span className="font-semibold">{t.title}</span>
                  <span className="text-xs text-gray-400 ml-3">
                    {t.published_at
                      ? new Date(t.published_at).toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"numeric"})
                      : ""}
                  </span>
                </button>
                {opened && t.content && (
                  <div className="px-3 pb-3">
                    <p className="text-gray-300 whitespace-pre-wrap">{t.content}</p>
                    <div className="mt-2">
                      <button className="text-yellow-400 text-sm hover:underline" onClick={() => setSel(null)}>
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
        <p className="text-gray-300 mt-3">Nenhuma tradução disponível.</p>
      )}
    </>
  );
}
