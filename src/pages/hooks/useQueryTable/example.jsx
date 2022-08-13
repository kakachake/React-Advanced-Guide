import { listData } from "../../../mock";
import React, { useCallback } from "react";
import { useQueryTable } from "./useQueryTable";
import { Table, Input, Select } from "antd";
function threeNumberRandom() {
  const result = [];
  while (result.length < 3) {
    const number = parseInt(Math.random() * 9);
    if (result.indexOf(number) === -1) result.push(number);
  }
  return result;
}

function getTableData(payload) {
  return new Promise((resolve) => {
    Promise.resolve().then(() => {
      const { list } = listData;
      const arr = threeNumberRandom(); // 生成三个随机数 模拟数据交互
      console.log("请求参数：", payload);
      resolve({
        ...listData,
        list: [list[arr[0]], list[arr[1]], list[arr[2]]],
        total: list.length,
        current: payload.page || 1,
      });
    });
  });
}
const columns = [
  {
    title: "商品名称",
    dataIndex: "id",
    key: "giftName",
  },
  {
    title: "价格",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "图片",
    dataIndex: "giftImage",
    key: "giftImage",
    render: (text) => (
      <div>
        <img src={text} style={{ width: "70px", height: "70px" }} />
      </div>
    ),
  },
];
const inputStyle = { width: "200px", marginRight: "24px" };
export default function Index() {
  const [table, form] = useQueryTable({ pageSize: 3 }, getTableData);
  const { formData, setFormItem, reset } = form;
  const { pagination, tableData, getList, handleChange } = table;
  return (
    <div style={{ margin: "30px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Input
          onChange={(e) => setFormItem("name", e.target.value)}
          placeholder="请输入名称"
          style={inputStyle}
          value={formData.name || ""}
        />
        <Input
          onChange={(e) => setFormItem("price", e.target.value)}
          placeholder="请输入价格"
          style={inputStyle}
          value={formData.price || ""}
        />
        <Select
          onChange={(value) => setFormItem("type", value)}
          placeholder="请选择"
          style={inputStyle}
          value={formData.type}
        >
          <Select.Option value="1">家电</Select.Option>
          <Select.Option value="2">生活用品</Select.Option>
        </Select>
        <button className="searchbtn" onClick={() => getList()}>
          提交
        </button>
        <button className="concellbtn" onClick={reset}>
          重置
        </button>
      </div>
      {useCallback(
        <Table
          columns={columns}
          dataSource={tableData.list}
          height="300px"
          onChange={(res) => {
            handleChange(res.current, res.pageSize);
          }}
          pagination={{
            ...pagination,
            total: tableData.total,
            current: tableData.current,
          }}
          rowKey="id"
        />,
        [tableData]
      )}
    </div>
  );
}
