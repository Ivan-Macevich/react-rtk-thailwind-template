import { AppRoute } from "../constants";

export type AppLink = LinkWithCallback | LinkWithRoute;
export type Link = { label: string };

export type LinkWithCallback = Link & { callback: () => void };
export type LinkWithRoute = Link & { route: AppRoute };
