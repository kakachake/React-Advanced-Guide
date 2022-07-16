import React, {
  Children,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

// const Children = (props) => (
//   <div>
//     <div>hello, my name is {props.name} </div>
//     <div> {props.mes} </div>
//   </div>
// );

// function Container(props) {
//   let i = 0;
//   const ContainerProps = () => ({
//     name: "alien",
//     mes: "let us learn react",
//     key: i++,
//   });
//   console.log(props.children);
//   return props.children.map((item) => {
//     if (React.isValidElement(item)) {
//       // 判断是 react elment  混入 props
//       return React.cloneElement(
//         item,
//         { ...ContainerProps() },
//         item.props.children
//       );
//     } else if (typeof item === "function") {
//       return item(ContainerProps());
//     } else return null;
//   });
// }

// const Index = () => {
//   return (
//     <Container>
//       <Children />
//       {(ContainerProps) => <Children {...ContainerProps} name={"haha"} />}
//     </Container>
//   );
// };

// export default Index;
const Form = forwardRef(function (props, ref) {
  const [formData, setFormData] = useState({});
  const setValue = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useImperativeHandle(ref, () => ({
    submitForm: (cb) => {
      cb(formData);
    },
    resetForm: () => {
      setFormData({});
    },
  }));
  const { children } = props;
  const renderChildren = [];
  Children.forEach(children, (child) => {
    if (child.type.displayName === "FormItem") {
      const { name } = child.props;
      const Children = React.cloneElement(
        child,
        {
          key: name,
          handleChange: (value) => {
            setValue(name, value);
          },
          value: formData[name] || "",
        },
        child.props.children
      );
      renderChildren.push(Children);
    }
  });
  return renderChildren;
});

function FormItem(props) {
  const { children, name, handleChange, value, label } = props;
  const onChange = (e) => {
    handleChange(e.target.value);
  };
  return (
    <div className="form">
      <span className="label">{label}：</span>
      {React.isValidElement(children) && children.type.displayName === "input"
        ? React.cloneElement(children, {
            onChange,
            value,
          })
        : null}
    </div>
  );
}
FormItem.displayName = "FormItem";

function Input({ onChange, value }) {
  return <input onChange={onChange} value={value} />;
}

Input.displayName = "input";

export default () => {
  const form = React.useRef(null);
  useEffect(() => {
    console.log(form.current);
  }, []);
  const submit = () => {
    /* 表单提交 */
    form.current.submitForm((formValue) => {
      console.log(formValue);
    });
  };
  const reset = () => {
    /* 表单重置 */
    form.current.resetForm();
  };
  return (
    <div className="box">
      {/* Form最好是类组件，因为只有类组件才能获取实例 */}
      <Form ref={form}>
        <FormItem label="我是" name="name">
          <Input />
        </FormItem>
        <FormItem label="我想对大家说" name="mes">
          <Input />
        </FormItem>
        <input placeholder="不需要的input" />
        <Input />
      </Form>
      <div className="btns">
        <button className="searchbtn" onClick={submit}>
          提交
        </button>
        <button className="concellbtn" onClick={reset}>
          重置
        </button>
      </div>
    </div>
  );
};
