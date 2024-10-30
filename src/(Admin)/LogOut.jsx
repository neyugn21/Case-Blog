import React from "react";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const nav = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("users");

    nav("/loginadmin");
  };
  return (
    <div>
      <button className="" onClick={handleLogOut}>
        Đăng xuất
      </button>
    </div>
  );
};

export default LogOut;
