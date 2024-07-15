import { createApi, QueryStatus } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { RootState } from "../store";

export function selectIsLoading({ api }: RootState) {
  return Object.values({ ...api.mutations, ...api.queries }).some((request) => {
    return request && request.status === QueryStatus.pending;
  });
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  tagTypes: ["File"],
  endpoints: () => ({}),
});
