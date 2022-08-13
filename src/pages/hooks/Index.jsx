import React from "react";
import { useAsyncState } from "./useAsyncState";
import { useDebounce } from "./useDebounce";
import UseLogExample from "./useLog/example";
import UseQueryTableExample from "./useQueryTable/example";
import UseReduxExample from "./useRedux/Example";

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
      <UseLogExample />
      <UseQueryTableExample />
      <UseReduxExample />
    </div>
  );
};

export default Hooks;
