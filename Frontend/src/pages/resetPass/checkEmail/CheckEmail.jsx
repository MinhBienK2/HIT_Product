import React from 'react';
import logo from '../../../assets/images/Logo.svg';
import onlineWord from '../../../assets/images/Online world-amico 1.svg';
import './CheckEmail.scss'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect} from 'react';
import axios from 'axios'

function CheckEmail() {

    const navigate = useNavigate();

    const handleSignup=()=>{
        navigate('/Signup')
    }

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
                        <button className='login__taskbar-right-btn2' onClick={handleSignup}>Đăng kí</button>
                    </div>
                </div>
                <div className="login__main">
                    <div className="login__main-left">
                        <img src={onlineWord} alt="" />
                    </div>
                    <div className="CheckEmail__main-right">
                        <div className="CheckEmail__main-right-outer">
                            <p>Check email của bạn</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckEmail;
