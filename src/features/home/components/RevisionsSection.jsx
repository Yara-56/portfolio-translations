import React, { useEffect, useState } from "react";
import { RevisionsApi } from "@/features/revisions/api";
import InlineRevisionForm from "@/components/InlineRevisionForm";

export default function RevisionsSection({ isAdmin }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      setLoading(true);
      setItems(await RevisionsApi.list());
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { reload(); }, []);

  return (
    <>
      {isAdmin && <InlineRevisionForm onCreated={reload} />}
      {loading ? (
        <p className="mt-3">Carregando revisões...</p>
      ) : items.length ? (
        <ul className="space-y-3 mt-4">
          {items.map((r) => (
            <li key={r.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-start justify-between gap-3">
                <p className="font-semibold">{r.title}</p>
                <span className="text-xs text-gray-400">
                  {r.published_at ? new Date(r.published_at).toLocaleDateString("pt-BR",{day:"2-digit",month:"short",year:"numeric"}) : ""}
                </span>
              </div>
              {r.content && <p className="text-gray-300 text-sm mt-2 whitespace-pre-wrap">{r.content}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300 mt-3">Nenhuma revisão disponível.</p>
      )}
    </>
  );
}
