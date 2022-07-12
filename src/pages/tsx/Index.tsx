import React from "react";

const toLearn = ["react", "vue", "webpack", "nodejs"];

const TextComponent = () => <div> hello , i am function component </div>;

export default class Index extends React.Component {
  status = false; /* 状态 */
  renderFoot = () => <div> i am foot</div>;
  controlRender = () => {
    const reactElement = (
      <div style={{ marginTop: "100px" }}>
        {/* element 元素类型 */}
        <div>
          <div>hello</div>
          <div>world</div>
        </div>
        {/* fragment 类型 */}
        <React.Fragment>
          <div> 👽👽 </div>
        </React.Fragment>
        {/* text 文本类型 */}
        my name is alien
        {/* 数组节点类型 */}
        {toLearn.map((item) => (
          <div key={item}>let us learn {item} </div>
        ))}
        {/* 组件类型 */}
        <TextComponent />
        {/* 三元运算 */}
        {this.status ? <TextComponent /> : <div>三元运算</div>}
        {/* 函数执行 */}
        {this.renderFoot()}
        <button onClick={() => console.log(this.render())}>
          打印render后的内容
        </button>
      </div>
    );
    console.log(reactElement);
    const { children } = reactElement.props;
    // 扁平化children
    console.log(children);

    const flattenChildren = React.Children.toArray(children);
    console.log(flattenChildren);
    // 去除文本节点
    const newChildren: any = [];
    React.Children.forEach(flattenChildren, (item) => {
      if (React.isValidElement(item)) {
        newChildren.push(item);
      }
    });
    console.log(newChildren);

    // 插入新的节点
    const lastChildren = React.createElement(
      "div",
      { className: "last" },
      "say goodbye"
    );
    newChildren.push(lastChildren);
    console.log(reactElement);

    const newReactElement = React.cloneElement(
      reactElement,
      {},
      ...newChildren
    );
    console.log(newReactElement);

    return newReactElement;
  };
  render() {
    /* 以下都是常用的jsx元素节 */
    return this.controlRender();
  }
}
