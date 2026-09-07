import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Product } from "@/context/CartContext";

const COLLECTION_NAME = "products";

export const uploadToImgBB = async (file: File): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!apiKey) throw new Error("ImgBB API key is missing");

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (data.success) {
    return data.data.url;
  } else {
    throw new Error("Failed to upload image to ImgBB");
  }
};

export const addProduct = async (productData: Omit<Product, "id" | "images">, imageFiles: File[]): Promise<string> => {
  const imageUrls: string[] = [];
  
  for (const file of imageFiles) {
    const url = await uploadToImgBB(file);
    imageUrls.push(url);
  }

  // Firebase não aceita 'undefined', então removemos propriedades undefined
  const cleanData = Object.fromEntries(
    Object.entries(productData).filter(([_, v]) => v !== undefined)
  );

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...cleanData,
    images: imageUrls,
    createdAt: new Date().toISOString()
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
      images: data.images || [data.image].filter(Boolean), // Suporte a produtos antigos com 'image'
      stock: Number(data.stock),
      isReadyDelivery: Boolean(data.isReadyDelivery),
      leadTimeDays: data.leadTimeDays ? Number(data.leadTimeDays) : undefined
    });
  });
  return products;
};

export const deleteProduct = async (id: string): Promise<void> => {
  // Com ImgBB não apagamos a imagem da nuvem automaticamente, mas apagamos o registro do banco
  await deleteDoc(doc(db, COLLECTION_NAME, id));
};
