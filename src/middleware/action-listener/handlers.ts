import { Handler } from "./types";
import { isAnyOf, isRejected } from "@reduxjs/toolkit";
import { onGoogleSignUp } from "../../modules/auth";
import { findProfile, setProfile } from "../../modules/user";

export const handlers: Handler[] = [
  {
    matcher: isRejected,
    effect: async (action) => {
      console.log("Rejected", action);
    },
  },
  {
    matcher: isAnyOf(onGoogleSignUp.fulfilled),
    effect: async (action, { dispatch }) => {
      dispatch(action.payload ? findProfile() : setProfile(null));
    },
  },
];
