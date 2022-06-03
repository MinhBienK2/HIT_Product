import React from 'react';
import logo from '../../assets/images/Logo.png';
import onlineWord from '../../assets/images/Online world-amico 1.png';
import facebook from '../../assets/icons/facebook-icon.svg';
import './Login.scss'
import {useNavigate} from 'react-router-dom'

function Login() {


    const navigate = useNavigate();

    const handleForgetPass =() =>{
        navigate('/Register')
    }

    return (
        <div className="body">
            <div className="login">
                <div className="login__taskbar">
                    <div className="login__taskbar-left">
                        <img src={logo} alt="" />
                        <div className="login__taskbar-left-text">
                            <p className="text1">GAR</p>
                            <p className="login__taskbar-left-text-text2">RICK</p>
                        </div>
                    </div>
                    <div className="login__taskbar-right">
                        <button className='login__taskbar-right-btn1'>Đăng nhập</button>
                        <button className='login__taskbar-right-btn2'>Đăng kí</button>
                    </div>
                </div>
                <div className="login__main">
                    <div className="login__main-left">
                        <img src={onlineWord} alt="" />
                    </div>
                    <div className="login__main-right">
                        <div className="login__main-right-content">
                            <p className="login__main-right-content-title">ĐĂNG NHẬP</p>
                            <div className="login__main-right-content-signin">
                                <div className="login__main-right-content-signin-input">
                                    <p>Tên đăng nhập</p>
                                    <input className="login__main-right-content-signin-input-input1" type="email" placeholder=" Nhập email" />
                                </div>
                                <div className="login__main-right-content-signin-input">
                                    <p>Mật khẩu</p>
                                    <input className="login__main-right-content-signin-input-input2" type="password" placeholder=" Nhập password" />
                                </div>
                            </div>
                            <p className="login__main-right-content-forget" onClick={handleForgetPass}>Quên mật khẩu?</p>
                            <button className="login__main-right-content-btn">Đăng nhập</button>
                            <button className="login__main-right-content-facebook">
                                Đăng nhập bằng tài khoản Facebook
                                <img src={facebook} alt="" />
                            </button>
                            <div className="login__main-right-content-register">
                                <p className="login__main-right-content-register-p1">Bạn đã có tài khoản chưa?</p>
                                <p className="login__main-right-content-register-p2">Đăng kí</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
