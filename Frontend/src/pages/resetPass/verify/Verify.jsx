import React from 'react';
import logo from '../../../assets/images/Logo.png';
import onlineWord from '../../../assets/images/Online world-amico 1.png';
import './Verify.scss'
import {useNavigate} from 'react-router-dom'

function Verify() {


    const navigate = useNavigate();

    const handleLogin =() =>{
        navigate('/login')
    }

    const handleSignup=()=>{
        navigate('/Signup')
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
                        <button className='login__taskbar-right-btn2' onClick={handleSignup}>Đăng kí</button>
                    </div>
                </div>
                <div className="login__main">
                    <div className="login__main-left">
                        <img src={onlineWord} alt="" />
                    </div>
                    <div className="verify__main-right">
                        <div className="verify__main-right-veri">
                            <div className="verify__main-right-veri-text">
                                Nhập mã bảo mật
                            </div>
                            <p>Vui lòng nhập mã của bạn:</p>
                            <div className="verify__main-right-veri-input">
                                <input type="text" />
                                <input type="text" />
                                <input type="text" />
                                <input type="text" />
                                <input type="text" />
                                <input type="text" />
                            </div>
                            <span>Bạn chưa nhận được mã?</span><br/>
                            <button>Tiếp tục</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verify;
