import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "sesion",
  initialState: { config: false }, 
  reducers: {
    toggleConfig: (state) => {
      state.config = !state.config; 
    },
  },
});

export const { toggleConfig } = configSlice.actions; 

export default configSlice.reducer;
