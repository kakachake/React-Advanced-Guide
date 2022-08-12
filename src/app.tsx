import React from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import TSX from "./pages/tsx/Index";
import Components from "./pages/component/Index";
import State from "./pages/state/Index.jsx";
import Props from "./pages/props/Index.jsx";
import LifeCycle from "./pages/lifecycle/Index";
import Ref from "./pages/ref/Index";
import Context from "./pages/Context/Index";
import CssModule from "./pages/cssModule/Index";
import HOC from "./pages/HOC/Index";
import Memo from "./pages/Memo/Index";
import Lazy from "./pages/Lazy/Index";
import BigData from "./pages/BigData/Index.jsx";
import VirtualList from "./pages/VirtualList/Index.jsx";
import Event from "./pages/event/Index.jsx";
import FormValidator from "./pages/formValidator/Test.jsx";
import Model from "./pages/model/Index.jsx";
import Hooks from "./pages/hooks/Index.jsx";

const menu: any = [
  {
    name: "2_认识jsx",
    path: "/jsx",
    component: TSX,
  },
  {
    name: "3_起源component",
    path: "/component",
    component: Components,
  },
  {
    name: "3_state",
    path: "/state",
    component: State,
  },
  {
    name: "4_props",
    path: "/props",
    component: Props,
  },
  {
    name: "5_LifeCycle",
    path: "/LifeCycle",
    component: LifeCycle,
  },
  {
    name: "6_Ref",
    path: "/Ref",
    component: Ref,
  },
  {
    name: "7_Context",
    path: "/Context",
    component: Context,
  },
  {
    name: "7_CssModule",
    path: "/CssModule",
    component: CssModule,
  },
  {
    name: "8_HOC",
    path: "/HOC",
    component: HOC,
  },
  {
    name: "9_Memo",
    path: "/Memo",
    component: Memo,
  },
  {
    name: "10_Lazy",
    path: "/Lazy",
    component: Lazy,
  },
  {
    name: "11_BigData",
    path: "/BigData",
    component: BigData,
  },
  {
    name: "12_VirtualList",
    path: "/VirtualList",
    component: VirtualList,
  },
  {
    name: "13_Event",
    path: "/Event",
    component: Event,
  },
  {
    name: "14_表单验证",
    path: "/FormValidator",
    component: FormValidator,
  },
  {
    name: "15_自定义弹窗",
    path: "/Model",
    component: Model,
  },
  {
    name: "16_自定义Hooks",
    path: "/Hooks",
    component: Hooks,
  },
];

function Menus() {
  const history = useHistory();
  return (
    <div className="theStyle">
      {menu.map((item) => (
        <span
          className="routerLink"
          key={item.path as string}
          onClick={() => {
            history.push(item.path);
          }}
        >
          {item.name}
        </span>
      ))}
    </div>
  );
}
export default class Index extends React.Component {
  state = {
    Number: 1,
  };
  node: Element | null = null;
  componentDidMount() {
    // console.log(this.node)
    // console.log(this)
    // console.log(this);
  }

  render() {
    return (
      <div ref={(node) => (this.node = node)}>
        <div>
          <Router>
            <Menus />
            <div>{renderRoutes(menu)}</div>
          </Router>
        </div>
      </div>
    );
  }
}
