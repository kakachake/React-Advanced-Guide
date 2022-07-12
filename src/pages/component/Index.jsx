import React, { useState } from "react";

// class Index extends React.Component {
//   constructor(...args) {
//     super(...args); /* 执行 react 底层 Component 函数 */
//   }
//   state = {}; /* state */
//   static number = 1; /* 内置静态属性 */
//   handleClick = () =>
//     console.log(111); /* 方法： 箭头函数方法直接绑定在this实例上 */
//   componentDidMount() {
//     /* 生命周期 */
//     console.log(Index.number, Index.number1); // 打印 1 , 2
//   }
//   render() {
//     /* 渲染函数 */
//     return (
//       <div style={{ marginTop: "50px" }} onClick={this.handleClick}>
//         hello,React
//       </div>
//     );
//   }
// }
// Index.number1 = 2; /* 外置静态属性 */
// Index.prototype.handleClick = () =>
//   console.log(222); /* 方法: 绑定在 Index 原型链的 方法*/

// function Index() {
//   console.log(Index.number); // 打印 1
//   const [message, setMessage] = useState("hello,world"); /* hooks  */
//   return (
//     <div onClick={() => setMessage("let us learn React!")}> {message} </div>
//   ); /* 返回值 作为渲染ui */
// }
// Index.number = 1; /* 绑定静态属性 */

// function Son(props) {
//   const { fatherSay, sayFather } = props;
//   return (
//     <div
//       style={{
//         backgroundColor: "#eee",
//       }}
//     >
//       我是子组件
//       <div>父组件：{fatherSay}</div>
//       <input
//         type="text"
//         placeholder="我说"
//         onChange={(e) => {
//           sayFather(e.target.value);
//         }}
//       />
//     </div>
//   );
// }

// function Index() {
//   const [childSay, setChildSay] = useState("");
//   const [fatherSay, setFatherSay] = useState("");
//   return (
//     <div>
//       父组件
//       <div>子组件说{childSay}</div>
//       <Son fatherSay={fatherSay} sayFather={setChildSay} />
//       <input
//         type="text"
//         placeholder="对子组件说"
//         onChange={(e) => {
//           setFatherSay(e.target.value);
//         }}
//       />
//     </div>
//   );
// }
class Person extends React.Component {
  constructor(props) {
    super(props);
    console.log("hello , i am person");
  }
  componentDidMount() {
    console.log(1111);
  }
  eat() {
    /* 吃饭 */
  }
  sleep() {
    /* 睡觉 */
  }
  ddd() {
    console.log("打豆豆"); /* 打豆豆 */
  }
  render() {
    return <div>大家好，我是一个person</div>;
  }
}
/* 程序员 */
class Index extends Person {
  constructor(props) {
    super(props);
    console.log("hello , i am Programmer too");
  }
  componentDidMount() {
    console.log(this);
  }
  code() {
    /* 敲代码 */
  }
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        {super.render()} {/* 让 Person 中的 render 执行 */}
        我还是一个程序员！ {/* 添加自己的内容 */}
      </div>
    );
  }
}
export default Index;
