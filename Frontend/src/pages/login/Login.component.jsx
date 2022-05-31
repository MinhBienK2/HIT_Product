import React from 'react';
import logo from '../../assets/images/Logo.png';

function Login() {
    return (
        <div className="login">
            <div className="login__taskBar">
                <div className="login__taskbar-left">
                    <img src={logo} alt="" />
                </div>
            </div>
            <div className="login__main">
                <div className="login__main-left"></div>
                <div className="login__main-right"></div>
            </div>
        </div>
    );
}

export default Login;
