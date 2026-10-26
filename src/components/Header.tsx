"use client";
import Link from "next/link";
import { ShoppingBag, Instagram, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount } = useCart();
  return (
    <header style={{ 
      padding: '0.8rem 1.5rem', 
      backgroundColor: 'var(--white)', 
      boxShadow: '0 2px 14px rgba(138, 91, 142, 0.08)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{ 
            color: 'var(--primary-color)', 
            fontSize: '1.9rem', 
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 700,
            letterSpacing: '-0.5px' 
          }}>
            Amoras
          </h1>
        </Link>

        {/* Navegação e Contatos de Maior Destaque */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          
          {/* Links de navegação padrão */}
          <Link href="/" style={{ fontWeight: 600, color: 'var(--text-dark)', textDecoration: 'none', fontSize: '0.95rem' }}>
            Início
          </Link>
          <Link href="/catalogo" style={{ fontWeight: 600, color: 'var(--text-dark)', textDecoration: 'none', fontSize: '0.95rem' }}>
            Catálogo
          </Link>

          {/* Divisor vertical sutil */}
          <div style={{ width: 1, height: 24, backgroundColor: 'rgba(0,0,0,0.1)', margin: '0 0.2rem' }} />

          {/* Destaque Instagram da Artesã */}
          <a
            href="https://instagram.com/amoras_crochetaria"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram @amoras_crochetaria"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 38,
              height: 38,
              borderRadius: '50%',
              backgroundColor: 'rgba(138, 91, 142, 0.1)',
              color: '#8A5B8E',
              transition: 'all 0.2s ease',
              textDecoration: 'none'
            }}
          >
            <Instagram size={20} strokeWidth={2.2} />
          </a>

          {/* Destaque WhatsApp Verde Oficial com Selo */}
          <a
            href="https://wa.me/5565996243914?text=Ol%C3%A1%20Kelly!%20Vim%20pelo%20site%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20as%20pe%C3%A7as%20artesanais."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              backgroundColor: '#25D366',
              color: 'white',
              padding: '0.5rem 0.95rem',
              borderRadius: 30,
              fontSize: '0.88rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(37, 211, 102, 0.35)',
              transition: 'transform 0.2s ease'
            }}
          >
            <MessageCircle size={19} color="white" strokeWidth={2.4} />
            <span style={{ display: 'inline-block' }}>WhatsApp</span>
          </a>

          {/* Sacola de Encomendas */}
          <Link href="/carrinho" style={{ position: 'relative', display: 'flex', marginLeft: '0.4rem', color: 'var(--primary-color)' }} title="Minha Encomenda">
            <ShoppingBag size={25} strokeWidth={2.1} />
            {cartCount > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: -6, 
                right: -9, 
                backgroundColor: 'var(--secondary-color)', 
                color: 'white', 
                borderRadius: '50%', 
                width: 20, 
                height: 20, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontSize: '0.75rem', 
                fontWeight: 'bold',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
