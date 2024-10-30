import React, { useContext, useEffect, useState } from "react";
import "./Style/dasboard.scss";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
  SettingOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Layout, Menu, Row, Space, theme } from "antd";

import { Link, Outlet, useNavigate } from "react-router-dom";
import { InfoContext } from "../Context/InfoContext";
import LogOut from "./LogOut";
const { Header, Sider, Content } = Layout;

const items = [
  {
    key: "1",
    label: "My Account",
    disabled: true,
  },
  {
    type: "divider",
  },
  {
    key: "2",
    label: <Link to={"/admin/users"}>Profile</Link>,
    extra: "⌘P",
  },

  {
    key: "4",
    label: "",
    icon: <LogOut />,
    extra: "⌘L",
  },
];
const Dashboard = () => {
  const nav = useNavigate();
  const token = localStorage.getItem("token");
  console.log;
  if (!token) {
    nav("/login");
  }
  const { user, getInfo } = useContext(InfoContext);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      nav("/loginadmin");
    } else {
      getInfo();
    }
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="dashboard-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          className=""
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <ProductOutlined />,
              label: <Link to="/admin/blog">Blog</Link>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="/admin/users">Users</Link>,
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: "nav 3",
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: "nav 4",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row>
            <Col md={18}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 80,
                  height: 64,
                }}
              />
            </Col>
            <Col md={6}>
              <div className="flex items-center space-x-3">
                <span className="font-semibold">{user?.username}</span>
                <div className="flex items-center space-x-2 relative">
                  <img
                    src={user?.image}
                    width={40}
                    alt=""
                    className="object-cover rounded-full"
                  />
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a
                      className="absolute top-0 right-0"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Space>
                        <DownOutlined />
                      </Space>
                    </a>
                  </Dropdown>
                </div>
              </div>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
