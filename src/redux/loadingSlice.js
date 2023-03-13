import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: { loading: false, formLoading: false },
  reducers: {
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFormLoading: (state, action) => {
      state.formLoading = action.payload;
    }
  },
});

export const { setIsLoading, setFormLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
