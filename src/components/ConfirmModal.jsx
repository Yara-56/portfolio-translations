import React, { useEffect } from "react";

export default function ConfirmModal({
  open,
  title = "Confirmar ação",
  description = "Tem certeza que deseja continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger", // "danger" | "default"
  onConfirm,
  onClose,
}) {
  useEffect(() => {
    function onEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const confirmClasses =
    variant === "danger"
      ? "bg-red-500 hover:bg-red-600 text-white"
      : "bg-yellow-400 hover:bg-yellow-500 text-black";

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* dialog */}
      <div className="relative w-full max-w-md rounded-2xl bg-[#0f172a] text-white shadow-2xl border border-white/10 p-6">
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center
              ${variant === "danger" ? "bg-red-500/20 text-red-300" : "bg-yellow-400/20 text-yellow-300"}`}>
              !
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-gray-300 mt-1">{description}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
            className={`px-4 py-2 rounded-lg font-semibold transition ${confirmClasses}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
