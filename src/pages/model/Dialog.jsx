import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import { useState } from "react";
import "./Index.css";

const controlShow = (f1, f2, value, timer) => {
  f1(value);
  return setTimeout(() => {
    f2(value);
  }, timer);
};
const RenderChildren = (props) => {
  const { children } = props;
  console.log(111);
  return ReactDOM.createPortal(children, document.body);
};
const Dialog = (props) => {
  const { onClose, width, children } = props;
  const { visible, closeCb } = props;
  const [modelShow, setModelShow] = useState(visible);
  const [modelShowAync, setModelShowAync] = useState(visible);

  useEffect(() => {
    let timer;
    if (visible) {
      // 显示弹窗，先渲染弹窗，再进行动画
      timer = controlShow(setModelShow, setModelShowAync, visible, 30);
    } else {
      // 关闭弹窗，先运行动画，再关闭弹窗
      timer = controlShow(setModelShowAync, setModelShow, visible, 1000);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [visible]);
  useEffect(() => {
    !modelShow && typeof closeCb === "function" && closeCb();
  }, [modelShow]);
  const content = (
    <div style={{ display: modelShow ? "block" : "none" }}>
      <div
        className="model_container"
        style={{ opacity: modelShowAync ? 1 : 0 }}
      >
        <div className="model_wrap">
          <div style={{ width: width + "px" }}>{children}</div>
        </div>
      </div>
      <div
        className="model_container mast"
        onClick={() => onClose && onClose()}
        style={{ opacity: modelShowAync ? 0.6 : 0 }}
      />
    </div>
  );
  return (
    <>
      <RenderChildren modelShow={modelShow} modelShowAync={modelShowAync}>
        {content}
      </RenderChildren>
    </>
  );
};

export default Dialog;
