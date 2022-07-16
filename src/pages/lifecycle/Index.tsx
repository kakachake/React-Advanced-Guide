import React, { useState, useEffect, useRef } from "react";

// function FunctionLifecycle(props) {
//   const [num, setNum] = useState(0);
//   React.useEffect(() => {
//     /* 请求数据 ， 事件监听 ， 操纵dom  ， 增加定时器 ， 延时器 */
//     console.log("组件挂载完成：componentDidMount");
//     return function componentWillUnmount() {
//       /* 解除事件监听器 ，清除 */
//       console.log("组件销毁：componentWillUnmount");
//     };
//   }, []); /* 切记 dep = [] */
//   React.useEffect(() => {
//     console.log("props变化：componentWillReceiveProps");
//   }, [props]);
//   React.useEffect(() => {
//     /*  */
//     console.log(" 组件更新完成：componentDidUpdate ");
//   });
//   return (
//     <div>
//       <div> props : {props.number} </div>
//       <div> states : {num} </div>
//       <button onClick={() => setNum((state) => state + 1)}>改变state</button>
//     </div>
//   );
// }

// export default () => {
//   const [number, setNumber] = React.useState(0);
//   const [isRender, setRender] = React.useState(true);
//   return (
//     <div>
//       {isRender && <FunctionLifecycle number={number} />}
//       <button onClick={() => setNumber((state) => state + 1)}>
//         {" "}
//         改变props{" "}
//       </button>{" "}
//       <br />
//       <button onClick={() => setRender(false)}>卸载组件</button>
//     </div>
//   );
// };
/* item 完全是单元项的渲染ui */
function Item({ item }) {
  return (
    <div className="goods_item">
      <img src={item.giftImage} className="item_image" />
      <div className="item_content">
        <div className="goods_name">{item.giftName}</div>
        <div className="hold_price" />
        <div className="new_price">
          <div className="new_price">
            <div className="one view">¥ {item.price}</div>
          </div>
        </div>
        <img className="go_share  go_text" />
      </div>
    </div>
  );
}

const ScrollView = (props: any) => {
  const { data, Component, scrolltolower, scroll } = props;

  if (!data.list.length) return null;
  const scrollView = useRef<HTMLDivElement>(null);
  const handleScroll = (e) => {
    scroll && scroll(e);
    const { scrollTop, scrollHeight, offsetHeight } = e.target;

    if (scrollTop + offsetHeight >= scrollHeight - 100) {
      scrolltolower && scrolltolower();
    }
  };
  useEffect(() => {
    if (scrollView.current) {
      scrollView.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollView.current) {
        scrollView.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  return (
    <div
      style={{
        height: "500px",
        overflow: "hidden auto",
      }}
      ref={scrollView}
    >
      <div>
        {data.list.map((item: any) => {
          return <Component key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default function () {
  const [data, setData] = useState({
    list: [],
    page: 0,
    pageCount: 1,
  }); /* 记录列表数据 */
  /* 请求数据 */
  const getData = async () => {
    if (data.page === data.pageCount) return console.log("没有数据了～");
    const res: any = await fetchData(data.page + 1);
    console.log("setData");

    if (res.code === 0)
      setData({
        ...res,
        list: res.page === 1 ? res.list : data.list.concat(res.list),
      });
  };
  /* 滚动到底部触发 */
  const handerScrolltolower = () => {
    console.log("scroll已经到底部");
    getData();
  };
  /* 初始化请求数据 */
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView
      data={data} /*  */
      Component={Item} /* Item 渲染的单元组件 */
      scrolltolower={handerScrolltolower}
      scroll={() => {}}
    />
  );
}

import { listData } from "../../mock";
const fetchData = (page) => {
  return new Promise((resolve) => {
    resolve({
      ...listData,
      page,
      list: listData.list.slice(5 * (page - 1), 5 * page),
    });
  });
};
