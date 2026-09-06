"use client";

import { useCart } from "@/context/CartContext";
import styles from "./page.module.css";
import Link from "next/link";
import { MessageCircle, Trash2 } from "lucide-react";
import { saveOrder } from "@/services/orderService";
import { useState } from "react";

export default function Carrinho() {
  const { items, removeItem, cartTotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCheckout = async () => {
    if (!customerName.trim()) {
      alert("Por favor, informe seu nome para finalizar o pedido.");
      return;
    }

    const phoneNumber = "5565996243914";
    let message = `Olá Amoras! Meu nome é *${customerName}* e gostaria de encomendar:%0A%0A`;

    items.forEach((item) => {
      message += `- ${item.quantity}x ${item.product.name} (R$ ${item.product.price.toFixed(2).replace('.', ',')})%0A`;
    });

    message += `%0A*Total estimado:* R$ ${cartTotal.toFixed(2).replace('.', ',')}%0A%0A`;
    message += "Podemos combinar os detalhes de personalização e prazo de entrega?";

    setSaving(true);
    try {
      // Salva o pedido no Firebase antes de abrir o WhatsApp
      await saveOrder({
        customerName: customerName.trim(),
        items: items.map(i => ({
          productId: i.product.id,
          productName: i.product.name,
          quantity: i.quantity,
          price: i.product.price
        })),
        total: cartTotal,
        status: "Pendente",
        whatsappMessage: message,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.error("Erro ao salvar pedido:", err);
      // Mesmo se falhar, abre o WhatsApp
    } finally {
      setSaving(false);
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>Seu carrinho está vazio</h2>
        <p>Parece que você ainda não escolheu nenhuma peça feita com afeto.</p>
        <Link href="/catalogo" className={styles.continueButton}>
          Explorar Catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sua Encomenda</h1>

      <div className={styles.cartContent}>
        <div className={styles.itemsList}>
          {items.map((item) => (
            <div key={item.product.id} className={styles.cartItem}>
              <div className={styles.itemImagePlaceholder} style={item.product.image ? { backgroundImage: `url(${item.product.image})`, backgroundSize: 'cover' } : {}}></div>
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.product.name}</h3>
                <p className={styles.itemPrice}>R$ {item.product.price.toFixed(2).replace('.', ',')}</p>
                <span className={styles.itemQuantity}>Quantidade: {item.quantity}</span>
              </div>
              <button 
                className={styles.removeButton}
                onClick={() => removeItem(item.product.id)}
                aria-label="Remover item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h3>Resumo do Pedido</h3>

          <div className={styles.inputGroup}>
            <label htmlFor="customerName">Seu Nome *</label>
            <input
              id="customerName"
              type="text"
              placeholder="Ex: Maria Silva"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={styles.nameInput}
            />
          </div>

          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className={styles.summaryTotal}>
            <span>Total Estimado</span>
            <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <p className={styles.disclaimer}>
            O valor final pode variar conforme o nível de personalização.
          </p>
          <button className={styles.checkoutButton} onClick={handleCheckout} disabled={saving}>
            <MessageCircle size={20} />
            {saving ? "Registrando pedido..." : "Finalizar no WhatsApp"}
          </button>
        </div>
      </div>
    </div>
  );
}
