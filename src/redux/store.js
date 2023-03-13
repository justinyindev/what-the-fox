import { configureStore } from "@reduxjs/toolkit";
import headlinesReducer from "./headlinesSlice";
import loadingReducer from "./loadingSlice";
import formReducer from "./formSlice";

export const store = configureStore({
  reducer: {
    headlines: headlinesReducer,
    loading: loadingReducer,
    form: formReducer,
  },
});
