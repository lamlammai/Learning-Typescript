import React, { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
const cookies = new Cookies();
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
const handleLogout = () => {
  axios
    .post("http://localhost:8000/v1/auth/logout", {
      refreshToken: cookies.get("refresh_token"),
    })
    .then((res) => {
      if (res.status == 204) {
        // neu dang xuat thanh cong, mình can xoa token luu o cookie di
        cookies.remove("access_token");
        cookies.remove("refresh_token");
        //
        localStorage.removeItem("user");
        window.location.assign("http://localhost:3000/signin");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const data = cookies.get("access_token") || "";
const ApiUser = async () => {
  const url = `http://localhost:8000/v1/users?limit=10&page=1`;
  const response = await axios.get(url, {
    headers: {
      Authorization: "Bearer " + data.replace('"', ""),
    },
  });
  const result = response.status === 200 ? response.data : [];
  return result;
};

const List: React.FC = () => {
  if (!data) {
    return (
      <>
        <Link to="/signin">
          bạn chưa đăng nhập click đây để về trang đăng nhập
        </Link>
      </>
    );
  }
  const [user, setUser] = useState([]);
  useEffect(() => {
    (async () => {
      const dataUser = await ApiUser();
      if (dataUser == 401) {
        return (
          <>
            <p>Bạn không có quyền để xem danh sách</p>
          </>
        );
      }
      if (dataUser) {
        setUser(dataUser.results);
      }
    })();
  }, []);
  return (
    <>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Table className="list-user" dataSource={user} columns={columns} />;
    </>
  );
};
export default List;
