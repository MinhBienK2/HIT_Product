import React from 'react';
import logo from '../../../assets/images/Logo.png';
import onlineWord from '../../../assets/images/Online world-amico 1.png';
import './Choice.scss'
import {useNavigate} from 'react-router-dom'

function ForgetPass() {


    const navigate = useNavigate();

    const handleLogin =() =>{
        navigate('/')
    }

    const handleSignup=()=>{
        navigate('/Signup')
    }

    const handleNewPass = () =>{
        navigate('/NewPass')
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
                    <div className="choice__main-right">
                        <div className="choice__main-right-choices">
                            <p>Đặt lại mật khẩu</p>
                            <span className="choice__main-right-choices-text">Bạn muốn đặt mật khẩu theo cách nào:</span>
                            <form className="choice__main-right-choices-items">
                                <div className="choice__main-right-choices-items-choice">
                                    <div className="choice__main-right-choices-items-choice-item">
                                        <input
                                            type="radio"
                                            name="choice"
                                            value='email'
                                        />
                                        <p>Gửi mã qua email</p>
                                    </div>
                                    <p className="choice__main-right-choices-items-choice-note">abc@gmail.com</p><br/>
                                </div>
                                <div className="choice__main-right-choices-item-choice">
                                    <div className="choice__main-right-choices-items-choice-item">
                                        <input
                                            type="radio"
                                            name="choice"
                                            value='SDT'
                                        />
                                        <p>Gửi mã qua số điện thoại</p>
                                    </div>
                                    <p className="choice__main-right-choices-items-choice-note">(+84) 123456789</p><br/>
                                </div>
                            </form>
                            <button onClick={handleNewPass}>Tiếp tục</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ForgetPass;
