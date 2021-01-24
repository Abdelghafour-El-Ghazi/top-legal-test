import React from "react";
import { useQuery } from "@apollo/client";
import { Modal, Card } from "antd";
import { USERQUERY } from "../../graphql/queries";
import moment from "moment";

const UserModal = ({ isModalVisible, handleOk, handleCancel, login }) => {
  const { data: user } = useQuery(USERQUERY, {
    variables: {
      login,
    },
  });

  return (
    <Modal
      title={user && user.user.name}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}>
      {user ? (
        <Card
          style={{ width: 240, marginLeft: 110 }}
          cover={<img alt='example' src={user.user.avatarUrl} />}>
          <Card.Meta
            style={{ marginBottom: "15px" }}
            title='Name'
            description={user.user.name}
          />
          <Card.Meta
            style={{ marginBottom: "15px" }}
            title='Joined'
            description={
              user.user.createdAt
                ? `${moment(user.user.createdAt).fromNow(true)} ago`
                : "None"
            }
          />
          <Card.Meta
            style={{ marginBottom: "15px" }}
            title='followers'
            description={
              user.user.followers.totalCount
                ? user.user.followers.totalCount
                : "None"
            }
          />
          <Card.Meta
            style={{ marginBottom: "15px" }}
            title='following'
            description={
              user.user.following.totalCount
                ? user.user.following.totalCount
                : "None"
            }
          />
          <Card.Meta
            style={{ marginBottom: "15px" }}
            title='Number of repositories'
            description={
              user.user.repositories.totalCount
                ? user.user.repositories.totalCount
                : "None"
            }
          />
          <Card.Meta
            style={{ marginBottom: "15px" }}
            title='Company'
            description={user.user.company ? user.user.company : "None"}
          />
          <Card.Meta
            style={{ marginBottom: "15px" }}
            title='Bio'
            description={user.user.bio ? user.user.bio : "None"}
          />
          <Card.Meta
            style={{ marginBottom: "15px" }}
            title='Location'
            description={user.user.location ? user.user.location : "None"}
          />
        </Card>
      ) : null}
    </Modal>
  );
};

export default UserModal;
