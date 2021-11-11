import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
const columns = [
  {
    title: "Role",
    dataIndex: "role",
  },
  {
    title: "isEmailVerified",
    dataIndex: "isEmailVerified",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Id",
    dataIndex: "id",
  },
];
const data = sessionStorage.getItem("tokens") || "";

const ApiUser = async () => {
  const url = `http://localhost:8000/v1/users?limit=10&page=1`;
  const response = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + JSON.parse(data).access.token,
    },
  });
  const result = response.status === 200 ? response.data : [];
  return result;
};

const List: React.FC = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    (async () => {
      const dataUser = await ApiUser();
      console.log(dataUser);
      if (dataUser) {
        setUser(dataUser.results);
      }
    })();
  }, []);
  return (
    <>
      <Table className="list-user" dataSource={user} columns={columns} />;
    </>
  );
};
export default List;
