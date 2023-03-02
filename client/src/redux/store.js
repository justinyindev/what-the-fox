import { configureStore } from "@reduxjs/toolkit";
import headlinesReducer from "./headlinesSlice";
import loadingReducer from "./loadingSlice";

export const store = configureStore({
  reducer: {
    headlines: headlinesReducer,
    loading: loadingReducer,
  },
});
