import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";

export const rtkQueryErrorHandler: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const message: string | string[] | undefined =
      action.payload?.data?.message;

    if (message) {
      // showError(isString(message) ? message : message.join(', '));
    }
  }

  return next(action);
};
