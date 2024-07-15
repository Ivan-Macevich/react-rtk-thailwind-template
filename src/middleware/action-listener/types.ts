import {
  ListenerEffect,
  MatchFunction,
  TypedActionCreator,
} from "@reduxjs/toolkit/dist/listenerMiddleware/types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export type Effect = ListenerEffect<
  { type: string; error?: any; payload?: any },
  unknown,
  ThunkDispatch<unknown, unknown, AnyAction>
>;

export type Handler = HandlerWithCreator | HandlerWithMatcher;

export type HandlerWithCreator = {
  actionCreator: TypedActionCreator<any>;
  effect: Effect;
};

export type HandlerWithMatcher = {
  matcher: MatchFunction<AnyAction>;
  effect: Effect;
};
