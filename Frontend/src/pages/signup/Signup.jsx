import React from 'react';
import logo from '../../assets/images/Logo.svg';
import onlineWord from '../../assets/images/Online world-amico 1.svg';
import './Signup.scss'
import {useNavigate} from 'react-router-dom'
import {useFormik} from 'formik';
import {useState} from 'react'
import * as Yup from 'yup';
import axios from 'axios';

function Signup() {


    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            lastName: Yup.string().required('Required'),
            firstName: Yup.string().required('Required'),
            email: Yup.string()
                .matches(
                    /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    "Please enter a valid email address")
                .required('Required'),
            password: Yup.string()
                .matches(
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                "Password must be 7-19 characters and contain at least one letter, one number and a special character"
                )
                .required('Required'),
            confirmPassword: Yup.string()
                    .required('Required')
                    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
            phoneNumber: Yup.string()
                    .required('Required')
                    .matches(
                        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
                        "Must be a valid phone number"
                      ),
        }),
        onSubmit: () => {
            navigate('/login')
        }
    })

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        axios({
                method: 'post',
                url: 'http://localhost:3000/signup',
                withCredentials: true,
                data: {
                    firstName: `${formik.values.firstName}`,
                    lastName: `${formik.values.lastName}`,
                    email: `${formik.values.email}`,
                    password: `${formik.values.password}`,
                    confirmPassword: `${formik.values.confirmPassword}`,
                    phoneNumber : `${formik.values.phoneNumber}`
                }
            }).then(data => {
                alert(data.status)
                if(data.status === 'success')
                     navigate('/login')
                    console.alert("Sign up successfully")

            }).catch(err => {
                console.log(err)
                // alert(err.response.data.message)
            })
     } 

    const handleLogin =() =>{
        navigate('/login')
        console.alert("Sign up successfully")
    }

    // console.log(formik.values)
    

    return (
        <form onSubmit={handleSubmit}>
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
                            <button className='signup__taskbar-right-btn1' >Đăng nhập</button>
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
                                    <div className="signup__main-right-outer-info-items">
                                        <div className="signup__main-right-outer-info-items-item">
                                            <p>Họ</p>
                                            <input
                                                type="text"
                                                id='lastName'
                                                name='lastName'
                                                onChange={formik.handleChange}
                                                value={formik.values.lastName}
                                                />
                                        </div>
                                    {formik.errors.lastName && formik.touched.lastName ? (
                                        <div className="error">{formik.errors.lastName}</div>
                                        ):null}
                                    </div>

                                    <div className="signup__main-right-outer-info-items">
                                        <div className="signup__main-right-outer-info-items-item">
                                            <p>Tên</p>
                                            <input
                                                type="text"
                                                id='firstName'
                                                name='firstName'
                                                onChange={formik.handleChange}
                                                value={formik.values.firstName}
                                            />
                                        </div>
                                        {formik.errors.firstName && formik.touched.firstName ? (
                                            <div className="error">{formik.errors.firstName}</div>
                                        ):null}
                                    </div>

                                    <div className="signup__main-right-outer-info-items">
                                        <div className="signup__main-right-outer-info-items-item">
                                            <p>Mật khẩu</p>
                                            <input
                                                type="password"
                                                id='password'
                                                name='password'
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                                />
                                        </div>
                                        {formik.touched.password && formik.errors.password ? (
                                                <div className='error'>{formik.errors.password}</div>
                                            ) : null}
                                    </div>

                                    <div className="signup__main-right-outer-info-items">
                                        <div className="signup__main-right-outer-info-items-item">
                                            <p>Nhập lại mật khẩu</p>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type="password"
                                                onChange={formik.handleChange}
                                                value={formik.values.confirmPassword}
                                                />
                                        </div>
                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                                <div className='error'>{formik.errors.confirmPassword}</div>
                                            ) : null}
                                    </div>

                                    <div className="signup__main-right-outer-info-items">
                                        <div className="signup__main-right-outer-info-items-item" >
                                            <p htmlFor='email'>Email</p>
                                            <input
                                                type="email"
                                                id='email'
                                                name='email'
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                                // placeholder="Nhập email"
                                                />
                                        </div>
                                        {formik.touched.email && formik.errors.email ? (
                                            <div className='error'>{formik.errors.email}</div>
                                        ) : null}
                                    </div>

                                    <div className="signup__main-right-outer-info-items">
                                        <div className="signup__main-right-outer-info-items-item">
                                            <p>Số điện thoại</p>
                                            <input
                                                type="text"
                                                id='phoneNumber'
                                                name='phoneNumber'
                                                onChange={formik.handleChange}
                                                value={formik.values.phoneNumber}
                                            />
                                        </div>
                                        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                            <div className='error'>{formik.errors.phoneNumber}</div>
                                        ) : null}
                                    </div>

                                </div>
                                <button onClick={handleLogin} type='submit'>Đăng kí</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default Signup;
