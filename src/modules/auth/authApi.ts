import { api } from "../../api";
import { TokensDto } from "./authTypes";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUpWithGoogle: builder.mutation<TokensDto, { token: string }>({
      query: (body) => ({
        url: "auth/google-sign-up",
        method: "POST",
        body,
      }),
    }),
    signOut: builder.mutation<void, void>({
      query: () => ({
        url: "auth/sign-out",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignUpWithGoogleMutation } = authApi;
