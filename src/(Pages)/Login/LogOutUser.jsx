import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "../../Context/InfoContext";

const LogOutUser = () => {
  const { setUser } = useContext(InfoContext); // Lấy setUser từ context
  const nav = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");

    setUser(null); // Đặt lại thông tin người dùng trong context
    nav("/"); // Chuyển hướng về trang chính
  };

  return (
    <div>
      <button className="" onClick={handleLogOut}>
        Đăng xuất
      </button>
    </div>
  );
};

export default LogOutUser;
