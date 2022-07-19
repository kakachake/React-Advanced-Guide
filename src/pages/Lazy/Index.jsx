import React, { Suspense } from "react";

/* 数据模拟 */
const getData = () => {
  return new Promise((resolve) => {
    //模拟异步
    setTimeout(() => {
      resolve({
        name: "alien",
        say: "let us learn React!",
      });
    }, 1000);
  });
};
/* 测试异步组件 */
function Test({ rdata, age }) {
  const { name, say } = rdata;
  console.log("组件渲染");
  return (
    <div>
      <div> hello , my name is {name} </div>
      <div>age : {age} </div>
      <div> i want to say {say} </div>
    </div>
  );
}
/* 父组件 */
export default class Index extends React.Component {
  LazyTest = AysncComponent(
    Test,
    getData
  ); /* 需要每一次在组件内部声明，保证每次父组件挂载，都会重新请求数据 ，防止内存泄漏。 */
  render() {
    const { LazyTest } = this;
    return (
      <div>
        <Suspense fallback={<div>loading...</div>}>
          <LazyTest age={18} />
        </Suspense>
      </div>
    );
  }
}
/**
 *
 * @param {*} Component  需要异步数据的component
 * @param {*} api        请求数据接口,返回Promise，可以再then中获取与后端交互的数据
 * @returns
 */
function AysncComponent(Component, api) {
  // 仿照()=>import('./xxx')的写法
  // 返回一个promise，resolve的参数是一个对象，包含了{default:component}
  const AysncComponentPromise = () =>
    new Promise(async (resolve) => {
      const data = await api();
      resolve({
        default: (props) => <Component rdata={data} {...props} />,
      });
    });
  return React.lazy(AysncComponentPromise);
}
