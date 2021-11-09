import React, { useState } from "react";
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
]; //hay de e thu xem, e laij co y trong dau ok
const data = sessionStorage.getItem("tokens") || ""; //data ay la gi day ạ, ket qua à....hong rep

// const listuser =  axios
//   .get(`http://localhost:8000/v1/users?limit=10&page=1`, {
//     headers: {
//       Authorization: "Bearer " + JSON.parse(data).access.token,
//     },
//   })
//   .then((res) => {
//     // res.data.result.forEach(function (e: any) {
//     //   dataSource.push(e);
//     // });// cho e thu lam xem ma,okh
//     // console.log(res.data);
//     const kq = res.data.results;
//     // console.log(kq);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// console.log(listuser); ////////////////////////////////////////////////
const ListUser = async () => {
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
  (async () => {
    const dataUser = await ListUser();
    console.log(dataUser);
    if (dataUser) {
      setUser(dataUser.results);
    }
  })();

  return (
    <>
      <Table className="list-user" dataSource={user} columns={columns} />;
    </>
  );
};
export default List;
