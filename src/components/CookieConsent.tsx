"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("amoras_cookie_consent");
    if (!consent) {
      // Pequeno delay para aparecer com elegância após o carregamento inicial
      const timer = setTimeout(() => setShow(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("amoras_cookie_consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 20,
      left: 20,
      right: 20,
      maxWidth: 520,
      margin: "0 auto",
      backgroundColor: "rgba(255, 255, 255, 0.98)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
      borderRadius: 16,
      border: "1px solid rgba(138, 91, 142, 0.2)",
      padding: "1.2rem 1.4rem",
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: "0.8rem",
      animation: "slideUp 0.3s ease-out"
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.8rem" }}>
        <div style={{
          backgroundColor: "rgba(138, 91, 142, 0.12)",
          padding: 8,
          borderRadius: 10,
          color: "var(--primary-color)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Cookie size={22} />
        </div>
        <div style={{ flex: 1, fontSize: "0.85rem", color: "var(--text-dark)", lineHeight: 1.5 }}>
          Utilizamos cookies essenciais e tecnologias de armazenamento local para lembrar seu carrinho de compras e garantir uma navegação segura, em conformidade com a LGPD. Saiba mais em nossa{" "}
          <Link href="/privacidade" style={{ color: "var(--primary-color)", fontWeight: 600, textDecoration: "underline" }}>
            Política de Privacidade
          </Link>.
        </div>
        <button 
          onClick={handleAccept} 
          style={{ background: "none", border: "none", color: "var(--text-light)", cursor: "pointer", padding: 2 }}
          aria-label="Fechar"
        >
          <X size={18} />
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.6rem" }}>
        <button
          onClick={handleAccept}
          style={{
            backgroundColor: "var(--primary-color)",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "0.5rem 1.2rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity 0.2s"
          }}
        >
          Entendido e Aceitar
        </button>
      </div>
    </div>
  );
}
