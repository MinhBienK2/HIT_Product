import React from 'react';
import logo from '../../assets/images/Logo.svg';
import onlineWord from '../../assets/images/Online world-amico 1.svg';
import facebook from '../../assets/icons/facebook-icon.svg';
import './Login.scss'
import {useNavigate} from 'react-router-dom'
import { useState, useEffect} from 'react';
import axios from 'axios'
import storageService from '../../services/storage.service';

function Login() {

    const handleSubmit = async() => {
        try {
            const data = await axios({
                method: 'post',
                url: 'http://localhost:3000/login',
                data: {
                    email: `${username}`,
                    password: `${password}`
                }
            })
            
            if(data.data.status === 'success') {
                storageService.set("accessToken", data.data.token)
                storageService.setObject("userInfo", data.data.data)
                storageService.set("loggedIn", true)

                navigate('/home')
            }
        }
        catch (err) {
            alert('Invalid username or password')
        }
      }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsername = (e) =>{
        setUsername(e.target.value);
    }

    const handlePassword = (e) =>{
        setPassword(e.target.value);
    }

    const navigate = useNavigate();

    const handleForgetPass =() =>{
        navigate('/ForgetPass')
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
                        <button className='login__taskbar-right-btn1'>Đăng nhập</button>
                        <button className='login__taskbar-right-btn2' onClick={handleSignup}>Đăng kí</button>
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
                                    <input 
                                        className="login__main-right-content-signin-input-input1" 
                                        type="email" 
                                        name='email'
                                        placeholder=" Nhập email" 
                                        onChange={handleUsername}
                                    />
                                </div>
                                <div className="login__main-right-content-signin-input">
                                    <p>Mật khẩu</p>
                                    <input 
                                        className="login__main-right-content-signin-input-input2" 
                                        type="password" 
                                        name='password'
                                        placeholder=" Nhập password" 
                                        onChange={handlePassword}
                                    />
                                </div>
                            </div>
                            <p className="login__main-right-content-forget" onClick={handleForgetPass}>Quên mật khẩu?</p>
                            <button className="login__main-right-content-btn" onClick={handleSubmit}>Đăng nhập</button>
                            <button className="login__main-right-content-facebook">
                                Đăng nhập bằng tài khoản Facebook
                                <img src={facebook} alt="" />
                            </button>
                            <div className="login__main-right-content-register">
                                <p className="login__main-right-content-register-p1">Bạn đã có tài khoản chưa?</p>
                                <p className="login__main-right-content-register-p2" onClick={handleSignup}>Đăng kí</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
