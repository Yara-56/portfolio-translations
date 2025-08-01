import React from "react";

export default function Revisions() {
  return (
    <div className="max-w-4xl mx-auto py-12 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Revisões e Edições</h1>

      <p className="mb-6 text-gray-200">
        Nesta seção, compartilho trabalhos de revisão e edição de textos diversos. Revisar é mais do que corrigir erros: é compreender o objetivo do texto, respeitar seu estilo e garantir clareza, coerência e coesão. Também diferencio revisão gramatical, estilística e de conteúdo.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Textos Técnicos</h2>
        <p className="text-gray-300">
          Revisões de documentos informativos, normativos, institucionais ou funcionais com foco em clareza e padronização terminológica.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Textos Acadêmicos</h2>
        <p className="text-gray-300">
          Revisões de artigos, TCCs, monografias, dissertações, resumos e projetos acadêmicos, com atenção às normas, fluidez textual e coerência argumentativa.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Textos Literários</h2>
        <p className="text-gray-300">
          Revisões de textos criativos como contos, crônicas e poemas, respeitando o estilo autoral, a voz narrativa e os elementos estéticos da linguagem.
        </p>
      </section>
    </div>
  );
}
