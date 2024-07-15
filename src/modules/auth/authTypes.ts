import { Role } from "./authConstants";

export interface IUser {
  id: string;
  roles: Role[];
  isRegistrationFinished: boolean;
}

export interface TokensDto {
  accessToken: string;
  refreshToken: string;
}
