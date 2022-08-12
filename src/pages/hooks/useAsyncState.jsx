import React from "react";
import { useState } from "react";
export const useAsyncState = (defaultValue) => {
  const value = React.useRef(defaultValue);
  const [, forceUpdate] = useState(null);
  const dispatch = (fn) => {
    let newValue;
    if (typeof fn === "function") {
      newValue = fn(value.current);
    } else {
      newValue = fn;
    }
    value.current = newValue;
    forceUpdate({});
  };
  return [value, dispatch];
};
