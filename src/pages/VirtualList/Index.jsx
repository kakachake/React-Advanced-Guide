import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import style from "./Index.module.css";

export default function VirtualList() {
  const [dataList, setDataList] = React.useState([]);
  const [position, setPosition] = React.useState([
    0, 0,
  ]); /* 截取缓冲区 + 视图区索引 */
  const box = useRef();
  const scroll = useRef();
  const context = React.useRef(null); /* 用于移动视图区域，形成滑动效果。 */

  const scrollInfo = React.useRef({
    height: 500 /* 容器高度 */,
    bufferCount: 8 /* 缓冲区个数 */,
    itemHeight: 60 /* 每一个item高度 */,
    renderCount: 0 /* 渲染区个数 */,
  });

  useEffect(() => {
    const height = box.current.offsetHeight;

    const { itemHeight, bufferCount } = scrollInfo.current;
    const renderCount = Math.ceil(height / itemHeight) + bufferCount;
    scrollInfo.current = { renderCount, height, itemHeight, bufferCount };
    const dataList = new Array(100).fill(1).map((_, index) => index + 1);
    setDataList(dataList);
    setPosition([0, renderCount]);
  }, []);

  const { itemHeight, height } = scrollInfo.current;

  const handleScroll = (e) => {
    const { scrollTop } = scroll.current;
    const { itemHeight, renderCount } = scrollInfo.current;
    // 偏移一个单位，让视图区域向上移动一个单位
    const currentOffset = scrollTop - (scrollTop % itemHeight);
    // 计算视图区域索引
    const start = Math.floor(scrollTop / itemHeight);
    console.log(currentOffset, start);
    context.current.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
    const end = Math.floor(start + renderCount + 1);
    if (end !== position[1] || start !== position[0]) {
      setPosition([start, end]);
    }
  };

  const [start, end] = position;
  const list = dataList.slice(start, end);

  return (
    <div className={style.list_box} ref={box}>
      <div
        className={style.scroll_box}
        style={{ height: height + "px" }}
        onScroll={handleScroll}
        ref={scroll}
      >
        <div
          className={style.scroll_hold}
          style={{ height: `${dataList.length * itemHeight}px` }}
        ></div>
        <div className={style.context} ref={context}>
          {list.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  height: itemHeight + "px",
                }}
                className={style.item}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
