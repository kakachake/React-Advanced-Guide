import React from "react";
const Select = ({ children, ...props }) => {
  return (
    <select>
      <option value="" label={props.placeholder}>
        {props.placeholder}
      </option>
      {children}
    </select>
  );
};
Select.Option = (props) => {
  return <option {...props} label={props.children}></option>;
};
export default Select;
