"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { cartCount } = useCart();
  return (
    <header style={{ padding: '1rem 2rem', backgroundColor: 'var(--white)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto' }}>
        <Link href="/">
          <h1 style={{ color: 'var(--primary-color)', fontSize: '1.8rem' }}>Amoras</h1>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" style={{ fontWeight: 600 }}>Início</Link>
          <Link href="/catalogo" style={{ fontWeight: 600 }}>Catálogo</Link>
          <Link href="/carrinho" style={{ position: 'relative', display: 'flex' }}>
            <ShoppingBag size={24} color="var(--primary-color)" />
            {cartCount > 0 && (
              <span style={{ position: 'absolute', top: -5, right: -10, backgroundColor: 'var(--secondary-color)', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 'bold' }}>{cartCount}</span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
