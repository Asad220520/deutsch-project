// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import lessonsReducer from "../features/lessons/lessonsSlice";
import dictionaryReducer from "../features/dictionary/store/dictionarySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lessons: lessonsReducer,
    dictionary: dictionaryReducer,
  },
});
