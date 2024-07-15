import { IUser, Role, TokensDto } from "../modules/auth";
import isEmpty from "is-empty-typed";
import { jwtDecode } from "jwt-decode";
import { LocalStorage } from "../constants";

export function isCreator(user: Omit<IUser, "type"> | null): boolean {
  return hasAccess(user, Role.CREATOR);
}

export function isAdmin(user: Omit<IUser, "type"> | null): boolean {
  return hasAccess(user, Role.ADMIN);
}

export function hasAccess(
  user: Omit<IUser, "type"> | null,
  role: Role | Role[] = [],
): boolean {
  const roles = ([] as Role[]).concat(role);

  return (
    isEmpty(roles) ||
    !!(user && user.roles.some((role) => roles.includes(role)))
  );
}

export function getUserFromToken(): IUser | null {
  const accessToken = localStorage.getItem(LocalStorage.ACCESS_TOKEN);

  if (!accessToken) return null;

  return jwtDecode<IUser>(accessToken);
}

export function setTokens({ accessToken, refreshToken }: TokensDto): void {
  localStorage.setItem(LocalStorage.ACCESS_TOKEN, accessToken);
  localStorage.setItem(LocalStorage.REFRESH_TOKEN, refreshToken);
}

export function removeTokens(): void {
  localStorage.removeItem(LocalStorage.ACCESS_TOKEN);
  localStorage.removeItem(LocalStorage.REFRESH_TOKEN);
}
