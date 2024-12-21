import { configureStore } from "@reduxjs/toolkit";
import configSlice from "./slices/configSlice";

export default configureStore({
  reducer: {
    config: configSlice,
  },
});
