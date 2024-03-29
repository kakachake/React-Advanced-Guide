import { useRef, useState } from "react";
import { FormStore } from "./FormStore";
export const useForm = (form, defaultFormValue = {}) => {
  const formRef = useRef(null);
  const [, forceUpdate] = useState({});
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStoreCurrent = new FormStore(forceUpdate, defaultFormValue);
      formRef.current = formStoreCurrent.getForm();
    }
  }
  return formRef.current;
};
