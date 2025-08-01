import React from "react";

export default function Services() {
  return (
    <div className="max-w-4xl mx-auto py-12 text-white">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Precisa de um Especialista do Texto?</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Primeiros Passos</h2>
        <p className="text-gray-300">
          Para contratar meus serviços, siga as etapas:
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-300">
          <li>Entre em contato por e-mail ou WhatsApp</li>
          <li>Agendamos uma reunião para definir escopo e prazos</li>
          <li>Envio de orçamento personalizado</li>
          <li>Pagamento dividido (50% na entrada, 50% na entrega)</li>
          <li>Possibilidade de reembolso proporcional em caso de cancelamento antecipado</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Tabela de Preços</h2>
        <p className="text-gray-300">Os valores variam conforme o tipo de serviço, complexidade e prazo:</p>
        <ul className="list-disc pl-6 mt-2 text-gray-300 text-sm">
          <li>Tradução Técnica: R$ 0,20 por palavra</li>
          <li>Tradução Literária: R$ 0,25 por palavra</li>
          <li>Revisão Acadêmica: R$ 0,15 por palavra</li>
          <li>Legendagem: sob consulta</li>
        </ul>
        <p className="text-sm text-gray-500 mt-2">* Os valores são estimativas e podem variar.</p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Prazos</h2>
        <p className="text-gray-300">
          Os prazos dependem da natureza do trabalho. Geralmente, traduções de até 2.000 palavras são entregues em até 3 dias úteis. Trabalhos extensos ou técnicos requerem avaliação personalizada.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Trabalhos Voluntários</h2>
        <p className="text-gray-300">
          Disponibilizo parte do meu tempo para colaborar com projetos acadêmicos de baixa renda, organizações sociais e causas que promovam o acesso ao conhecimento e à cultura.
        </p>
      </section>
    </div>
  );
}
