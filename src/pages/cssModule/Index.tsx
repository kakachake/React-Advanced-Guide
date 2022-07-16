import React, { FC, useState } from "react";
import style from "./Index.module.scss";
interface IndexProps {}

const Index: FC<IndexProps> = () => {
  const [theme, setTheme] = useState("light");
  return (
    <div className={style.text + " text_bg"}>
      <button
        className={`
          ${style[theme]}
        `}
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        切换主题
      </button>
    </div>
  );
};

export default Index;
