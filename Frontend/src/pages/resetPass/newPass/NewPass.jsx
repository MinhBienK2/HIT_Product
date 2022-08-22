import React from "react";
import logo from "../../../assets/images/Logo.svg";
import onlineWord from "../../../assets/images/Online world-amico 1.svg";
import "./NewPass.scss";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import Axios from "../../../services/axios.service";
import axios from "axios";

function NewPass() {
    const navigate = useNavigate();
    const { tokenId } = useParams();

    const handleSignup = () => {
        navigate("/Signup");
    };
    const handleLogin = () => {
        navigate("/Login");
    };

    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Required")
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    "Password must be 7-19 characters and contain at least one letter, one number and a special character"
                ),
            confirmPassword: Yup.string()
                .required("Required")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
        }),
    });

    function handleConfirmPass() {
        axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_BACKEND_URL}/confirm-password/${tokenId}`,
            withCredentials: true,
            data: {
                password: `${formik.values.password}`,
                confirmPassword: `${formik.values.confirmPassword}`,
            },
        })
            .then((data) => {
                console.log(data);
                // if (data.status === "success") {
                //     alert("success!");
                //     navigate("/");
                // }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <form>
            <div className="body">
                <div className="login">
                    <div className="login__taskbar">
                        <div className="login__taskbar-left">
                            <img src={logo} alt="" />
                            <div className="login__taskbar-left-text">
                                <p className="text1">GAR</p>
                                <p className="login__taskbar-left-text-text2">
                                    RICK
                                </p>
                            </div>
                        </div>
                        <div className="login__taskbar-right">
                            <button
                                className="login__taskbar-right-btn1"
                                onClick={handleLogin}
                            >
                                Đăng nhập
                            </button>
                            <button
                                className="login__taskbar-right-btn2"
                                onClick={handleSignup}
                            >
                                Đăng kí
                            </button>
                        </div>
                    </div>
                    <div className="newPass__main">
                        <div className="newPass__main-left">
                            <img src={onlineWord} alt="" />
                        </div>
                        <div className="newPass__main-right">
                            <div className="newPass__main-right-outer">
                                <div className="newPass__main-right-outer-title">
                                    Nhập mật khẩu mới
                                </div>
                                <div className="newPass__main-right-outer-text">
                                    Mật khẩu mới yêu cầu tối thiểu 8 kí tự,
                                    trong đó có chứa các kí tự đặc biệt, chữ, số
                                    và chữa cái in hoa.
                                </div>
                                <div className="newPass__main-right-outer-info">
                                    <div className="newPass__main-right-outer-info-items">
                                        <div className="newPass__main-right-outer-info-items-item">
                                            <p>Mật khẩu mới</p>
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                            />
                                        </div>
                                        {formik.touched.password &&
                                        formik.errors.password ? (
                                            <div className="error">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="newPass__main-right-outer-info-items">
                                        <div className="newPass__main-right-outer-info-items-item">
                                            <p>Nhập lại mật khẩu</p>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                onChange={formik.handleChange}
                                                value={
                                                    formik.values
                                                        .confirmPassword
                                                }
                                            />
                                        </div>
                                        {formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword ? (
                                            <div className="error">
                                                {formik.errors.confirmPassword}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <button onClick={handleConfirmPass}>
                                    Hoàn thành
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default NewPass;
