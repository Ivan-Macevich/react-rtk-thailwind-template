export const UserType = {
  PROFESSIONAL: "PROFESSIONAL",
  COMPANY: "COMPANY",
} as const;

export type UserType = (typeof UserType)[keyof typeof UserType];

export const Audience = {
  ...UserType,
  BOTH: "BOTH",
} as const;

export type Audience = (typeof Audience)[keyof typeof Audience];
