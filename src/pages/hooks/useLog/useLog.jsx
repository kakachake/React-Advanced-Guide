import React from "react";

export const LogContext = React.createContext({});

export default function useLog() {
  // 公共参数
  const message = React.useContext(LogContext);
  const listenDOM = React.useRef(null);

  const reportMessage = React.useCallback(
    function (data, type) {
      if (type === "pv") {
        console.log("组件pv上报", message);
      } else if (type === "click") {
        console.log("组件click上报", message, data);
      }
    },
    [message]
  );

  React.useEffect(() => {
    const handleClick = function (e) {
      reportMessage(e.target, "click");
    };
    if (listenDOM.current) {
      listenDOM.current.addEventListener("click", handleClick);
    }
    return function () {
      listenDOM.current &&
        listenDOM.current.removeEventListener("click", handleClick);
    };
  }, [reportMessage]);
  return [listenDOM, reportMessage];
}
