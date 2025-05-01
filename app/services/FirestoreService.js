import { firestore } from "../factory/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const firestoreService = {
  getCollection: (collectionName) => collection(firestore, collectionName),
  find: () => {},
  findAll: async (collectionName) => {
    const collectionRef = collection(firestore, collectionName);
    const snapshot = await getDocs(collectionRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
  insert: async (collectionName, data) => {
    const collectionRef = collection(firestore, collectionName);
    const docRef = await addDoc(collectionRef, data);

    const dataWithId = {
      ...data,
      id: docRef.id,
    };

    return dataWithId;
  },
  update: async (collectionName, id, data) => {
    const docRef = doc(firestore, collectionName, id);
    await updateDoc(docRef, data);
    return { id, ...data };
  },

  delete: async (collectionName, id) => {
    const docRef = doc(firestore, collectionName, id);
    return await deleteDoc(docRef);
  },
};

export default firestoreService;
