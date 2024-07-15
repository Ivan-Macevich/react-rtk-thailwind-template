import { api } from "../../api";
import {
  AdditionalInfo,
  AdditionalInfoForm,
  Genre,
  IndustryRole,
  Pitch,
  PitchForm,
} from "./pitchTypes";

export const pitchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    findGenres: builder.query<Genre[], void>({
      query: () => `pitch/genres`,
    }),
    findRoles: builder.query<IndustryRole[], void>({
      query: () => `pitch/roles`,
    }),
    findMatchmakingPitches: builder.query<Pitch[], void>({
      query: () => ({
        url: "pitch",
        method: "GET",
        body: { asd: "" },
      }),
    }),
    findAdditionalInfo: builder.query<AdditionalInfo | null, void>({
      query: () => "pitch/additional-info",
    }),
    addAdditionalInfo: builder.mutation<void, AdditionalInfoForm>({
      query: (form) => ({
        url: "pitch/additional-info",
        method: "PUT",
        body: form,
      }),
    }),
    sendPitch: builder.mutation<void, PitchForm>({
      query: (form) => ({
        url: "pitch",
        method: "PUT",
        body: form,
      }),
    }),
  }),
});

export const {
  useFindGenresQuery,
  useFindRolesQuery,
  useFindAdditionalInfoQuery,
  useAddAdditionalInfoMutation,
  useSendPitchMutation,
  useFindMatchmakingPitchesQuery,
} = pitchApi;
