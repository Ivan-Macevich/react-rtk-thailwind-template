import { api } from "../../api";
import { ProfileDto } from "./userTypes";

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    findProfile: builder.query<ProfileDto, void>({
      query: () => `users/profile`,
    }),
  }),
});

export const { useFindProfileQuery } = userApi;
