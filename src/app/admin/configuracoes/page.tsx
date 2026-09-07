"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { getSettings, saveSettings, ArtisanSettings } from "@/services/settingsService";
import { uploadToImgBB } from "@/services/productService";
import { Save, Image as ImageIcon } from "lucide-react";

export default function ConfiguracoesPage() {
  const [name, setName] = useState("");
  const [story, setStory] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [newPhotoFile, setNewPhotoFile] = useState<File | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await getSettings();
        if (data) {
          setName(data.artisanName || "");
          setStory(data.artisanStory || "");
          setPhotoUrl(data.artisanPhoto || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewPhotoFile(e.target.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      let finalPhotoUrl = photoUrl;
      
      if (newPhotoFile) {
        finalPhotoUrl = await uploadToImgBB(newPhotoFile);
        setPhotoUrl(finalPhotoUrl);
      }

      await saveSettings({
        artisanName: name,
        artisanStory: story,
        artisanPhoto: finalPhotoUrl
      });

      setMessage({ type: "success", text: "Configurações salvas com sucesso!" });
      setNewPhotoFile(null);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Erro ao salvar as configurações." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "3rem" }}>Carregando configurações...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Configurações do Site</h1>
      </header>

      {message.text && (
        <div className={`${styles.messageBox} ${message.type === 'error' ? styles.messageError : styles.messageSuccess}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSave} className={styles.formContainer}>
        <section className={styles.section}>
          <h2>Sobre a Artesã</h2>
          <p className={styles.sectionDesc}>Essas informações aparecem na página inicial do site.</p>

          <div className={styles.inputGroup}>
            <label>Nome da Artesã</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Kelly"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Sua História (O que aparece na página inicial)</label>
            <textarea
              value={story}
              onChange={(e) => setStory(e.target.value)}
              rows={6}
              placeholder="Conte um pouco sobre você e o Amoras..."
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Foto da Artesã</label>
            <div className={styles.photoContainer}>
              <div 
                className={styles.photoPreview} 
                style={newPhotoFile ? { backgroundImage: `url(${URL.createObjectURL(newPhotoFile)})` } : photoUrl ? { backgroundImage: `url(${photoUrl})` } : {}}
              >
                {!newPhotoFile && !photoUrl && <ImageIcon size={40} opacity={0.5} />}
              </div>
              <div className={styles.photoActions}>
                <input
                  type="file"
                  id="artisanPhoto"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="artisanPhoto" className={styles.uploadButton}>
                  Escolher nova foto
                </label>
                <p className={styles.helperText}>Formato quadrado recomendado.</p>
              </div>
            </div>
          </div>
        </section>

        <button type="submit" className={styles.saveButton} disabled={saving}>
          <Save size={20} />
          {saving ? "Salvando..." : "Salvar Configurações"}
        </button>
      </form>
    </div>
  );
}
