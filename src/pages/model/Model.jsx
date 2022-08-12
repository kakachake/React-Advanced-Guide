import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Dialog from "./Dialog";
import ReactDOM from "react-dom";
const RenderContent = (props) => {
  const { children, content } = props;
  return React.isValidElement(content) ? content : children ? children : null;
};
const Model = (props) => {
  const {
    title,
    onOk,
    onCancel,
    cancelText,
    okText,
    footer,
    onClose,
    content,
    children,
    closeCb,
    visible,
    width,
  } = props;
  const RenderFooter = () => {
    if (footer && React.isValidElement(footer)) return footer;
    return (
      <div className="model_bottom">
        <div className="model_btn_box">
          <button className="okBtn" onClick={(e) => onOk && onOk(e)}>
            {okText || "确定"}
          </button>
          <button
            className="cancelBtn"
            onClick={(e) => onCancel && onCancel(e)}
          >
            {cancelText || "取消"}
          </button>
        </div>
      </div>
    );
  };
  const RenderTop = () => {
    return (
      <div className="model_top">
        <p>{title}</p>
        <span className="model_top_close" onClick={() => onClose && onClose()}>
          X
        </span>
      </div>
    );
  };
  const renderContent = React.isValidElement(content)
    ? content
    : children
    ? children
    : null;

  return (
    <div>
      <Dialog
        closeCb={closeCb}
        onClose={onClose}
        visible={visible}
        width={width}
      >
        <RenderTop />
        {renderContent}
        <RenderContent content={content}>{children}</RenderContent>
        <RenderFooter />
      </Dialog>
    </div>
  );
};

let ModelContainer = null;
const modelSymbol = Symbol("$$__model__container_hidden");

// Model.show = function (config) {
//   if (ModelContainer) return;
//   const props = { ...config, visible: true };
//   const container = (ModelContainer = document.createElement("div"));
//   const manager = (container[modelSymbol] = {
//     setShow: null,
//     mounted: false,
//     hidden() {
//       const { setShow } = manager;
//       setShow && setShow(false);
//     },
//     destory() {
//       ReactDOM.unmountComponentAtNode(container);
//       document.body.removeChild(container);
//       ModelContainer = null;
//     },
//   });
//   const ModelApp = (props) => {
//     const [show, setShow] = useState(false);
//     manager.setShow = setShow;
//     const { visible, ...trueProps } = props;
//     useEffect(() => {
//       manager.mounted = true;
//       setShow(visible);
//     }, []);
//     return (
//       <Model
//         {...trueProps}
//         closeCb={() => manager.mounted && manager.destory()}
//         visible={show}
//       ></Model>
//     );
//   };
//   document.body.appendChild(container);
//   ReactDOM.render(<ModelApp {...props} />, container);
//   return manager;
// };

Model.show = (config) => {
  if (ModelContainer) return;
  const container = (ModelContainer = document.createElement("div"));
  const props = { ...config, visible: true };
  const manager = (ModelContainer[modelSymbol] = {
    setShow: null,
    mounted: false,
    hidden() {
      this.setShow && this.setShow(false);
    },
    destory() {
      ReactDOM.unmountComponentAtNode(ModelContainer);
      document.body.removeChild(container);
      ModelContainer = null;
    },
  });
  const ModelApp = (props) => {
    const [show, setShow] = useState(false);
    manager.setShow = setShow;
    const { visible, ...trueProps } = props;
    useEffect(() => {
      manager.mounted = true;
      setShow(visible);
    }, []);
    return (
      <Model
        {...trueProps}
        visible={show}
        closeCb={() => manager.mounted && manager.destory()}
      />
    );
  };
  console.log(container);
  document.body.appendChild(container);
  ReactDOM.render(<ModelApp {...props} />, container);
  return manager;
};

Model.hidden = function () {
  if (!ModelContainer) return;
  ModelContainer[modelSymbol] && ModelContainer[modelSymbol].hidden();
};

export default Model;
