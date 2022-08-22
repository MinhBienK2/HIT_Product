import React from "react";
import logo from "../../assets/images/Logo.svg";
import onlineWord from "../../assets/images/Online world-amico 1.svg";
// import facebook from '../../assets/icons/facebook-icon.svg';
import "./ForgetPass.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ForgetPass() {
    const handleSubmit = async () => {
        try {
            const data = await axios({
                method: "post",
                url: `${process.env.REACT_APP_BACKEND_URL}/forgot-password`,
                data: {
                    email: `${useremail}`,
                },
            });
            navigate("/CheckEmail");
        } catch (err) {
            console.log(err);
        }
    };

    const navigate = useNavigate();

    const [useremail, setUseremail] = useState("");

    const handleUseremail = (e) => {
        setUseremail(e.target.value);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleSignup = () => {
        navigate("/Signup");
    };

    const handleChoice = () => {
        navigate("/Choice");
    };

    return (
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
                <div className="login__main">
                    <div className="login__main-left">
                        <img src={onlineWord} alt="" />
                    </div>
                    <div className="forgetPass__main-right">
                        <div className="forgetPass__main-right-outer">
                            <div className="forgetPass__main-right-outer-forget">
                                Quên mật khẩu
                            </div>
                            <p className="forgetPass__main-right-outer-text">
                                Vui lòng nhập tên đăng nhập hoặc Email của bạn
                            </p>
                            <div className="forgetPass__main-right-outer-input">
                                <p>Tên đăng nhập</p>
                                <input
                                    placeholder="Nhập email"
                                    type="email"
                                    name="email"
                                    onChange={handleUseremail}
                                />
                            </div>
                            <button onClick={handleSubmit}>Tiếp tục</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPass;
