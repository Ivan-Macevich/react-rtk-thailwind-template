import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { IUser, setUser, TokensDto } from "../modules/auth";
import { paramsSerializer, removeTokens, setTokens } from "../utils";
import { prepareHeaders } from "./prepareHeaders";
import { API_URL } from "./constants";
import { LocalStorage } from "../constants";
import { jwtDecode } from "jwt-decode";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  paramsSerializer,
  prepareHeaders,
});

function isUnauthorized(response: any): boolean {
  return response.error?.status === 401;
}

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let response = await baseQuery(args, api, extraOptions);

  if (isUnauthorized(response)) {
    if (mutex.isLocked()) {
      await mutex.waitForUnlock();
      response = await baseQuery(args, api, extraOptions);
    } else {
      await mutex.runExclusive(tryRefreshingTokens);
    }
  }
  return response;

  async function tryRefreshingTokens(): Promise<void> {
    const refreshToken = localStorage.getItem(LocalStorage.REFRESH_TOKEN);

    const refreshResponse = await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
        body: {
          refreshToken,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResponse.error) {
      api.dispatch(setUser(null));
      removeTokens();
    } else {
      setTokens(refreshResponse.data as TokensDto);
      api.dispatch(
        setUser(
          jwtDecode<IUser>((refreshResponse.data as TokensDto).accessToken),
        ),
      );
      response = await baseQuery(args, api, extraOptions);
    }
  }
};
