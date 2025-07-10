import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true, // <-- Важно! Ждём, пока Firebase скажет, есть ли пользователь
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token"); // можно оставить, если ты используешь токен
    },
  },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
