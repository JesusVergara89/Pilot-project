import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    config: 'data'
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setConfig: (state, action) => {
      state.config = action.payload;
    },
  },
});

export const { setConfig } = configSlice.actions;

export default configSlice.reducer;