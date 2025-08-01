import React from "react";

export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto py-12 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Projetos</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Pesquisas</h2>
        <p className="text-gray-300">
          <strong>Análise Contrastiva de Traduções (2024 - Atualmente)</strong><br />
          Pesquisa acadêmica voltada à comparação entre diferentes versões de um mesmo texto, observando escolhas tradutórias e suas implicações culturais, estilísticas e discursivas.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Outros Artigos</h2>
        <p className="text-gray-300">
          Ensaios e textos teóricos sobre tradução, revisão, linguagem e cultura, com reflexões sobre práticas tradutórias e seus efeitos sociais.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Críticas Tradutórias</h2>
        <p className="text-gray-300">
          Análises críticas de traduções já publicadas, observando fidelidade ao texto original, adequação ao público-alvo e estilo do tradutor.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Canal do YouTube</h2>
        <p className="text-gray-300">
          Produção de conteúdo sobre tradução, revisão, carreira acadêmica e práticas linguísticas, voltado a estudantes e profissionais da área.
        </p>
        <a
          href="#"
          className="inline-block mt-2 text-yellow-400 hover:underline text-sm"
          target="_blank"
        >
          Acessar canal
        </a>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Eu, Escritor</h2>
        <p className="text-gray-300">
          Produção de textos autorais como crônicas, poemas e reflexões pessoais que integram linguagem, cotidiano e experiências sensíveis.
        </p>
      </section>
    </div>
  );
}
