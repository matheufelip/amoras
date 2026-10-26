import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--primary-color)', color: 'var(--white)', padding: '3.5rem 2rem 2.5rem', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '1.8rem', marginBottom: '0.5rem' }}>
        Amoras — Artesanatos Personalizados
      </h2>
      <p style={{ opacity: 0.85, fontSize: '0.95rem', maxWidth: 480, margin: '0 auto 1.5rem' }}>
        Feito à mão com afeto e exclusividade para momentos inesquecíveis.
      </p>

      {/* Contatos Oficiais da Artesã */}
      <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: '1.8rem' }}>
        <a 
          href="https://instagram.com/amoras_crochetaria" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            backgroundColor: 'rgba(255, 255, 255, 0.12)', 
            padding: '0.5rem 1.1rem', 
            borderRadius: 30, 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'background 0.2s'
          }}
        >
          <Instagram size={18} /> @amoras_crochetaria
        </a>

        <a 
          href="https://wa.me/5565996243914" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            backgroundColor: 'rgba(255, 255, 255, 0.12)', 
            padding: '0.5rem 1.1rem', 
            borderRadius: 30, 
            color: 'white', 
            textDecoration: 'none', 
            fontSize: '0.9rem',
            fontWeight: 500,
            transition: 'background 0.2s'
          }}
        >
          <MessageCircle size={18} /> (65) 99624-3914
        </a>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
        <Link href="/catalogo" style={{ color: 'white', opacity: 0.9, textDecoration: 'none' }}>Catálogo</Link>
        <Link href="/privacidade" style={{ color: 'white', opacity: 0.9, textDecoration: 'none' }}>Política de Privacidade (LGPD)</Link>
        <Link href="/termos" style={{ color: 'white', opacity: 0.9, textDecoration: 'none' }}>Termos de Confecção & Trocas</Link>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '1.5rem', maxWidth: 650, margin: '0 auto', fontSize: '0.82rem', opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <p>© {new Date().getFullYear()} Amoras Artesanato. Todos os direitos reservados.</p>
        <p style={{ opacity: 0.9 }}>
          Desenvolvido por{" "}
          <a 
            href="https://instagram.com/matheufelip" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'white', fontWeight: 600, textDecoration: 'underline' }}
          >
            Matheus Felipe
          </a>
        </p>
      </div>
    </footer>
  );
}
