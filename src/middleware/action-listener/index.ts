import { ListenerMiddlewareInstance } from "@reduxjs/toolkit/dist/listenerMiddleware/types";
import { createListenerMiddleware } from "@reduxjs/toolkit";
import { handlers } from "./handlers";

function createActionListenerMiddleware(
  middleware = createListenerMiddleware()
): ListenerMiddlewareInstance {
  handlers.forEach((handler) => {
    "matcher" in handler
      ? middleware.startListening(handler)
      : middleware.startListening(handler);
  });

  return middleware;
}

export const actionListenerMiddleware = createActionListenerMiddleware();
