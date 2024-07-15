import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser, TokensDto } from "./authTypes";
import { authApi } from "./authApi";
import { getUserFromToken, removeTokens, setTokens } from "../../utils";
import { setUser } from "./authSlice";
import { setProfile } from "../user";

export const onGoogleSignUp = createAsyncThunk<IUser | null, TokensDto>(
  "auth/onGoogleSignUp",
  async (tokens, { dispatch }) => {
    await dispatch(clearUserData());

    setTokens(tokens);
    return getUserFromToken();
  },
);

export const signOut = createAsyncThunk<void, void>(
  "auth/signOut",
  async (_, { dispatch }) => {
    await dispatch(authApi.endpoints.signOut.initiate()).unwrap();
    await dispatch(clearUserData());
  },
);

export const clearUserData = createAsyncThunk<void, void>(
  "auth/clearUserData",
  async (_, { dispatch }) => {
    removeTokens();
    dispatch(setUser(null));
    dispatch(setProfile(null));
  },
);
