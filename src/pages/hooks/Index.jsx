import React from "react";
import { useAsyncState } from "./useAsyncState";
import { useDebounce } from "./useDebounce";

const Hooks = () => {
  const [value, setValue] = useDebounce("", 400);
  const [asyncValue, setAsyncValue] = useAsyncState("");
  console.log(value);
  return (
    <div>
      <input type="text" onChange={(e) => setValue(e.target.value)} />
      <input
        type="text"
        value={asyncValue.current}
        onChange={(e) => {
          setAsyncValue(e.target.value);
          console.log(asyncValue.current);
        }}
      />
    </div>
  );
};

export default Hooks;
