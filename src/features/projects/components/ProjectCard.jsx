import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ item }) {
  return (
    <Link
      to={`/projects/${item.slug}`}
      className="border border-white/10 rounded-xl overflow-hidden hover:border-yellow-400/50 transition block bg-white/5"
    >
      {item.cover_url && (
        <img src={item.cover_url} alt={`Capa do projeto ${item.title}`} className="w-full h-40 object-cover" />
      )}
      <div className="p-4">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-300 mt-1">
          {item.type}
          {Array.isArray(item.languages) && item.languages.length ? ` · ${item.languages.join(", ")}` : ""}
          {Array.isArray(item.categories) && item.categories.length ? ` · ${item.categories.join(", ")}` : ""}
        </p>
      </div>
    </Link>
  );
}
