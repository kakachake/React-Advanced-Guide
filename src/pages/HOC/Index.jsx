import React, { useRef, useEffect } from "react";
// class Child extends React.Component {
//   componentDidMount() {
//     console.log(this.props);
//   }
//   render() {
//     return (
//       <div>
//         <ul>
//           <li>react</li>
//           <li>vue</li>
//           <li>Angular</li>
//         </ul>
//       </div>
//     );
//   }
// }
// class Index extends React.Component {
//   render() {
//     return (
//       <div>
//         <ul>
//           <li>react</li>
//           <li>vue</li>
//           <li>Angular</li>
//         </ul>
//       </div>
//     );
//   }
// }
// function HOC(Component) {
//   return class Advance extends Component {
//     render() {
//       const element = super.render();
//       const otherProps = {
//         name: "alien",
//       };
//       /* 替换 Angular 元素节点 */
//       const appendElement = React.createElement(
//         "li",
//         {},
//         `hello ,world , my name  is ${otherProps.name}`
//       );
//       const newchild = React.Children.map(
//         element.props.children.props.children,
//         (child, index) => {
//           if (index === 2) return appendElement;
//           return child;
//         }
//       );
//       console.log(element);
//       return React.cloneElement(
//         element,
//         { text: 1 },
//         newchild,
//         React.cloneElement(<Child />, { text: 2 })
//       );
//     }
//   };
// }
// export default HOC(Index);
function ClickHoc(Component) {
  return function Wrap(props) {
    const dom = useRef(null);
    useEffect(() => {
      const handerClick = () => console.log("发生点击事件");
      dom.current.addEventListener("click", handerClick);
      return () => dom.current.removeEventListener("click", handerClick);
    }, []);
    return (
      <div ref={dom}>
        <Component {...props} />
      </div>
    );
  };
}

@ClickHoc
class Index extends React.Component {
  render() {
    return (
      <div className="index">
        <p>hello，world</p>
        <button>组件内部点击</button>
      </div>
    );
  }
}

const Index2 = function () {
  return <div>组件2</div>;
};

const HOCIndex2 = ClickHoc(Index2);

console.log(Index);
export default () => {
  return (
    <div className="box">
      <Index />
      <HOCIndex2 />
      <button>组件外部点击</button>
    </div>
  );
};
