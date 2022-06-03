import React from 'react';
import logo from '../../assets/images/Logo.png';
import onlineWord from '../../assets/images/Online world-amico 1.png';
// import facebook from '../../assets/icons/facebook-icon.svg';
import './Signup.scss'
import {useNavigate} from 'react-router-dom'

function Signup() {


    const navigate = useNavigate();

    const handlesignup =() =>{
        navigate('/signup')
    }

    return (
        <div className="body">
            <div className="signup">
                <div className="signup__taskbar">
                    <div className="signup__taskbar-left">
                        <img src={logo} alt="" />
                        <div className="signup__taskbar-left-text">
                            <p className="text1">GAR</p>
                            <p className="signup__taskbar-left-text-text2">RICK</p>
                        </div>
                    </div>
                    <div className="signup__taskbar-right">
                        <button className='signup__taskbar-right-btn1' onClick={handlesignup}>Đăng nhập</button>
                        <button className='signup__taskbar-right-btn2'>Đăng kí</button>
                    </div>
                </div>
                <div className="signup__main">
                    <div className="signup__main-left">
                        <img src={onlineWord} alt="" />
                    </div>
                    <div className="signup__main-right">
                        <div className="signup__main-right-outer">
                            <p>ĐĂNG KÍ </p>
                            <div className="signup__main-right-outer-info">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
