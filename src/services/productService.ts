import { db, storage } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { Product } from "@/context/CartContext";

const COLLECTION_NAME = "products";

export const uploadProductImage = async (file: File): Promise<string> => {
  const fileRef = ref(storage, `products/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  return await getDownloadURL(fileRef);
};

export const addProduct = async (productData: Omit<Product, "id">, imageFile?: File): Promise<string> => {
  let imageUrl = "";
  if (imageFile) imageUrl = await uploadProductImage(imageFile);
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...productData, image: imageUrl, createdAt: new Date().toISOString()
  });
  return docRef.id;
};

export const getProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  const products: Product[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    products.push({
      id: doc.id,
      name: data.name,
      price: Number(data.price),
      description: data.description,
      category: data.category,
      image: data.image,
      stock: Number(data.stock),
      isReadyDelivery: Boolean(data.isReadyDelivery),
      leadTimeDays: data.leadTimeDays ? Number(data.leadTimeDays) : undefined
    });
  });
  return products;
};

export const deleteProduct = async (id: string, imageUrl?: string): Promise<void> => {
  await deleteDoc(doc(db, COLLECTION_NAME, id));
  if (imageUrl) {
    try { await deleteObject(ref(storage, imageUrl)); } catch (e) { console.error(e); }
  }
};
