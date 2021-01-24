import React, { useState } from "react";
import { Descriptions, Card, Avatar, Button, Spin, Tag } from "antd";
import { useQuery } from "@apollo/client";
import { ONECOMMITQUERY } from "../graphql/queries";
import UserModal from "../components/UserModal";
import moment from "moment";
const Commit = ({ match, history }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { loading, data: node } = useQuery(ONECOMMITQUERY, {
    variables: {
      id: match.params.id,
    },
  });

  return (
    <Spin size='large' spinning={loading} style={{ alignSelf: "center" }}>
      <UserModal
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalVisible={isModalVisible}
        login={node ? node.node.author.user.login : ""}
      />
      <Card style={{ margin: "20px 235px", width: 800 }}>
        {node ? (
          <>
            {" "}
            <Card
              span={2}
              style={{ marginBottom: "20px" }}
              title='Committed by'>
              {" "}
              <Card.Meta
                style={{ alignItems: "center" }}
                avatar={
                  <Avatar
                    style={{ cursor: "pointer" }}
                    onClick={(e) => showModal()}
                    margin={{ marginBottom: "40px" }}
                    size={32}
                    src={node.node.author.avatarUrl}
                  />
                }
                title={node.node.author.name}
              />
            </Card>
            <Descriptions layout='vertical' title='Commit Info' bordered>
              <Descriptions.Item span={3} label='Commited Date'>
                {moment(node.node.committedDate).fromNow(true)} ago
              </Descriptions.Item>
              <Descriptions.Item span={3} label='Pushed Date'>
                {moment(node.node.pushedDate).fromNow(true)} ago
              </Descriptions.Item>
              <Descriptions.Item span={3} label='Hash'>
                <Tag color='green'>{node.node.oid}</Tag>
              </Descriptions.Item>
              <Descriptions.Item span={3} label='Parent Hash'>
                {node.node.parents.nodes[0] ? (
                  <Tag color='geekblue'>{node.node.parents.nodes[0].oid}</Tag>
                ) : (
                  ""
                )}
              </Descriptions.Item>
              <Descriptions.Item span={3} label='ChangedFiles'>
                {node.node.changedFiles
                  ? node.node.changedFiles
                  : "Not available"}
              </Descriptions.Item>

              <Descriptions.Item span={3} label='Deletions'>
                {node.node.deletions ? node.node.deletions : "Not available"}
              </Descriptions.Item>
              <Descriptions.Item span={3} label='Additions'>
                {node.node.additions ? node.node.additions : "Not available"}
              </Descriptions.Item>
              <Descriptions.Item label='Message'>
                {node.node.message}
              </Descriptions.Item>
            </Descriptions>
            <Button
              style={{ marginTop: "20px" }}
              type='primary'
              block
              onClick={() => {
                window.open(node.node.url, "_blank");
              }}>
              Visit Commit
            </Button>
          </>
        ) : null}
      </Card>
    </Spin>
  );
};

export default Commit;
