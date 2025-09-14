import React from "react";

export function TabBar({ tabs, active, onChange }) {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      {tabs.map(t => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`font-semibold px-5 py-2 rounded-full shadow-md transition ${
              isActive ? "bg-yellow-400 text-black" : "bg-yellow-500 hover:bg-yellow-400 text-black"
            }`}
            aria-pressed={isActive}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
