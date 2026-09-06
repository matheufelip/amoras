"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { Lock, Mail, ArrowLeft } from "lucide-react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

type View = "login" | "resetPassword";

export default function LoginAdmin() {
  const router = useRouter();
  const [view, setView] = useState<View>("login");

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset de senha
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err: any) {
      console.error(err);
      setError("Email ou senha inválidos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError("");
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetSent(true);
    } catch (err: any) {
      console.error(err);
      setResetError("Não foi possível enviar o e-mail. Verifique se o endereço está correto.");
    } finally {
      setResetLoading(false);
    }
  };

  // ----- Tela de redefinição de senha -----
  if (view === "resetPassword") {
    return (
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <div className={styles.iconContainer} style={{ backgroundColor: "rgba(217, 136, 161, 0.15)", color: "var(--secondary-color)" }}>
              <Mail size={28} />
            </div>
            <h1>Redefinir Senha</h1>
            <p>
              {resetSent
                ? "Verifique sua caixa de entrada!"
                : "Digite seu e-mail e enviaremos um link para você criar uma nova senha."}
            </p>
          </div>

          {resetSent ? (
            <div className={styles.successBox}>
              <p>
                ✅ Enviamos um link para <strong>{resetEmail}</strong>.<br /><br />
                Clique no link recebido no e-mail para criar sua senha. Depois volte aqui e entre normalmente.
              </p>
              <button
                className={styles.loginButton}
                onClick={() => { setView("login"); setResetSent(false); setResetEmail(""); }}
                style={{ marginTop: "1.5rem" }}
              >
                Voltar para o Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className={styles.form}>
              {resetError && <div className={styles.error}>{resetError}</div>}

              <div className={styles.inputGroup}>
                <label htmlFor="resetEmail">Seu E-mail</label>
                <input
                  type="email"
                  id="resetEmail"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="kelly@email.com"
                  required
                />
              </div>

              <button type="submit" className={styles.loginButton} disabled={resetLoading}>
                {resetLoading ? "Enviando..." : "Enviar link de acesso"}
              </button>

              <button
                type="button"
                className={styles.linkButton}
                onClick={() => setView("login")}
              >
                <ArrowLeft size={16} />
                Voltar para o login
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ----- Tela de login principal -----
  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.iconContainer}>
            <Lock size={28} />
          </div>
          <h1>Acesso Restrito</h1>
          <p>Painel de controle Amoras</p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail da Artesã</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="kelly@email.com"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={styles.loginButton} disabled={loading}>
            {loading ? "Entrando..." : "Entrar no Painel"}
          </button>

          <button
            type="button"
            className={styles.linkButton}
            onClick={() => { setView("resetPassword"); setResetEmail(email); setError(""); }}
          >
            Primeiro acesso ou esqueceu a senha?
          </button>
        </form>
      </div>
    </div>
  );
}
