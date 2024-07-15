import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { configReducer } from "../modules/config";
import { authReducer } from "../modules/auth";
import { actionListenerMiddleware, rtkQueryErrorHandler } from "../middleware";
import { api } from "../api";
import { userReducer } from "../modules/user";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    config: configReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      actionListenerMiddleware.middleware,
      rtkQueryErrorHandler
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
