import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export const getProducts = async () => {
  const productsCol = collection(db, "products");
  const productsSnapshot = await getDocs(productsCol);
  return productsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
