import { createSlice } from "@reduxjs/toolkit";
import { init } from "./configThunks";

export interface ConfigState {
  isInitialized: boolean;
}

const initialState: ConfigState = {
  isInitialized: false,
};

export const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(init.fulfilled, (state) => {
      state.isInitialized = true;
    });
  },
});
export const configReducer = configSlice.reducer;
