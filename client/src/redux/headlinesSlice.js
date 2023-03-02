import { createSlice } from "@reduxjs/toolkit";

export const headlinesSlice = createSlice({
  name: "headlines",
  initialState: {headlines: []},
  reducers: {
    setHeadlines: (state, action) => {
       state.headlines = action.payload;
    },
  },
});

export const { setHeadlines } = headlinesSlice.actions;

export default headlinesSlice.reducer;
