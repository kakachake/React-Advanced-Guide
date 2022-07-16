import React, {
  createContext,
  FC,
  memo,
  useContext,
  useEffect,
  useMemo,
} from "react";
const ThemeContext = createContext({
  theme: "light",
});
const ThemeProvider = ThemeContext.Provider;

// 这个不应该随context更新
const Child3: FC = () => {
  useEffect(() => {
    console.log("更新了");
  });
  return <div>不更新</div>;
};
const MemoChild3 = memo(Child3);

const Child2: FC = () => {
  const theme = useContext(ThemeContext).theme;
  return <div>{theme}</div>;
};

const Child: FC<{
  theme: string;
}> = ({ theme }) => {
  return <div>{theme}</div>;
};

const ChildCus = () => {
  return (
    <ThemeContext.Consumer>
      {(contextValue) => <Child theme={contextValue.theme} />}
    </ThemeContext.Consumer>
  );
};

export default function Index() {
  const [theme, setTheme] = React.useState({
    theme: "light",
  });
  return (
    <ThemeProvider value={theme}>
      <div>
        <button
          onClick={() => {
            setTheme(({ theme }) => ({
              theme: theme === "light" ? "dark" : "light",
            }));
          }}
        >
          setTheme
        </button>
        <ChildCus />
        <Child2 />
        <MemoChild3 />
        {useMemo(
          () => (
            <Child3 />
          ),
          []
        )}
      </div>
    </ThemeProvider>
  );
}
