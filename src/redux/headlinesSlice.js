import { createSlice } from "@reduxjs/toolkit";

export const headlinesSlice = createSlice({
  name: "headlines",
  initialState: { headlines: [] },
  reducers: {
    setHeadlines: (state, action) => {
      state.headlines = action.payload;
    },
    appendHeadlines: (state, action) => {
      const newHeadlines = action.payload.filter((headline) => {
        return !state.headlines.some((h) => h.title === headline.title);
      })
      state.headlines = [...state.headlines, ...newHeadlines];
    }
  },
});

export const { setHeadlines, appendHeadlines } = headlinesSlice.actions;

export default headlinesSlice.reducer;
