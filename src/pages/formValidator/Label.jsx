import React from "react";

const Label = ({ children, label, labelWidth, required, height }) => {
  return (
    <div>
      <div>
        <div>{required ? <span>*</span> : ""}</div>
        {label}
      </div>
      {children}
    </div>
  );
};
export default Label;
