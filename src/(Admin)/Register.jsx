import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import baseAxios, { METHOD_HTTP } from "../baseAxios/BaseAxios";

const Register = () => {
  const [RegisterErr, setRegisterErr] = useState("");
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);
    const body = {
      ...formData,
      image: "",
    };
    try {
      const data = await baseAxios(METHOD_HTTP.POST, "/register", body);
      alert("Đăng ký thành công!");
      // console.log(data);
      // nav("/login"); // Điều hướng sau khi đăng ký thành công
    } catch (error) {
      setRegisterErr(error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-action-left">
          <div className="auth-form-outer">
            <h2 className="auth-form-title">Create Account</h2>
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
              <p className="auth-sgt">or use your email for registration:</p>
            </div>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="auth-form-input"
                placeholder="Name"
                {...register("username", {
                  required: "Không để trống username",
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
                    minLength: {
                      value: 6,
                      message: "Password phải nhất 6 ký tự",
                    },
                  })}
                />
                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
                <i className="fa fa-eye show-password"></i>
              </div>
              {RegisterErr && <p className="text-danger">{RegisterErr}</p>}

              <label className=" activee">
                <input type="checkbox" name="email1" defaultChecked />
                <i className="fa fa-square-o"></i>
                <i className="fa fa-check-square-o"></i>
                <span>
                  I agree to the <a href="#">Terms</a> and{" "}
                  <a href="#">Privacy Policy</a>.
                </span>
              </label>

              <div className="footer-action">
                <input type="submit" value="Register" className="auth-submit" />
                <Link to="/login" className="auth-btn-direct">
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
