import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Verifica se o acesso está vindo do subdomínio administrativo
  // Suporta tanto adm.amorasartesanato.com.br quanto ambientes de teste locais (ex: adm.localhost:3000)
  const isAdmSubdomain = host.startsWith("adm.") || host.startsWith("admin.");

  if (isAdmSubdomain) {
    // Se o usuário acessar a raiz do subdomínio adm (ex: adm.amorasartesanato.com.br/),
    // reescrevemos internamente para a rota /admin
    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/admin", request.url));
    }

    // Se acessar /login diretamente no subdomínio, redireciona/reescreve para /admin/login
    if (pathname === "/login") {
      return NextResponse.rewrite(new URL("/admin/login", request.url));
    }

    // Para qualquer outra subrota que não comece com /admin ou arquivos estáticos,
    // direciona para /admin/[pathname]
    if (!pathname.startsWith("/admin") && !pathname.startsWith("/_next") && !pathname.includes(".")) {
      return NextResponse.rewrite(new URL(`/admin${pathname}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Intercepta todas as rotas exceto arquivos estáticos e imagens do Next.js
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
