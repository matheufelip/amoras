"use client";

import Link from "next/link";
import styles from "./page.module.css";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "@/context/CartContext";
import { getProducts, deleteProduct } from "@/services/productService";
import Image from "next/image";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar produtos do banco de dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await deleteProduct(id);
        await loadProducts(); // recarrega a lista
      } catch (error) {
        console.error(error);
        alert("Erro ao deletar produto.");
      }
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Carregando painel...</p></div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Painel da Artesã</h1>
          <p className={styles.subtitle}>Gerencie seus produtos e estoque</p>
        </div>
        <Link href="/admin/novo" className={styles.newButton}>
          <Plus size={20} />
          Novo Produto
        </Link>
      </header>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque / Disp.</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className={styles.productCell}>
                  {product.images?.[0] ? (
                    <img src={product.images?.[0]} alt={product.name} className={styles.imageThumb} style={{ objectFit: 'cover' }} />
                  ) : (
                    <div className={styles.imageThumb}></div>
                  )}
                  <span className={styles.productName}>{product.name}</span>
                </td>
                <td>{product.category}</td>
                <td className={styles.priceCell}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </td>
                <td>
                  <div className={styles.stockInfo}>
                    <span className={styles.stockCount}>{product.stock} un.</span>
                    {product.isReadyDelivery ? (
                      <span className={styles.badgeReady}>Pronta Entrega</span>
                    ) : (
                      <span className={styles.badgeLeadTime}>{product.leadTimeDays} dias p/ confecção</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn} aria-label="Editar">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      className={styles.actionBtnDelete} 
                      aria-label="Excluir"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.emptyState}>
                  Nenhum produto cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
