import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCXJwxygqRdKYACT-j42RqKeCbIjO9Iwls",
  authDomain: "stock-easy-b7f35.firebaseapp.com",
  projectId: "stock-easy-b7f35",
  storageBucket: "stock-easy-b7f35.firebasestorage.app",
  messagingSenderId: "138998326799",
  appId: "1:138998326799:web:2d67aab6e74b7f60e5257a",
  measurementId: "G-TD9251HD2X"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default app;
export { db, storage };
