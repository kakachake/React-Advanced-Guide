import React from "react";
import { useState } from "react";
import useLog, { LogContext } from "./useLog";

function Home() {
  const [dom, reportMessage] = useLog();
  return (
    <div>
      <div ref={dom}>
        <p> 《React进阶实践指南》</p>
        <button> 按钮 one (内部点击) </button>
        <button> 按钮 two (内部点击) </button>
        <button> 按钮 three (内部点击) </button>
      </div>
      <button
        onClick={() => {
          console.log(reportMessage);
        }}
      >
        外部点击
      </button>
    </div>
  );
}

const MemoHome = React.memo(Home);

export default function Root() {
  const [value, setValue] = useState({});
  return (
    <LogContext.Provider value={value}>
      <MemoHome />
      <button
        onClick={() =>
          setValue({ name: "《React进阶实践指南》", author: "我不是外星人" })
        }
      >
        设置数据
      </button>
    </LogContext.Provider>
  );
}
