import { Fragment, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./(Admin)/Dashboard";
import "./App.css";

import Register from "./(Admin)/Register";

import Home from "./(Pages)/Home";

import Users from "./(Admin)/Users";
import Blog from "./(Admin)/Blog";
import LogOut from "./(Admin)/LogOut";
import EditBlog from "./(Admin)/EditBlog";
import "./(Pages)/Style/main.css";
import BlogPage from "./(Pages)/Blog/BlogPage";
import LoginAdmin from "./(Admin)/LoginAdmin";
import Login from "./(Pages)/Login/Login";
import LogOutUser from "./(Pages)/Login/LogOutUser";
import Banner from "./(Pages)/Header/Banner/Banner";
import UserPage from "./(Pages)/user/UserPage";

// import Content from "./(Pages)/Content";
// import { InfoContext } from "./Context/InfoContext";

function App() {
  // const { user } = useContext(InfoContext);
  // console.log("App", user);
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Banner />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<UserPage />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="admin" element={<Dashboard />}>
          <Route path="blog" element={<Blog />} />
          <Route path="users" element={<Users />} />
          <Route path="edit/:id/" element={<EditBlog />} />
        </Route>

        <Route path="loginadmin" element={<LoginAdmin />} />
        <Route path="logout" element={<LogOut />} />

        <Route path="logoutuser" element={<LogOutUser />} />
      </Routes>
    </Fragment>
  );
}

export default App;
