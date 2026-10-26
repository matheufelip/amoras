import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white)', padding: '3.5rem 2rem 2.5rem', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
        Amoras — Artesanatos Personalizados
      </h2>
      <p style={{ opacity: 0.85, fontSize: '0.95rem', maxWidth: 480, margin: '0 auto 1.5rem' }}>
        Feito à mão com afeto e exclusividade para momentos inesquecíveis.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
        <Link href="/catalogo" style={{ color: 'white', opacity: 0.9, textDecoration: 'none' }}>Catálogo</Link>
        <Link href="/privacidade" style={{ color: 'white', opacity: 0.9, textDecoration: 'none' }}>Política de Privacidade (LGPD)</Link>
        <Link href="/termos" style={{ color: 'white', opacity: 0.9, textDecoration: 'none' }}>Termos de Confecção & Trocas</Link>
      </div>

      <p style={{ opacity: 0.6, fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1.5rem', maxWidth: 600, margin: '0 auto' }}>
        © {new Date().getFullYear()} Amoras Artesanato. Todos os direitos reservados.
      </p>
    </footer>
  );
}
