import React from "react";
import { forwardRef } from "react";
import { useImperativeHandle } from "react";
import FormContext from "./FormContext";
import { useForm } from "./useForm";

const Form = (
  { form, onFinish, onFinishFailed, initialValues, children },
  ref
) => {
  const formInstance = useForm(form, initialValues);
  const { setCallback, ...providerFormInstance } = formInstance;
  setCallback({
    onFinish,
    onFinishFailed,
  });

  useImperativeHandle(ref, () => providerFormInstance, []);
  const RenderChildren = (
    <FormContext.Provider value={formInstance}>{children}</FormContext.Provider>
  );
  return (
    <form
      onReset={(e) => {
        e.preventDefault();
        e.stopPropagation();
        formInstance.resetFields();
      }}
    >
      {RenderChildren}
    </form>
  );
};

export default forwardRef(Form);
