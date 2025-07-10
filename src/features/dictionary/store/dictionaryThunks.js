import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../../../services/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Загрузка словаря
export const loadDictionaryFromFirebase = createAsyncThunk(
  "dictionary/load",
  async (_, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) return rejectWithValue("Требуется авторизация");

      const ref = collection(db, "users", user.uid, "dictionary");
      const snapshot = await getDocs(ref);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate()?.toISOString(),
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Добавление слова
export const addWordToFirebase = createAsyncThunk(
  "dictionary/add",
  async (wordData, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) return rejectWithValue("Требуется авторизация");

      const ref = collection(db, "users", user.uid, "dictionary");
      const docRef = await addDoc(ref, {
        ...wordData,
        createdAt: new Date(),
      });

      return {
        id: docRef.id,
        ...wordData,
        createdAt: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Удаление слова
export const deleteWordFromFirebase = createAsyncThunk(
  "dictionary/delete",
  async (wordId, { rejectWithValue }) => {
    try {
      const user = auth.currentUser;
      if (!user) return rejectWithValue("Требуется авторизация");

      await deleteDoc(doc(db, "users", user.uid, "dictionary", wordId));
      return wordId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
