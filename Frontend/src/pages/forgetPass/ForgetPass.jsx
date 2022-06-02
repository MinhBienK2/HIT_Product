import React from 'react';
import logo from '../../assets/images/Logo.png';
import onlineWord from '../../assets/images/Online world-amico 1.png';
// import facebook from '../../assets/icons/facebook-icon.svg';
import './ForgetPass.scss'
import {useNavigate} from 'react-router-dom'

function ForgetPass() {


    const navigate = useNavigate();

    const handleLogin =() =>{
        navigate('/Login')
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
                        <button className='login__taskbar-right-btn1' onClick={handleLogin}>Đăng nhập</button>
                        <button className='login__taskbar-right-btn2'>Đăng kí</button>
                    </div>
                </div>
                <div className="login__main">
                    <div className="login__main-left">
                        <img src={onlineWord} alt="" />
                    </div>
                    <div className="login__main-right">
                        <div className="login__main-right-outer">
                            <div className="login__main-right-outer-forget">
                                <p>Quên mật khẩu</p>
                            </div>
                            <div className="login__main-right-outer-input">
                                <p>Tên đăng nhập</p>
                                <input type="text" placeholder="Tên đăng nhập hoặc email" />
                            </div>
                            <button>Tiếp tục</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPass;
