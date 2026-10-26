import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Termos de Compra e Confecção | Amoras Artesanato",
  description: "Condições gerais de confecção, prazos, entregas e personalização de peças artesanais no Amoras.",
};

export default function TermosPage() {
  return (
    <div style={{ maxWidth: 840, margin: "0 auto", padding: "3rem 1.5rem 5rem", color: "var(--text-dark)", lineHeight: 1.8 }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-color)", textDecoration: "none", marginBottom: "2rem", fontWeight: 600 }}>
        <ArrowLeft size={18} /> Voltar para o início
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
        <FileText size={36} color="var(--primary-color)" />
        <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2.2rem", color: "var(--primary-color)" }}>
          Termos de Compra & Confecção
        </h1>
      </div>
      <p style={{ color: "var(--text-light)", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
        Regras de encomenda, produção artesanal, prazos e trocas
      </p>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>1. A Natureza do Trabalho Artesanal</h2>
        <p>
          Todas as peças do <strong>Amoras Artesanato</strong> são produzidas manualmente, ponto a ponto. Em razão dessa exclusividade artística, pequenas variações sutis de tom nos fios, tecidos ou dimensões podem ocorrer em comparação às fotografias do mostruário, constituindo a própria assinatura de autenticidade do feito à mão.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>2. Pronta Entrega vs. Produção Sob Encomenda</h2>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Peças em Pronta Entrega:</strong> Produtos identificados com o selo de pronta entrega estão finalizados e prontos para envio ou retirada no prazo de 1 a 2 dias úteis após a confirmação do pagamento.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Peças Sob Encomenda:</strong> Cada produto possui um prazo estimado de confecção (em dias úteis) informado no catálogo. O prazo de produção passa a contar a partir da aprovação dos detalhes de personalização (cores, nomes) e confirmação do pagamento.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>3. Prazos e Modalidades de Envio</h2>
        <p>
          O prazo total para você receber sua encomenda em casa é a soma do <strong>Tempo de Confecção</strong> + <strong>Prazo dos Correios/Transportadora</strong>. Assim que a encomenda for postada, o código de rastreamento é enviado diretamente pelo WhatsApp para acompanhamento do trajeto.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>4. Política de Trocas e Cancelamentos</h2>
        <p>
          Em consonância com o Código de Defesa do Consumidor e a natureza de produtos customizados:
        </p>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Produtos Personalizados (com nomes, datas ou temas sob medida):</strong> Por se tratarem de criações exclusivas feitas sob especificação individual do cliente, não é permitida a troca ou desistência após o início da confecção, salvo em casos de defeito de confecção devidamente comprovado.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Defeitos ou Avarias de Transporte:</strong> Caso a embalagem chegue violada ou a peça apresente qualquer imperfeição não condizente com a encomenda, entre em contato em até 7 (sete) dias corridos após o recebimento com fotos para resolução imediata.
          </li>
        </ul>
      </section>

      <div style={{ marginTop: "3rem", padding: "1.5rem", borderRadius: 12, backgroundColor: "rgba(138, 91, 142, 0.08)", borderLeft: "4px solid var(--primary-color)" }}>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          Ao enviar seu pedido pelo catálogo, você celebra um atendimento humanizado diretamente com a artesã, assegurando total clareza em todas as etapas da sua encomenda.
        </p>
      </div>
    </div>
  );
}
