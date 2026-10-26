"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/5565996243914?text=Ol%C3%A1%20Kelly!%20Vim%20pelo%20site%20do%20Amoras%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20as%20pe%C3%A7as%20artesanais."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp da Artesã"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        backgroundColor: "#25D366",
        color: "white",
        width: 60,
        height: 60,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 6px 24px rgba(37, 211, 102, 0.45)",
        zIndex: 9998,
        transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "pointer",
        textDecoration: "none"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1) translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 10px 28px rgba(37, 211, 102, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1) translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(37, 211, 102, 0.45)";
      }}
    >
      <MessageCircle size={34} color="white" strokeWidth={2.2} />
      <span
        style={{
          position: "absolute",
          top: -2,
          right: -2,
          width: 14,
          height: 14,
          backgroundColor: "#ff3b30",
          borderRadius: "50%",
          border: "2px solid white"
        }}
      />
    </a>
  );
}
