import React from "react";
import { useEffect } from "react";

import { useMemo } from "react";
import { useState } from "react";
import Model from "./Model";

const Index = () => {
  const [visible, setVisible] = useState(false);
  const [nameShow, setNameShow] = useState(false);
  const [think, setThink] = useState("11");
  useEffect(() => {
    console.log(think);
  }, [think]);

  const handleClick = () => {
    console.log("点击");
    setVisible(!visible);
    setNameShow(!nameShow);
  };
  const [handleClose, handleOk, handleCancel] = useMemo(() => {
    const ok = () => console.log("点击确定");
    const close = () => setVisible(false);
    const cancel = () => console.log("点击取消");
    return [close, ok, cancel];
  }, []);
  return (
    <div>
      <Model
        onCancel={handleCancel}
        onClose={handleClose}
        onOk={handleOk}
        title={"《React进阶实践指南》"}
        visible={visible}
        width={700}
      >
        <input
          placeholder="写下你的感受"
          value={think}
          onChange={(e) => setThink(e.target.value)}
        />
      </Model>
      <button
        onClick={() => {
          setVisible(!visible);
          setNameShow(false);
        }}
      >
        model show
      </button>
      <button onClick={handleClick}> model show ( 显示作者 ) </button>
    </div>
  );
};

export default Index;
