import React from "react";
import { ReduxContext, useCreateStore } from "./useCreateStore";
import { useConnect } from "./useConnect";
import { Input, Button } from "antd";

function CompA() {
  const [state, dispatch] = useConnect((state) => state.mesA);

  return (
    <div
      style={{
        border: "1px solid #000",
      }}
    >
      <div>A组件</div>
      组件B对我说：{state}
      <div>
        <Input
          onChange={(e) =>
            dispatch({
              type: "setB",
              payload: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
function CompB() {
  const [state, dispatch] = useConnect((state) => state.mesB);

  return (
    <div
      style={{
        border: "1px solid #000",
      }}
    >
      <div>B组件</div>
      组件A对我说：{state}
      <div>
        <Input
          onChange={(e) =>
            dispatch({
              type: "setA",
              payload: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
function CompC() {
  const [state] = useConnect((state) => state);

  return (
    <div
      style={{
        border: "1px solid #000",
      }}
    >
      <div>C组件</div>
      <div>组件A：{state.mesA}</div>
      <div>组件B：{state.mesB}</div>
    </div>
  );
}

function CompD() {
  const [, dispatch] = useConnect();
  return (
    <div>
      <Button
        onClick={() =>
          dispatch({
            type: "clear",
          })
        }
      >
        清空
      </Button>
    </div>
  );
}

function Index() {
  const [isShow, setShow] = React.useState(true);
  return (
    <div>
      <CompA />
      <CompB />
      <CompC />
      <CompD />
    </div>
  );
}

export default function Root() {
  const store = useCreateStore(
    function (state, action) {
      const { type, payload } = action;
      if (type === "setA") {
        return {
          ...state,
          mesA: payload,
        };
      } else if (type === "setB") {
        return {
          ...state,
          mesB: payload,
        };
      } else if (type === "clear") {
        //清空
        return { mesA: "", mesB: "" };
      } else {
        return state;
      }
    },
    {
      mesA: "mesA",
      mesB: "mesB",
    }
  );
  return (
    <div>
      <ReduxContext.Provider value={store}>
        <Index />
      </ReduxContext.Provider>
    </div>
  );
}
