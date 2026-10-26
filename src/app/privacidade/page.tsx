import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Política de Privacidade e Proteção de Dados (LGPD) | Amoras Artesanato",
  description: "Entenda como tratamos e protegemos seus dados pessoais de acordo com a LGPD no Amoras Artesanato.",
};

export default function PrivacidadePage() {
  return (
    <div style={{ maxWidth: 840, margin: "0 auto", padding: "3rem 1.5rem 5rem", color: "var(--text-dark)", lineHeight: 1.8 }}>
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-color)", textDecoration: "none", marginBottom: "2rem", fontWeight: 600 }}>
        <ArrowLeft size={18} /> Voltar para o início
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
        <ShieldCheck size={36} color="var(--primary-color)" />
        <h1 style={{ fontFamily: "var(--font-playfair), serif", fontSize: "2.2rem", color: "var(--primary-color)" }}>
          Política de Privacidade (LGPD)
        </h1>
      </div>
      <p style={{ color: "var(--text-light)", fontSize: "0.95rem", marginBottom: "2.5rem" }}>
        Última atualização: {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
      </p>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>1. Nosso Compromisso com sua Privacidade</h2>
        <p>
          No ateliê <strong>Amoras — Artesanatos Personalizados e Presentes</strong>, nós respeitamos profundamente a confiança que você deposita em nós ao escolher nossas peças artesanais. Esta Política de Privacidade descreve com clareza como tratamos as informações pessoais coletadas quando você navega em nosso site ou realiza uma encomenda, em total conformidade com a <strong>Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 - LGPD)</strong>.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>2. Quais Dados Coletamos e Para Qual Finalidade?</h2>
        <p>Nosso modelo de negócios preza pela <strong>minimização de dados</strong>: coletamos apenas o estritamente indispensável para viabilizar seu atendimento e entrega.</p>
        <ul style={{ paddingLeft: "1.5rem", marginTop: "0.5rem" }}>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Nome completo e Telefone/WhatsApp:</strong> Coletados no carrinho de compras unicamente para identificar quem está solicitando a encomenda, confirmar detalhes de personalização (cores, nomes bordados) e prestar atendimento direto.
          </li>
          <li style={{ marginBottom: "0.5rem" }}>
            <strong>Dados de Navegação e Carrinho Local:</strong> Utilizamos armazenamento seguro no seu próprio navegador (LocalStorage) para manter os itens no seu carrinho enquanto você escolhe outros produtos. Não rastreamos sua navegação fora do nosso site.
          </li>
        </ul>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>3. Pagamentos e Informações Financeiras</h2>
        <p>
          O site do Amoras Artesanato <strong>não armazena números de cartões de crédito ou dados bancários</strong>. As negociações e fechamentos de pagamento são combinados de maneira segura e direta via WhatsApp oficial ou links de pagamento de plataformas certificadas.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>4. Compartilhamento de Dados</h2>
        <p>
          Nós <strong>nunca vendemos, alugamos ou comercializamos</strong> suas informações pessoais com terceiros. Seus dados de endereço e contato só são compartilhados com empresas de logística (Correios ou transportadoras parceiras) quando necessário para a remessa física da sua encomenda até o seu destino.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>5. Segurança das Informações</h2>
        <p>
          Adotamos medidas técnicas, administrativas e organizacionais para proteger seus dados contra acessos não autorizados, perdas ou destruição acidental. Todas as comunicações do site são criptografadas por protocolo <strong>HTTPS / SSL</strong> de ponta a ponta.
        </p>
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.3rem", color: "var(--primary-color)", marginBottom: "0.5rem" }}>6. Seus Direitos como Titular dos Dados</h2>
        <p>
          A qualquer momento, você pode solicitar a confirmação, atualização ou exclusão definitiva dos seus dados dos nossos registros de encomendas, bastando entrar em contato através dos nossos canais oficiais de atendimento.
        </p>
      </section>

      <div style={{ marginTop: "3rem", padding: "1.5rem", borderRadius: 12, backgroundColor: "rgba(138, 91, 142, 0.08)", borderLeft: "4px solid var(--primary-color)" }}>
        <p style={{ margin: 0, fontSize: "0.95rem" }}>
          Dúvidas sobre o tratamento de dados? Converse diretamente com a nossa responsável pelo ateliê pelo WhatsApp oficial disponível na página de contato e catálogo.
        </p>
      </div>
    </div>
  );
}
