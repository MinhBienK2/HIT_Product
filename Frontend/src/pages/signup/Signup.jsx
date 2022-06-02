import React from 'react';
import logo from '../../assets/images/Logo.png';
import onlineWord from '../../assets/images/Online world-amico 1.png';
import './Signup.scss'
import {useNavigate} from 'react-router-dom'
import {useFormik} from 'formik';
import * as Yup from 'yup';

function Signup() {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string()
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
        })
    })


    const navigate = useNavigate();

    const handleLogin =() =>{
        navigate('/')
    }

    return (
        <form onSubmit={formik.handleSubmit}>
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
                            <button className='signup__taskbar-right-btn1' onClick={handleLogin}>Đăng nhập</button>
                            <button className='signup__taskbar-right-btn2'>Đăng kí</button>
                        </div>
                    </div>
                    <div className="signup__main">
                        <div className="signup__main-left">
                            <img src={onlineWord} alt="" />
                        </div>
                        <div className="signup__main-right">
                            <div className="signup__main-right-outer">
                                <p className="signup__main-right-outer-signup">ĐĂNG KÍ</p>
                                <div className="signup__main-right-outer-info">
                                    <div className="signup__main-right-outer-info-item">
                                        <p>Họ</p>
                                        <input type="text" />
                                    </div>
                                    <div className="signup__main-right-outer-info-item">
                                        <p>Tên</p>
                                        <input type="text" />
                                    </div>
                                    <div className="signup__main-right-outer-info-item">
                                        <p>Tên đăng nhập</p>
                                        <input type="text"/>
                                    </div>
                                        {formik.touched.password && formik.errors.password ? (
                                                <div className='error'>{formik.errors.password}</div>
                                            ) : null}
                                    <div className="signup__main-right-outer-info-item">
                                        <p>Mật khẩu</p>
                                        <input 
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={formik.handleChange}
                                            value={formik.values.password}
                                        />
                                    </div>
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className='error'>{formik.errors.email}</div>
                                        ) : null}
                                    <div className="signup__main-right-outer-info-item" >
                                        <p htmlFor='email'>Email</p>
                                        <input
                                            type="email"
                                            id='email'
                                            name='email'
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            placeholder="Nhập email"
                                        />
                                    </div>
                                    <div className="signup__main-right-outer-info-item">
                                        <p>Số điện thoại</p>
                                        <input type="text" />
                                    </div>
                                </div>
                                <button type='submit'>Đăng kí</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Signup;
