import React, { useContext, useEffect, useState } from "react";
import "./Style/login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import baseAxios, { METHOD_HTTP } from "../baseAxios/BaseAxios";
import { InfoContext } from "../Context/InfoContext";

const LoginAdmin = () => {
  const { getInfo, user } = useContext(InfoContext);

  const [LoginError, LoginErrorSet] = useState("");
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      let data = await baseAxios(METHOD_HTTP.POST, "/login", formData);

      // const users = localStorage.setItem("users", data.username);
      // console.log(users);

      console.log("Data", data);
      if (data.username === "admin") {
        alert("Đăng nhập thành công!");
        nav("/admin");
        localStorage.setItem("token", data.token);
        localStorage.getItem("token");
      } else {
        alert("Không có quyền truy cập!");
      }

      // if()
    } catch (error) {
      LoginErrorSet(error.message);
    }
  };
  useEffect(() => {
    getInfo();
  }, []);
  console.log("usecontext", user);

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-action-left">
          <div className="auth-form-outer">
            <h2 className="auth-form-title">Login Admin</h2>
            <div className="auth-external-container">
              <div className="auth-external-list">
                <ul>
                  <li>
                    <a href="#">
                      <i className="fa fa-google"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <p className="auth-sgt">or sign in with:</p>
            </div>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="auth-form-input"
                placeholder="username"
                {...register("username", {
                  required: "Không để trống Username",
                })}
              />
              {errors.username && (
                <small className="text-danger">{errors.username.message}</small>
              )}
              <div className="input-icon">
                <input
                  type="password"
                  className="auth-form-input"
                  placeholder="Password"
                  {...register("password", {
                    required: "Không được trống Password",
                  })}
                />
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
                {LoginError && (
                  <small className="text-danger">{LoginError}</small>
                )}
                <i className="fa fa-eye show-password"></i>
              </div>
              <label className=" activee">
                <input type="checkbox" name="email1" defaultChecked />
                <i className="fa fa-square-o"></i>
                <i className="fa fa-check-square-o"></i>
                <span> Remember password.</span>
              </label>
              <div className="footer-action">
                <input type="submit" value="Login" className="auth-submit" />
              </div>
            </form>
            {/* <div className="auth-forgot-password">
              <a href="#">Forgot Password</a>
            </div> */}
          </div>
        </div>
        {/* <div className="auth-action-right">
          <div className="auth-image">
            <img
              src="https://cdn2.iconfinder.com/data/icons/user-23/512/User_Administrator_1.png"
              alt="login"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginAdmin;
