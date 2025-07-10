import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  words: [], // список слов [{ id, word, translation, type }]
};

const dictionarySlice = createSlice({
  name: "dictionary",
  initialState,
  reducers: {
    addWord: {
      reducer(state, action) {
        state.words.push(action.payload);
      },
      prepare(word, translation, type) {
        return {
          payload: {
            id: nanoid(),
            word,
            translation,
            type,
          },
        };
      },
    },
    removeWord(state, action) {
      state.words = state.words.filter((word) => word.id !== action.payload);
    },
    clearDictionary(state) {
      state.words = [];
    },
  },
});

export const { addWord, removeWord, clearDictionary } = dictionarySlice.actions;

export default dictionarySlice.reducer;
