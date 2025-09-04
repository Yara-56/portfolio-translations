import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "../components/LoginModal";

export default function Home() {
  const { user, signOut } = useAuth(); // Pegando a informação do usuário autenticado
  const [openLoginModal, setOpenLoginModal] = useState(false); // Controle do modal de login

  // useEffect sempre será chamado, não condicional
  useEffect(() => {
    if (!user) {
      // Se não houver usuário, o modal de login precisa ser mostrado
      setOpenLoginModal(true);
    } else if (user.email !== "email_do_seu_irmao@dominio.com") {
      // Se o e-mail não for o do seu irmão, deslogue
      signOut();
      alert("Você não tem permissão para acessar.");
    }
  }, [user, signOut]); // Garantir que a dependência seja sempre observada

  // Lógica para abrir o modal quando o usuário não está autenticado
  const handleCloseLoginModal = () => {
    setOpenLoginModal(false);
  };

  return (
    <div>
      {/* Condicionalmente mostrando o modal de login */}
      <LoginModal open={openLoginModal} onClose={handleCloseLoginModal} />

      {/* Conteúdo da página Home */}
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden relative">
        <main className="relative z-10 px-4 w-full max-w-6xl mx-auto flex-grow py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Resto do conteúdo da página */}
        </main>
      </div>
    </div>
  );
}
