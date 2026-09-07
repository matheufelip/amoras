import Link from "next/link";
import styles from "./page.module.css";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Detalhes que encantam, feitos à mão para você.</h1>
          <p className={styles.subtitle}>
            Personalizamos momentos especiais com peças artesanais únicas e cheias de afeto.
            Do enxoval do bebê ao presente perfeito.
          </p>
          <Link href="/catalogo" className={styles.ctaButton}>
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

      {/* Seção Sobre a Artesã */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutContent}>
          <div className={styles.aboutImage}>
            {/* Espaço reservado para uma foto da Kelly ou do ateliê */}
            <div style={{ textAlign: "center" }}>
              <Heart size={48} style={{ marginBottom: "1rem" }} />
              <p>Foto da Artesã<br/>(Adicionar no painel)</p>
            </div>
          </div>
          
          <div className={styles.aboutText}>
            <h2 className={styles.aboutTitle}>Quem faz o Amoras?</h2>
            <p className={styles.aboutDesc}>
              Olá! Eu sou a Kelly, a artesã por trás de cada pontinho e detalhe que você vê por aqui.
            </p>
            <p className={styles.aboutDesc}>
              O Amoras nasceu da minha paixão por criar peças únicas que trazem aconchego e eternizam momentos especiais. 
              Acredito que o trabalho manual tem uma energia diferente, pois cada peça é feita com calma, exclusividade e muito amor.
            </p>
            <p className={styles.aboutDesc}>
              Meu propósito é entregar mais do que produtos: é entregar afeto em forma de arte.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
