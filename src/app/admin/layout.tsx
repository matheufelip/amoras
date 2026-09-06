"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingBag, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Não mostrar o layout na tela de login
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/admin/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{
        width: 240,
        backgroundColor: "var(--primary-color)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "2rem 0",
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 50
      }}>
        <div style={{ padding: "0 1.5rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
          <h2 style={{ fontSize: "1.5rem", fontFamily: "var(--font-playfair), serif" }}>Amoras</h2>
          <p style={{ fontSize: "0.8rem", opacity: 0.7, marginTop: "0.25rem" }}>Painel da Artesã</p>
        </div>

        <nav style={{ flex: 1, padding: "1.5rem 0" }}>
          <NavLink href="/admin" active={pathname === "/admin"} icon={<Package size={20} />} label="Produtos" />
          <NavLink href="/admin/pedidos" active={pathname === "/admin/pedidos"} icon={<ShoppingBag size={20} />} label="Pedidos" />
        </nav>

        <div style={{ padding: "0 1rem" }}>
          <button
            onClick={handleLogout}
            style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              width: "100%", padding: "0.8rem 1rem",
              background: "rgba(255,255,255,0.1)", border: "none",
              borderRadius: 10, color: "white", cursor: "pointer",
              fontSize: "0.95rem", fontWeight: 600
            }}
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 240, flex: 1, backgroundColor: "var(--bg-color)" }}>
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, active, icon, label }: { href: string; active: boolean; icon: React.ReactNode; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        padding: "0.8rem 1.5rem", margin: "0.25rem 0",
        backgroundColor: active ? "rgba(255,255,255,0.2)" : "transparent",
        borderRadius: 0,
        color: "white", fontWeight: active ? 700 : 500,
        fontSize: "0.95rem",
        borderLeft: active ? "3px solid white" : "3px solid transparent",
        transition: "all 0.2s ease"
      }}
    >
      {icon}
      {label}
    </Link>
  );
}
