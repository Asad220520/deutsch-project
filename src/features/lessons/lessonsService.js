import { db } from "../../services/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  serverTimestamp,
  query,
  orderBy,
  addDoc,
} from "firebase/firestore";

export const fetchLessons = async () => {
  const q = query(collection(db, "lessons"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
    };
  });
};

export const createLesson = async (lesson) => {
  const docRef = await addDoc(collection(db, "lessons"), {
    ...lesson,
    createdAt: serverTimestamp(),
  });
  return {
    id: docRef.id,
    ...lesson,
    createdAt: new Date().toISOString(), // текущая дата в формате строки
  };
};

export const fetchLessonById = async (id) => {
  const docRef = doc(db, "lessons", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null,
    };
  }
  return null;
};
