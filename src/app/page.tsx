import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "5rem 2rem", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ fontSize: "3.5rem", color: "var(--primary-color)", marginBottom: "1rem" }}>Detalhes que encantam, feitos à mão para você.</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--text-light)", marginBottom: "3rem" }}>Personalizamos momentos especiais com peças artesanais únicas e cheias de afeto.</p>
      <Link href="/catalogo" style={{ backgroundColor: "var(--secondary-color)", color: "white", padding: "1rem 2rem", borderRadius: 30, fontWeight: "bold", fontSize: "1.1rem" }}>
        Ver Catálogo Completo
      </Link>
    </div>
  );
}
