import { LinkWithRoute } from "../types";

export const LocalStorage = {
  REFRESH_TOKEN: "REFRESH_TOKEN",
  ACCESS_TOKEN: "ACCESS_TOKEN",
};

export type LocalStorage = (typeof LocalStorage)[keyof typeof LocalStorage];

export const AppRoute = {
  Root: "/",
  Pitches: "/pitches",
  Login: "/login",
  AdditionalInfo: "/additional-info",
  CreatePitch: "/create-pitch",
  NotFound: "/not-found",
  Wildcard: "/*",
};

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute];

export const navigationLinks: LinkWithRoute[] = [
  { label: "Send Pitch", route: AppRoute.CreatePitch },
  { label: "Review Pitches", route: AppRoute.Pitches },
  { label: "Pitch History", route: AppRoute.NotFound },
];

export const userLinks: LinkWithRoute[] = [
  { label: "Profile Information", route: AppRoute.AdditionalInfo },
  { label: "Payments", route: AppRoute.NotFound },
  { label: "Contact Us", route: AppRoute.NotFound },
];
