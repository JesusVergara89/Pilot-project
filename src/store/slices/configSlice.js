import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "sesion",
  initialState: { config: false }, 
  reducers: {
    openConfig: (state) => {
      state.config = true;  
    },
    closeConfig: (state) => {
      state.config = false; 
    },
    toggleConfig: (state) => {
      state.config = !state.config; 
    },
  },
});

export const { openConfig, closeConfig, toggleConfig } = configSlice.actions;

export default configSlice.reducer;
