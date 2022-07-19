import React from "react";
import { Fragment } from "react";
import { Component } from "react";
import style from "./Index.module.css";

function getColor() {
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, ${Math.random()})`;
}

function getPosition(position) {
  const { width, height } = position;
  return {
    left: `${Math.ceil(Math.random() * width)}px`,
    top: `${Math.ceil(Math.random() * height)}px`,
  };
}

function Circle({ position }) {
  const _style = React.useMemo(() => {
    return {
      backgroundColor: getColor(),
      ...getPosition(position),
    };
  }, []);
  return <div style={_style} className={style.circle}></div>;
}

class Index extends Component {
  state = {
    dataList: [], // 原始数据
    renderList: [], // 渲染数据
    position: { width: 0, height: 0 },
    enchRenderNum: 500,
  };
  box = React.createRef();
  componentDidMount() {
    const { offsetWidth, offsetHeight } = this.box.current;
    console.log(offsetWidth, offsetHeight);
    const originalList = new Array(20000).fill(1);
    let times = Math.ceil(originalList.length / this.state.enchRenderNum);
    let index = 1;
    this.setState(
      {
        dataList: originalList,
        position: { width: offsetWidth, height: offsetHeight },
      },
      () => {
        this.toRenderList(index, times);
      }
    );
  }
  toRenderList = (index, times) => {
    console.log(this.renderList.length);
    if (index > times) return; // 渲染完成
    const { renderList } = this.state;
    renderList.push(this.renderList(index));
    console.log(renderList);
    this.setState({
      renderList,
    });
    // requestAnimationFrame(() => {
    //   this.toRenderList(index + 1, times);
    // });
    requestIdleCallback(() => {
      this.toRenderList(index + 1, times);
    });
  };
  renderList = (index) => {
    const { dataList, enchRenderNum } = this.state;
    const list = dataList.slice(
      (index - 1) * enchRenderNum,
      index * enchRenderNum
    );

    return (
      <Fragment key={index}>
        {list.map((item, index) => {
          return <Circle key={index} position={this.state.position} />;
        })}
      </Fragment>
    );
  };
  render() {
    const { renderList, position } = this.state;
    return (
      <div ref={this.box} className={style.bigDataWrap}>
        {renderList}
      </div>
    );
  }
}

export default () => {
  const [show, setShow] = React.useState(false);
  return (
    <div>
      {show ? <Index /> : <button onClick={() => setShow(true)}>show</button>}
    </div>
  );
};
