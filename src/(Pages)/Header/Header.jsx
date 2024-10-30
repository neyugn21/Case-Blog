import React, { useContext, useEffect } from "react";
import Logo from "../../../public/Lesson.@2x.svg";
import { Link } from "react-router-dom";
import { Button, Dropdown, Space } from "antd";
import { InfoContext } from "../../Context/InfoContext";
import { DownOutlined } from "@ant-design/icons";
import LogOutUser from "../Login/LogOutUser";
import UserPage from "../user/UserPage";

const Header = () => {
  const { user, getInfo } = useContext(InfoContext);

  useEffect(() => {
    getInfo(); // Lấy thông tin người dùng khi component load
  }, []);

  const items = [
    {
      label: <Link to={"/profile"}>Profile</Link>,
      key: "0",
    },
    {
      label: <LogOutUser />,
      key: "1",
    },
    {
      type: "divider",
    },
  ];

  return (
    <header className="header fixed">
      <div className="main-content">
        <div className="body-header">
          <Link to={"/"}>
            <img src={Logo} alt="Lesson" className="logo" />
          </Link>

          <nav className="nav">
            <ul>
              <li className="active">
                <a href="#!">Home</a>
              </li>
              <li>
                <Link to={"/blog"}>Blog</Link>
              </li>
              <li>
                <a href="#!">Pricing</a>
              </li>
              <li>
                <a href="#!">Reviews</a>
              </li>
            </ul>
          </nav>

          <div className="action ">
            {user ? (
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <span className="font-bold text-red-600">
                      {user.username}
                    </span>
                    <span>
                      <img
                        src={user.image}
                        className="rounded-full"
                        width={30}
                        alt=""
                      />
                    </span>
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            ) : (
              <Button className="bg-black rounded-full " type="primary">
                <Link to="/register">Sign up</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
