import moment from "moment";
import React from "react";
import { Tag, Collapse } from "antd";

export const columns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <strong style={{ color: "green" }}>{text}</strong>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date) => {
      return <strong>{`${moment(date).fromNow(true)} ago`}</strong>;
    },
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message", //Using a collapse to solve the problem of long messages
    render: (text) => (
      <div onClick={(event) => event.stopPropagation()}>
        <Collapse accordion>
          <Collapse.Panel header='Show message' key='1'>
            <p style={{ width: "200px" }}>{text}</p>
          </Collapse.Panel>
        </Collapse>
      </div>
    ),
  },
  {
    title: "Hash",
    dataIndex: "hash",
    key: "hash",
    render: (text) => (
      <Tag color='green' key={text}>
        {text.substr(0, 7)}
      </Tag>
    ),
  },
  {
    title: "Parent Hash",
    dataIndex: "parenthash",
    key: "parenthash",
    render: (text) => (
      <Tag color='geekblue' key={text}>
        {text.substr(0, 7)}
      </Tag>
    ),
  },
];
