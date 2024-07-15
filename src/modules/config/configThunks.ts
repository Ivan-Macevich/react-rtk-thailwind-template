import { createAsyncThunk } from "@reduxjs/toolkit";
import { setUser } from "../auth";
import { getUserFromToken } from "../../utils";
import { findProfile } from "../user";

export const init = createAsyncThunk<void, void>(
  "config/init",
  async (_, { dispatch }) => {
    const user = getUserFromToken();
    if (!user) return;

    dispatch(setUser(user));
    dispatch(findProfile());
  },
);
