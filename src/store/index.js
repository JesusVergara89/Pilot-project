import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import configReducer from "./slices/configSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, configReducer);

const store = configureStore({
  reducer: {
    config: persistedReducer, 
  },
});

export const persistor = persistStore(store); 
export default store;
