import React from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import TSX from "./pages/tsx/Index";
import Components from "./pages/component/Index";
import State from "./pages/state/Index.jsx";
import Props from "./pages/props/Index.jsx";

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
