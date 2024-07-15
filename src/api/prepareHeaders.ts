import { LocalStorage } from "../constants";

export const prepareHeaders = (headers: Headers) => {
  const token = localStorage.getItem(LocalStorage.ACCESS_TOKEN);

  if (token) {
    headers.set("authorization", `Bearer ${token}`);
  }

  return headers;
};
