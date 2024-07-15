export const Role = {
  USER: "USER",
  CREATOR: "CREATOR",
  ADMIN: "ADMIN",
};

export type Role = (typeof Role)[keyof typeof Role];
