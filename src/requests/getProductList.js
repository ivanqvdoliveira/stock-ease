import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase";

export const getProducts = async ({ pageSize = 2, lastDoc = null, filterBy = 'title' } = {}) => {
  let q = query(
    collection(db, "products"),
    orderBy(filterBy),
    limit(pageSize)
  );

  if (lastDoc) {
    q = query(
      collection(db, "products"),
      orderBy(filterBy),
      startAfter(lastDoc),
      limit(pageSize)
    );
  }

  const snapshot = await getDocs(q);
  const products = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  return { products, lastVisible };
};
