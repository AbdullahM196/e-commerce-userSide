import { createSlice } from "@reduxjs/toolkit";

const isAuth = createSlice({
  name: "isAuthenticated",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});
export const { setAuthenticated } = isAuth.actions;
export const selectAuthStatus = (state) =>
  state.isAuthenticated.isAuthenticated;
export default isAuth.reducer;
