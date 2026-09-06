"use client";

import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { ArrowLeft, Save, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { addProduct } from "@/services/productService";

export default function NovoProduto() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Maternidade");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("1");
  const [isReadyDelivery, setIsReadyDelivery] = useState(false);
  const [leadTime, setLeadTime] = useState("");
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Por favor, selecione uma imagem para o produto.");
      return;
    }

    setLoading(true);
    try {
      await addProduct({
        name,
        price: Number(price),
        category,
        description,
        stock: Number(stock),
        isReadyDelivery,
        leadTimeDays: !isReadyDelivery && leadTime ? Number(leadTime) : undefined,
        image: "" // O service cuidará disso
      }, imageFile);

      alert("Produto cadastrado com sucesso!");
      router.push("/admin");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar produto. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/admin" className={styles.backButton}>
          <ArrowLeft size={20} />
          Voltar
        </Link>
        <h1 className={styles.title}>Cadastrar Produto</h1>
      </header>

      <form onSubmit={handleSave} className={styles.formContainer}>
        <div className={styles.imageSection}>
          <div className={styles.imageUploadBox}>
            <UploadCloud size={40} className={styles.uploadIcon} />
            <p>{imageFile ? "Imagem selecionada!" : "Clique para fazer upload da foto"}</p>
            <span>{imageFile ? imageFile.name : "Tamanho recomendado: Quadrado (800x800px)"}</span>
            <input 
              type="file" 
              className={styles.fileInput} 
              accept="image/*" 
              onChange={handleImageChange}
            />
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Nome da Peça *</label>
            <input id="name" required value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Kit Maternidade Raposinha" />
          </div>

          <div className={styles.rowGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="price">Preço (R$) *</label>
              <input id="price" type="number" step="0.01" required value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="category">Categoria *</label>
              <select id="category" value={category} onChange={e => setCategory(e.target.value)}>
                <option value="Maternidade">Maternidade</option>
                <option value="Presentes">Presentes</option>
                <option value="Decoração">Decoração</option>
                <option value="Acessórios">Acessórios</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="description">Descrição Detalhada</label>
            <textarea id="description" rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Conte os detalhes, materiais usados e o que torna essa peça especial..." />
          </div>

          <div className={styles.divider}></div>

          <h3 className={styles.sectionTitle}>Estoque e Disponibilidade</h3>
          
          <div className={styles.rowGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="stock">Quantidade em Estoque</label>
              <input id="stock" type="number" min="0" value={stock} onChange={e => setStock(e.target.value)} />
            </div>
          </div>

          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="readyDelivery" checked={isReadyDelivery} onChange={e => setIsReadyDelivery(e.target.checked)} />
            <label htmlFor="readyDelivery">Esta peça é à pronta entrega (já está pronta).</label>
          </div>

          {!isReadyDelivery && (
            <div className={styles.inputGroup}>
              <label htmlFor="leadTime">Tempo de Confecção (em dias)</label>
              <input id="leadTime" type="number" min="1" value={leadTime} onChange={e => setLeadTime(e.target.value)} placeholder="Ex: 7" />
            </div>
          )}

          <div className={styles.footerActions}>
            <button type="submit" className={styles.saveButton} disabled={loading}>
              <Save size={20} />
              {loading ? "Salvando..." : "Salvar Produto"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
