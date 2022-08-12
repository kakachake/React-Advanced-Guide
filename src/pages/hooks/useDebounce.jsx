import { useState } from "react";

const debounce = (cb, time) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      cb.call(this, ...args);
    }, time);
  };
};

export const useDebounce = (defaultValue, time) => {
  const [value, setValue] = useState("");
  const newChange = debounce(setValue, time);
  return [value, newChange];
};
