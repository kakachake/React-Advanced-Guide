import React from "react";
import { ReduxContext } from "./useCreateStore";

export function shallowEqual(objA, objB) {
  // 如果两个obj
  if (Object.is(objA, objB)) {
    return true;
  }
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (let i = 0; i < keysA.length; i++) {
    if (
      // 尽量不要直接在对象中使用hasOwnProperty，因为此方法可能被重写
      !Object.hasOwnProperty.call(objB, keysA[i]) ||
      !Object.is(objA[keysA[i]], objB[keysB[i]])
    ) {
      return false;
    }
  }
  return true;
}

export function useConnect(mapStoreToState = () => {}) {
  // 获取ReduxHooksStore实例暴露的参数
  const contextValue = React.useContext(ReduxContext);
  const { getInitState, subscribe, unSubscribe, dispatch } = contextValue;

  // 用于传递给业务组件的state
  const stateValue = React.useRef(getInitState(mapStoreToState));

  // 渲染函数
  const [, forceUpdate] = React.useState();

  const connectValue = React.useMemo(() => {
    const state = {
      cacheState: stateValue.current,
      update: function (newState) {
        const selectState = mapStoreToState(newState);
        const isEqual = shallowEqual(state.cacheState, selectState);
        state.cacheState = selectState;
        stateValue.current = selectState;
        if (!isEqual) {
          // 如果不相等，则触发该组件的强制更新
          forceUpdate({});
        }
      },
    };
    return state;
  }, [contextValue]);

  React.useEffect(() => {
    const name = subscribe(connectValue);
    return function () {
      unSubscribe(name);
    };
  }, [connectValue]);

  return [stateValue.current, dispatch];
}
