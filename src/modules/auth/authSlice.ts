import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./authTypes";
import { onGoogleSignUp, signOut } from "./authThunks";

interface AuthState {
  user: IUser | null;
}

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(isAnyOf(onGoogleSignUp.fulfilled), (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(isAnyOf(signOut.fulfilled), (state) => {
      state.user = null;
    });
  },
});

export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
