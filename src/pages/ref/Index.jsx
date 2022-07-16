import React, { Component, useEffect, useRef } from "react";
import { createRef } from "react";
import { forwardRef } from "react";
import { useState } from "react";
import { useImperativeHandle } from "react";

/* 类组件 */
// class Children extends Component {
//   render = () => <div>hello,world</div>;
// }
// /* TODO:  Ref属性是一个字符串 */
// export default class Index extends React.Component {
//   componentDidMount() {
//     console.log(this.refs);
//   }
//   render = () => (
//     <div>
//       <div ref="currentDom">字符串模式获取元素或组件</div>
//       <Children ref="currentComInstance" />
//     </div>
//   );
// }

// export default class Index extends Component {
//   currentDom: HTMLElement | null = null;
//   currentComInstance: Component | null = null;
//   constructor(props) {
//     super(props);
//   }
//   componentDidMount() {
//     console.log(this.currentDom);
//     console.log(this.currentComInstance);
//   }
//   render = () => (
//     <div>
//       <div ref={(node) => (this.currentDom = node)}></div>
//       <Children ref={(node) => (this.currentComInstance = node)} />
//     </div>
//   );
// }
// 孙组件
// function Son(props) {
//   const { grandRef } = props;
//   return (
//     <div>
//       <div> i am alien </div>
//       <span ref={grandRef}>这个是想要获取元素</span>
//     </div>
//   );
// }
// // 父组件
// class Father extends React.Component<{
//   grandRef: ForwardedRef<HTMLDivElement>;
// }> {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return (
//       <div>
//         <Son grandRef={this.props.grandRef} />
//       </div>
//     );
//   }
// }
// const NewFather = React.forwardRef<HTMLDivElement>((props, ref) => (
//   <Father grandRef={ref} {...props} />
// ));
// // 爷组件
// export default class GrandFather extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   node: HTMLElement | null = null;
//   componentDidMount() {
//     console.log(this.node); // span #text 这个是想要获取元素
//   }
//   render() {
//     return (
//       <div>
//         <NewFather ref={(node) => (this.node = node)} />
//       </div>
//     );
//   }
// }
// 表单组件
// class Form extends React.Component {
//   render() {
//     return <div>...</div>;
//   }
// }
// // index 组件
// class Index extends React.Component<{
//   forwardRef: ForwardedRef<{
//     form: Form | null;
//     index: Index;
//     button: HTMLElement | null;
//   }>;
// }> {
//   componentDidMount() {
//     const { forwardRef } = this.props;
//     if (forwardRef) {
//       (
//         forwardRef as MutableRefObject<{
//           form: Form | null;
//           index: Index;
//           button: HTMLElement | null;
//         }>
//       ).current = {
//         form: this.form, // 给form组件实例 ，绑定给 ref form属性
//         index: this, // 给index组件实例 ，绑定给 ref index属性
//         button: this.button, // 给button dom 元素，绑定给 ref button属性
//       };
//     }
//   }
//   form: Form | null = null;
//   button: HTMLElement | null = null;
//   render() {
//     return (
//       <div>
//         <button ref={(button) => (this.button = button)}>点击</button>
//         <Form ref={(form) => (this.form = form)} />
//       </div>
//     );
//   }
// }
// const ForwardRefIndex = React.forwardRef<{
//   form: Form | null;
//   index: Index;
//   button: HTMLElement | null;
// }>((props, ref) => <Index {...props} forwardRef={ref} />);
// // home 组件
// export default function Home() {
//   const ref = useRef(null);
//   useEffect(() => {
//     console.log(ref.current);
//   }, []);
//   return <ForwardRefIndex ref={ref} />;
// }

// function HOC(Component) {
//   class Wrap extends React.Component {
//     render() {
//       const { forwardedRef, ...rest } = this.props;
//       return <Component ref={forwardedRef} {...rest} />;
//     }
//   }
//   return React.forwardRef((props, ref) => (
//     <Wrap {...props} forwardedRef={ref} />
//   ));
// }

// class Index extends React.Component {
//   render() {
//     return <div>hello,world</div>;
//   }
// }
// const HocIndex = HOC(Index);
// export default () => {
//   const node = useRef(null);
//   useEffect(() => {
//     console.log(node.current); /* Index 组件实例  */
//   }, []);
//   return (
//     <div>
//       <HocIndex ref={node} />
//     </div>
//   );
// };
// class Son extends React.PureComponent {
//   state = {
//     fatherMes: "",
//     sonMes: "",
//   };
//   fatherSay = (fatherMes) =>
//     this.setState({ fatherMes }); /* 提供给父组件的API */
//   render() {
//     const { fatherMes, sonMes } = this.state;
//     return (
//       <div className="sonbox">
//         <div className="title">子组件</div>
//         <p>父组件对我说：{fatherMes}</p>
//         <div className="label">对父组件说</div>{" "}
//         <input
//           onChange={(e) => this.setState({ sonMes: e.target.value })}
//           className="input"
//         />
//         <button
//           className="searchbtn"
//           onClick={() => this.props.toFather(sonMes)}
//         >
//           to father
//         </button>
//       </div>
//     );
//   }
// }
// /* 父组件 */
// export default function Father() {
//   const [sonMes, setSonMes] = React.useState("");
//   const sonInstance = React.useRef(null); /* 用来获取子组件实例 */
//   const [fatherMes, setFatherMes] = React.useState("");
//   const toSon = () =>
//     sonInstance.current.fatherSay(
//       fatherMes
//     ); /* 调用子组件实例方法，改变子组件state */
//   return (
//     <div className="box">
//       <div className="title">父组件</div>
//       <p>子组件对我说：{sonMes}</p>
//       <div className="label">对子组件说</div>{" "}
//       <input onChange={(e) => setFatherMes(e.target.value)} className="input" />
//       <button className="searchbtn" onClick={toSon}>
//         to son
//       </button>
//       <Son ref={sonInstance} toFather={setSonMes} />
//     </div>
//   );
// }

// function Son(props, ref) {
//   const inputRef = useRef(null);
//   const [inputValue, setInputValue] = useState("1");
//   useImperativeHandle(ref, () => ({
//     onFocus: () => {
//       inputRef.current.focus();
//     },
//     onChangeValue(value) {
//       setInputValue(value);
//     },
//   }));
//   return (
//     <div>
//       <input
//         type="text"
//         ref={inputRef}
//         onChange={(e) => {
//           setInputValue(e.target.value);
//         }}
//         value={inputValue}
//       />
//     </div>
//   );
// }

// const ForwarSon = forwardRef(Son);

// export default class Index extends Component {
//   cur = null;
//   constructor(props) {
//     super(props);
//     this.cur = createRef();
//     console.log(this.cur);
//   }
//   handleClick = () => {
//     console.log(this.cur);
//     const { onFocus, onChangeValue } = this.cur;
//     onFocus();
//     onChangeValue("let us learn react");
//   };
//   render() {
//     return (
//       <div>
//         <ForwarSon ref={(node) => (this.cur = node)} />
//         <button onClick={this.handleClick}>点击！</button>
//       </div>
//     );
//   }
// }
export default class Index extends React.Component {
  state = { num: 0 };
  node = null;
  hhh = null;
  constructor(props) {
    super(props);
    this.hhh = createRef();
  }
  handleClick = () => {
    this.setState({ num: this.state.num + 1 });
    console.log(this.hhh);
  };
  render() {
    return (
      <div>
        <div
          ref={(node) => {
            this.node = node;
            console.log("此时的参数是什么：", this.node);
          }}
        >
          ref元素节点
        </div>
        <button ref={this.hhh} onClick={() => this.handleClick()}>
          点击
        </button>
      </div>
    );
  }
}
