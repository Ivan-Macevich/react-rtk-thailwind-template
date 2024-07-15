import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "./userApi";
import { ProfileDto } from "./userTypes";

export const findProfile = createAsyncThunk<ProfileDto, void>(
  "user/findProfile",
  async (_, { dispatch }) => {
    return await dispatch(userApi.endpoints.findProfile.initiate()).unwrap();
  }
);
