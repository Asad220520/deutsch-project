import { createSlice } from "@reduxjs/toolkit";
import { loadDictionaryFromFirebase } from "./dictionaryThunks";

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState: {
    words: [],
    loading: false,
    error: null,
    lastAdded: null, // ✅ добавлено
  },
  reducers: {
    addWords: (state, action) => {
      const newWords = action.payload;
      newWords.forEach((w) => {
        if (!state.words.find((dw) => dw.word === w.word)) {
          state.words.push(w);
        }
      });
    },
    removeWord: (state, action) => {
      const id = action.payload;
      state.words = state.words.filter((w) => w.id !== id);
    },
    setLastAdded: (state, action) => {
      state.lastAdded = action.payload;
    },
    clearLastAdded: (state) => {
      state.lastAdded = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadDictionaryFromFirebase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadDictionaryFromFirebase.fulfilled, (state, action) => {
        state.loading = false;

        const newWords = action.payload || [];
        state.words = [...state.words, ...newWords].filter(
          (word, index, self) =>
            index ===
            self.findIndex((w) => w.id === word.id || w.word === word.word)
        );
      })
      .addCase(loadDictionaryFromFirebase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {
  addWords,
  removeWord,
  setLastAdded,
  clearLastAdded, // ✅ экспортируем
} = dictionarySlice.actions;

export const selectDictionaryWords = (state) => state.dictionary.words;
export const selectDictionaryLoading = (state) => state.dictionary.loading;
export const selectDictionaryError = (state) => state.dictionary.error;
export const selectLastAddedWord = (state) => state.dictionary.lastAdded; // ✅ селектор

export default dictionarySlice.reducer;
