"use client";

import { useCart, Product } from "@/context/CartContext";
import styles from "./page.module.css";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { getProducts } from "@/services/productService";

const CATEGORIES = ["Todos", "Maternidade", "Presentes", "Decoração", "Acessórios"];

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [currentImg, setCurrentImg] = useState(0);

  const images = product.images && product.images.length > 0 ? product.images : [];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.imagePlaceholder}
        style={images.length > 0 ? {
          backgroundImage: `url(${images[currentImg]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'transparent'
        } : {}}
      >
        {images.length === 0 && <span>Foto: {product.name}</span>}
        
        {images.length > 1 && (
          <>
            <button className={styles.galleryBtn} onClick={prevImage} style={{ left: 5 }}>
              <ChevronLeft size={20} />
            </button>
            <button className={styles.galleryBtn} onClick={nextImage} style={{ right: 5 }}>
              <ChevronRight size={20} />
            </button>
            <div className={styles.dotsContainer}>
              {images.map((_, idx) => (
                <div key={idx} className={`${styles.dot} ${idx === currentImg ? styles.dotActive : ""}`} />
              ))}
            </div>
          </>
        )}
      </div>
      
      <div className={styles.cardContent}>
        <span className={styles.category}>{product.category}</span>
        <h2 className={styles.productName}>{product.name}</h2>
        <p className={styles.productDesc}>{product.description}</p>
        
        {product.isReadyDelivery ? (
          <span className={styles.badgeReady}>✓ Pronta Entrega</span>
        ) : product.leadTimeDays ? (
          <span className={styles.badgeLeadTime}>⏱ {product.leadTimeDays} dias para confecção</span>
        ) : null}

        <div className={styles.cardFooter}>
          <span className={styles.price}>
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <button
            className={styles.addButton}
            onClick={() => addItem(product)}
            title={product.stock === 0 ? "Fora de estoque" : "Adicionar à Encomenda"}
            disabled={product.stock === 0}
            style={{ opacity: product.stock === 0 ? 0.5 : 1 }}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Catalogo() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Todos");

  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredProducts = activeCategory === "Todos"
    ? products
    : products.filter(p => p.category === activeCategory);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nosso Catálogo</h1>
        <p className={styles.subtitle}>Explore nossas peças feitas à mão com muito carinho.</p>
      </div>

      <div className={styles.filterBar}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`${styles.filterButton} ${activeCategory === cat ? styles.filterButtonActive : ""}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p>Buscando as peças no ateliê...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p>{activeCategory === "Todos" ? "Nenhuma peça cadastrada no momento." : `Nenhuma peça na categoria "${activeCategory}".`}</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
