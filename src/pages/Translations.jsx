import React from "react";

export default function Translations() {
  return (
    <div className="max-w-4xl mx-auto py-12 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Traduções e Versões</h1>

      <p className="mb-6 text-gray-200">
        Aqui você encontra meu trabalho como tradutor e versor, incluindo textos técnicos, acadêmicos, literários e legendagem.
        Também explico a diferença entre tradução humana e revisão de traduções automáticas, destacando a importância da intervenção crítica e humana no processo.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Textos Técnicos</h2>
        <p className="text-gray-300">Traduções de manuais, documentos institucionais, materiais informativos e textos funcionais com linguagem precisa e direta.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Textos Acadêmicos</h2>
        <p className="text-gray-300">Traduções e versões de artigos, resumos, monografias e apresentações acadêmicas com fidelidade ao conteúdo e estilo.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Textos Literários</h2>
        <p className="text-gray-300">Traduções e versões de poemas, contos e ensaios literários com atenção especial ao ritmo, estilo e intenção do autor original.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Legendagem</h2>
        <p className="text-gray-300">
          Trabalho de legendagem com foco em acessibilidade e fidelidade linguística. Veja um exemplo abaixo:
        </p>
        <div className="mt-4">
          <h3 className="text-lg font-bold text-yellow-400">Legendagem Russo → Português</h3>
          <p className="text-gray-300">Vídeo com legendas personalizadas e acompanhamento de tradução comentada.</p>
          <a
            href="#"
            target="_blank"
            className="inline-block mt-2 text-sm text-blue-400 underline hover:text-blue-200"
          >
            Ver tradução comentada (PDF)
          </a>
        </div>
      </section>
    </div>
  );
}
