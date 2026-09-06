"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { getOrders, updateOrderStatus, Order, OrderStatus } from "@/services/orderService";
import { CheckCircle, Clock, Package, ChevronDown } from "lucide-react";

const STATUS_COLUMNS: { status: OrderStatus; label: string; color: string; bgColor: string; icon: React.ReactNode }[] = [
  {
    status: "Pendente",
    label: "Pendentes",
    color: "#e67e22",
    bgColor: "#fff4e6",
    icon: <Clock size={18} />
  },
  {
    status: "Em Produção",
    label: "Em Produção",
    color: "#8A5B8E",
    bgColor: "rgba(138, 91, 142, 0.1)",
    icon: <Package size={18} />
  },
  {
    status: "Enviado",
    label: "Enviados / Concluídos",
    color: "#1a8f4c",
    bgColor: "#e6f8ec",
    icon: <CheckCircle size={18} />
  }
];

export default function Pedidos() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar status do pedido.");
    }
  };

  if (loading) {
    return <div className={styles.container}><p>Carregando pedidos...</p></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Painel de Pedidos</h1>
          <p className={styles.subtitle}>Gerencie e acompanhe todas as encomendas</p>
        </div>
        <div className={styles.stats}>
          <span className={styles.statBadge} style={{ backgroundColor: "#fff4e6", color: "#e67e22" }}>
            {orders.filter(o => o.status === "Pendente").length} Pendentes
          </span>
          <span className={styles.statBadge} style={{ backgroundColor: "rgba(138,91,142,0.1)", color: "var(--primary-color)" }}>
            {orders.filter(o => o.status === "Em Produção").length} Em Produção
          </span>
          <span className={styles.statBadge} style={{ backgroundColor: "#e6f8ec", color: "#1a8f4c" }}>
            {orders.filter(o => o.status === "Enviado").length} Enviados
          </span>
        </div>
      </div>

      <div className={styles.kanban}>
        {STATUS_COLUMNS.map(col => {
          const colOrders = orders.filter(o => o.status === col.status);
          return (
            <div key={col.status} className={styles.column}>
              <div className={styles.columnHeader} style={{ backgroundColor: col.bgColor, color: col.color }}>
                {col.icon}
                <h3>{col.label}</h3>
                <span className={styles.countBadge} style={{ backgroundColor: col.color }}>{colOrders.length}</span>
              </div>

              <div className={styles.cardList}>
                {colOrders.length === 0 && (
                  <div className={styles.emptyCol}>Nenhum pedido aqui</div>
                )}
                {colOrders.map(order => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.cardTop}>
                      <span className={styles.customerName}>{order.customerName}</span>
                      <span className={styles.orderDate}>
                        {new Date(order.createdAt).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}
                      </span>
                    </div>

                    <ul className={styles.itemList}>
                      {order.items.map((item, idx) => (
                        <li key={idx}>
                          <span>{item.quantity}x {item.productName}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.cardBottom}>
                      <span className={styles.orderTotal}>
                        R$ {order.total.toFixed(2).replace('.', ',')}
                      </span>
                      <div className={styles.selectWrapper}>
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className={styles.statusSelect}
                          style={{ borderColor: col.color, color: col.color }}
                        >
                          <option value="Pendente">Pendente</option>
                          <option value="Em Produção">Em Produção</option>
                          <option value="Enviado">Enviado</option>
                        </select>
                        <ChevronDown size={14} style={{ color: col.color }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
