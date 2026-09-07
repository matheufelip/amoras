import { db } from "@/lib/firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc,
  query,
  orderBy,
  deleteDoc
} from "firebase/firestore";

export type OrderStatus = "Pendente" | "Em Produção" | "Enviado";

export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  whatsappMessage: string;
  createdAt: string;
};

const COLLECTION_NAME = "orders";

export const saveOrder = async (orderData: Omit<Order, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...orderData,
    createdAt: new Date().toISOString()
  });
  return docRef.id;
};

export const getOrders = async (): Promise<Order[]> => {
  const q = query(collection(db, COLLECTION_NAME), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  const orders: Order[] = [];

  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    orders.push({
      id: docSnap.id,
      customerName: data.customerName || "Cliente",
      items: data.items || [],
      total: Number(data.total),
      status: data.status as OrderStatus,
      whatsappMessage: data.whatsappMessage || "",
      createdAt: data.createdAt
    });
  });

  return orders;
};

export const updateOrderStatus = async (id: string, status: OrderStatus): Promise<void> => {
  await updateDoc(doc(db, COLLECTION_NAME, id), { status });
};

export const deleteOrder = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};
