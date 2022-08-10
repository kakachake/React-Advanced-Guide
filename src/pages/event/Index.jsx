import React from "react";
import { useEffect } from "react";
import { useState } from "react";
export default () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const l = new Array(10000).fill().map((_, idx) => idx + 1);
    setList(l);
  }, []);
  function handleCaptureClick(e) {
    console.log("捕获阶段", e.currentTarget);
    console.log("捕获阶段", e.target);
  }
  function handleClick(e) {
    console.log("冒泡阶段", e.currentTarget);
    // e.stopPropagation(); /* 阻止事件冒泡，handleFatherClick 事件讲不在触发 */
  }
  // function RenderList() {
  //   return (
  //     <ul>
  //       {list.map((_, idx) => {
  //         return <li key={idx}>{_}</li>;
  //       })}
  //     </ul>
  //   );
  // }

  // function renderListIdle() {}
  return (
    <div
      style={{
        background: "red",
        padding: "10px",
      }}
      onClick={handleClick}
      onClickCapture={handleCaptureClick}
    >
      <button onClick={handleClick} onClickCapture={handleCaptureClick}>
        111
      </button>
      <button>111</button>
      {/* <RenderList /> */}
    </div>
  );
};
