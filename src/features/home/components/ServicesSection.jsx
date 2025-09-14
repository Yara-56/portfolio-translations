import React, { useEffect, useState } from "react";
import { ServicesApi } from "@/features/services/api";
import InlineServiceForm from "@/components/InlineServiceForm";

export default function ServicesSection({ isAdmin }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const reload = async () => {
    try {
      setLoading(true);
      setItems(await ServicesApi.list());
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { reload(); }, []);

  return (
    <>
      {isAdmin && <InlineServiceForm onCreated={reload} />}
      {loading ? (
        <p className="mt-3">Carregando serviços...</p>
      ) : items.length ? (
        <ul className="grid md:grid-cols-2 gap-4 mt-4">
          {items.map((s) => (
            <li key={s.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="font-semibold">{s.title}</p>
              {s.price_text && <p className="text-yellow-300 text-sm mt-1">{s.price_text}</p>}
              {s.description && <p className="text-gray-300 text-sm mt-2 whitespace-pre-wrap">{s.description}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-300 mt-3">Nenhum serviço disponível.</p>
      )}
    </>
  );
}
