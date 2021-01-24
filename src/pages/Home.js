import React, { useState } from "react";
import { Table, Avatar, Spin } from "antd";
import { useQuery } from "@apollo/client";
import { COMMITSQUERY, MORECOMMITSQUERY } from "../graphql/queries";
import UserModal from "../components/UserModal";
import { columns } from "../utils/tableColumns";
import { withRouter } from "react-router-dom"; //for the props.history

let data = [];
let fetched = [];

const Home = ({
  cursor,
  setCursor,
  currentPage,
  setCurrentPage,
  totalpage,
  setTotalPage,
  history,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [login, setLogin] = useState("");

  const modifiedColumns = [
    ...columns,
    (columns[0].render = ({ avatar, login }) => (
      <div style={{ cursor: "pointer" }} onClick={(e) => showModal(e, login)}>
        <Avatar size={50} src={avatar} key={avatar} />
      </div>
    )),
  ];

  const showModal = (e, login) => {
    e.stopPropagation(); //stop click on commit item event propagation
    setLogin(login);
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { loading: firstLoading, data: repository } = useQuery(COMMITSQUERY, {
    variables: {
      name: "react",
      owner: "facebook",
    },
    skip: currentPage > 10 || data.length > 100, //Skip ===  use this query only for fetching the first 10 pages
  });

  if (!firstLoading && data.length < 100) {
    fetched = repository ? repository.repository.ref.target.history.edges : [];
    data = fetched.map((commit, i) => ({
      //edges is an array of commits
      key: i,
      avatar: {
        avatar: commit.node.author.avatarUrl,
        login: commit.node.author.user?.login, //the login used to query the user info for the Modal
      },
      name: commit.node.author.name,
      date: commit.node.committedDate,
      message: commit.node.message,
      hash: commit.node.oid,
      parenthash: commit.node.parents.nodes[0].oid,
      id: commit.node.id,
    }));
  }

  //Now we have a cursor (that we got from our first query),
  //we can use it to fetch more

  const { loading: moreLoading, data: moreRepo } = useQuery(MORECOMMITSQUERY, {
    variables: {
      name: "react",
      owner: "facebook",
      cursor,
    },
    skip: currentPage % 10 !== 0 || currentPage < data.length / 10, // Skip === Do not use this query unless we are on the last page
  });

  fetched = moreRepo ? moreRepo.repository.ref.target.history.edges : fetched;
  data = moreRepo
    ? data.concat(
        fetched.map((commit, i) => ({
          //edges is an array of commits
          key: i,
          avatar: {
            avatar: commit.node.author.avatarUrl,
            login: commit.node.author.user ? commit.node.author.user.login : "", //the login used to query the user info for the Modal
          },
          name: commit.node.author.name,
          date: commit.node.committedDate,
          message: commit.node.message,
          hash: commit.node ? commit.node.oid : "",
          parenthash: commit.node.parents.nodes[0]
            ? commit.node.parents.nodes[0].oid
            : "",
          id: commit.node.id,
        }))
      )
    : data;
  return (
    <>
      <Spin
        size='large'
        spinning={moreLoading || firstLoading}
        style={{ alignSelf: "center" }}>
        <UserModal
          handleCancel={handleCancel}
          handleOk={handleOk}
          isModalVisible={isModalVisible}
          login={login}
        />
        <Table
          onRow={(rowIndex) => {
            return {
              onClick: () => {
                history.push(`/commit/${rowIndex.id}`);
              },
            };
          }}
          pagination={{
            showSizeChanger: false,
            onChange: (current) => {
              setCurrentPage(current);
              if (current === totalpage) {
                setTotalPage(totalpage + 10);
                setCursor(fetched[fetched.length - 1]?.cursor);
              }
            },
          }}
          columns={modifiedColumns}
          dataSource={data}
        />
      </Spin>
    </>
  );
};

export default withRouter(Home);
