import { useState } from "react";
import { isValidElement } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import React, { useMemo } from "react";
import FormContext from "./FormContext";
import Label from "./Label";
import Message from "./Message";

const FormItem = ({
  name,
  children,
  label,
  height = 50,
  labelWidth,
  required = false,
  rules = {},
  trigger = "onChange",
  validateTrigger = "onChange",
}) => {
  const formInstance = useContext(FormContext);
  const { registerValidateFields, dispatch, unRegisterValidate } = formInstance;
  const [, forceUpdate] = useState({});
  const onStoreChange = useMemo(() => {
    return {
      changeValue() {
        forceUpdate({});
      },
    };
  }, [formInstance]);
  useEffect(() => {
    name && registerValidateFields(name, onStoreChange, { ...rules, required });
    return () => {
      name && unRegisterValidate(name);
    };
  }, [onStoreChange]);

  const getControlled = (child) => {
    const mergeChildrenProps = { ...child.props };
    if (!name) return mergeChildrenProps;
    // 改变单元项的值
    const handleChange = (e) => {
      const value = e.target.value;
      formInstance.setFieldsValue(name, value);
    };
    mergeChildrenProps[trigger] = handleChange;
    if (required || rules) {
      mergeChildrenProps[validateTrigger] = (e) => {
        if (validateTrigger === trigger) {
          handleChange(e);
        }
        formInstance.validateFieldValue(name);
      };
    }
    mergeChildrenProps.value = formInstance.getFieldValue(name) || "";
    return mergeChildrenProps;
  };
  let renderChildren;
  if (isValidElement(children)) {
    renderChildren = React.cloneElement(children, getControlled(children));
  } else {
    renderChildren = children;
  }
  return (
    <Label
      height={height}
      label={label}
      labelWidth={labelWidth}
      required={required}
    >
      {renderChildren}
      <Message name={name} {...dispatch({ type: "getFieldModel" }, name)} />
    </Label>
  );
};

export default FormItem;
