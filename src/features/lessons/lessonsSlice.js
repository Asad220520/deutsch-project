// src/features/lessons/lessonsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const lessonsSlice = createSlice({
  name: "lessons",
  initialState: {
    lessons: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLessons: (state, action) => {
      state.lessons = action.payload;
    },
    addLesson: (state, action) => {
      state.lessons.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLessons, addLesson, setLoading, setError } =
  lessonsSlice.actions;
export default lessonsSlice.reducer;
