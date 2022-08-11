import React from "react";
const Message = ({ status, message, required, name, value }) => {
  let showMessage = "";
  let color = "#fff";
  if (required && !value && status === "reject") {
    showMessage = `${name} 为必填项`;
  } else if (status === "reject") {
    showMessage = message;
  } else if (status === "pending") {
    showMessage = null;
  } else if (status === "resolve") {
    showMessage = "校验通过";
  }
  return <div>{showMessage}</div>;
};

export default Message;
