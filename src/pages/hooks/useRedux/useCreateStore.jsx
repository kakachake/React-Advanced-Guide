import React from "react";
import { ReduxHooksStore } from "./ReduxHooksStore";

export const ReduxContext = React.createContext(null);

export function useCreateStore(reducer, initState) {
  const store = React.useRef(null);
  if (!store.current) {
    store.current = new ReduxHooksStore(reducer, initState).exportStore();
  }
  return store.current;
}
