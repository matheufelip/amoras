"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { getSettings, ArtisanSettings } from "@/services/settingsService";

export default function Home() {
  const [settings, setSettings] = useState<ArtisanSettings | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings();
        if (data) setSettings(data);
      } catch (err) {
        console.error("Erro ao carregar configurações:", err);
      }
    }
    load();
  }, []);

  const artisanName = settings?.artisanName || "Kelly";
  const artisanStory = settings?.artisanStory || "Olá! Eu sou a Kelly, a artesã por trás de cada pontinho e detalhe que você vê por aqui.\n\nO Amoras nasceu da minha paixão por criar peças únicas que trazem aconchego e eternizam momentos especiais. Acredito que o trabalho manual tem uma energia diferente, pois cada peça é feita com calma, exclusividade e muito amor.\n\nMeu propósito é entregar mais do que produtos: é entregar afeto em forma de arte.";

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
          <div 
            className={styles.aboutImage}
            style={settings?.artisanPhoto ? { backgroundImage: `url(${settings.artisanPhoto})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'transparent' } : {}}
          >
            {!settings?.artisanPhoto && (
              <div style={{ textAlign: "center" }}>
                <Heart size={48} style={{ marginBottom: "1rem" }} />
                <p>Foto da Artesã<br/>(Adicionar no painel)</p>
              </div>
            )}
          </div>
          
          <div className={styles.aboutText}>
            <h2 className={styles.aboutTitle}>Quem faz o Amoras?</h2>
            {artisanStory.split('\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index} className={styles.aboutDesc}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
