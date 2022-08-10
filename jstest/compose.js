const compose = (...funcs) => {
  return funcs.reduce((f, g) => (x) => f(g(x)));
};
function logMiddleware() {
  /* 第二层在reduce中被执行 */
  return (next) => {
    /* 返回增强后的dispatch */
    console.log(next);
    return (action) => {
      const { type } = action;
      console.log("第一个中间件:", type);
      return next(action);
    };
  };
}

function logMiddleware2() {
  /* 第二层在reduce中被执行 */
  return (next) => {
    /* 返回增强后的dispatch */
    console.log(next);
    return (action) => {
      const { type } = action;
      console.log("第二个中间件:", type);
      return next(action);
    };
  };
}
cf = compose(logMiddleware(), logMiddleware2());
console.log(
  cf(({ type }) => {
    console.log(type);
  })({
    type: 1,
  })
);
