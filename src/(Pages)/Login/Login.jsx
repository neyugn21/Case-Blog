import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import baseAxios, { METHOD_HTTP } from "../../baseAxios/BaseAxios";
import { InfoContext } from "../../Context/InfoContext";

const Login = () => {
  const { getInfo } = useContext(InfoContext);
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
      localStorage.setItem("token", data.token); // Lưu token vào localStorage

      // Gọi getInfo() để cập nhật thông tin người dùng ngay lập tức
      await getInfo();

      alert("Đăng nhập thành công!");
      nav("/"); // Chuyển hướng về trang chính
    } catch (error) {
      LoginErrorSet(error.message); // Hiển thị lỗi đăng nhập
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-action-left">
          <div className="auth-form-outer">
            <h2 className="auth-form-title">Login</h2>
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
              <input
                type="password"
                className="auth-form-input"
                placeholder="Password"
                {...register("password", {
                  required: "Không được trống Password",
                })}
              />
              {errors.password && (
                <small className="text-danger">{errors.password.message}</small>
              )}
              {LoginError && (
                <small className="text-danger">{LoginError}</small>
              )}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
