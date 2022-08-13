import React from "react";

export function useQueryTable(defaultQuery = {}, api) {
  // 使用ref可以解决因为闭包导致的拿不到最新数据的问题
  // 但是使用ref会导致数据改变页面不更新，这时候需要使用forceUpdate进行页面的强制更新

  // 在写hooks时尽量把导出的变量都做useMemo，useCallback处理，你不清楚使用你的人
  // 会不会将此函数传入到memo组件中，如果传入没有处理的函数，会导致memo作用失效，因为
  // 你的函数每次都会返回一个新的

  // 保存查询表格表单 信息
  const formData = React.useRef({});
  // 保存查询表格分页的信息
  const pagination = React.useRef({
    page: defaultQuery.page || 1,
    pageSize: defaultQuery.pageSize || 10,
  });

  const [, forceUpdate] = React.useState(null);

  const [tableData, setTableData] = React.useState({
    data: [],
    total: 0,
    current: 1,
  });

  const getList = React.useCallback(
    async function (payload = {}) {
      if (!api) return;
      const data = await api({
        ...defaultQuery,
        ...payload,
        ...pagination.current,
        ...formData.current,
      });
      console.log(data);
      if (data.code === 0) {
        setTableData({
          list: data.list,
          current: data.current,
          total: data.total,
        });
      }
    },
    [api]
  );
  const setFormItem = React.useCallback(function (key, value) {
    const form = formData.current;
    form[key] = value;
    forceUpdate({});
  });

  // 重置表单
  const reset = React.useCallback(
    function () {
      const current = formData.current;
      for (let key in current) {
        current[key] = "";
      }
      pagination.current.page = defaultQuery.page || 1;
      pagination.current.pageSize = defaultQuery.pageSize || 10;
      getList();
    },
    [getList]
  );

  //处理分页
  const handleChange = React.useCallback(
    function (page, pageSize) {
      pagination.current = {
        page,
        pageSize,
      };
      getList();
    },
    [getList]
  );

  React.useEffect(() => {
    getList();
  }, []);
  return [
    {
      tableData,
      pagination: pagination.current,
      handleChange,
      getList,
    },
    {
      formData: formData.current,
      setFormItem,
      reset,
    },
  ];
}
