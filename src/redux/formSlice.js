import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: { loginOpen: false, createUserOpen: false },
  reducers: {
    setLogin: (state, action) => {
      state.loginOpen = action.payload;
    },
    setCreateUser: (state, action) => {
      state.createUserOpen = action.payload;
    }
  },
});

export const { setLogin, setCreateUser } = formSlice.actions;

export default formSlice.reducer;
