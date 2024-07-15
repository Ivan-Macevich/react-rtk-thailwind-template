import { Role } from "../auth";

export type ProfileDto = {
  id: string;
  address: string;
  roles: Role[];
  avatar: string | null;
  background: string | null;
  username: string | null;
  fullName: string | null;
  email: string | null;
  emailForNotifications: string | null;
  bio: string | null;
  website: string | null;
  instagram: string | null;
  spotify: string | null;
  facebook: string | null;
  twitter: string | null;
  discord: string | null;
  imdb: string | null;
  isEmailConfirmed: boolean;
  emailConfirmationCode: string | null;
};
