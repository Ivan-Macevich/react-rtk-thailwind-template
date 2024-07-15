import { RootState } from "../../store";
import { hasAccess } from "../../utils";
import { Role } from "./authConstants";
export const selectUser = (state: RootState) => state.auth.user;

export const selectIsCreator = (state: RootState) => {
  const { user } = state.auth;

  return !!user && hasAccess(user, Role.CREATOR);
};
