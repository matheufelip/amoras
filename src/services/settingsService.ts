import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const SETTINGS_DOC_ID = "home";
const COLLECTION_NAME = "settings";

export interface ArtisanSettings {
  artisanName: string;
  artisanStory: string;
  artisanPhoto: string;
}

export const getSettings = async (): Promise<ArtisanSettings | null> => {
  const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as ArtisanSettings;
  } else {
    return null;
  }
};

export const saveSettings = async (settings: ArtisanSettings): Promise<void> => {
  const docRef = doc(db, COLLECTION_NAME, SETTINGS_DOC_ID);
  await setDoc(docRef, settings, { merge: true });
};
