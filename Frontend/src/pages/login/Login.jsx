import React, { useEffect, useState } from "react";
import logo from '../../assets/images/Logo.svg';
import onlineWord from '../../assets/images/Online world-amico 1.svg';
import facebook from "../../assets/icons/facebook-icon.svg";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import Axios from "../../services/axios.service";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { UpdateUserState } from "../../store/reducers/chat";

function Login() {
   const dispatch = useDispatch();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   //    useEffect(() => {}, []);

   const navigate = useNavigate();

  

   const handleSend = () => {
      Axios({
         method: "POST",
         withCredentials: true,
         url: "http://localhost:3000/login",
         data: {
            email: email,
            password: password,
         },
      })
         .then((data) => {
            if (data.status === "success") {
               localStorage.setItem(
                  "user",
                  JSON.stringify({
                     id: data.data._id,
                     name: data.data.name,
                     avatar : data.data.avatar,
                     firstName : data.data.firstName,
                     lastName : data.data.lastName,
                     role : data.data.role,
                     email : data.data.email
                  })
               );
               localStorage.setItem("accessToken", data.token);
               navigate("/");
               localStorage.setItem('isLogin', true)
               window.location.reload()
            }
         })
         .catch((err) => {
            console.log(err);
            alert(err.response.data.message)
         });
   };

   const handleForgetPass = () => {
      navigate("/Register");
   };

   const handleAuthFB = () => {
      window.location =
         " https://d95c-171-229-219-60.ap.ngrok.io/auth/facebook";
   };

   const handleSignup = () => {
      navigate("/Signup");
   }

   const handleLogin = () => {
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
                  <button className="login__taskbar-right-btn1" onClick={handleLogin}> 
                     ????ng nh???p
                  </button>
                  <button className="login__taskbar-right-btn2" onClick={handleSignup}>????ng k??</button>
               </div>
            </div>
            <div className="login__main">
               <div className="login__main-left">
                  <img src={onlineWord} alt="" />
               </div>
               <div className="login__main-right">
                  <div className="login__main-right-content">
                     <p className="login__main-right-content-title">
                        ????NG NH???P
                     </p>
                     <div className="login__main-right-content-signin">
                        <div className="login__main-right-content-signin-input">
                           <p>T??n ????ng nh???p</p>
                           <input
                              className="login__main-right-content-signin-input-input1"
                              type="email"
                              placeholder=" Nh???p email"
                              name="email"
                              onChange={(e) => {
                                 setEmail(e.target.value);
                              }}
                           />
                        </div>
                        <div className="login__main-right-content-signin-input">
                           <p>M???t kh???u</p>
                           <input
                              className="login__main-right-content-signin-input-input2"
                              type="password"
                              placeholder=" Nh???p password"
                              name="password"
                              onChange={(e) => {
                                 setPassword(e.target.value);
                              }}
                           />
                        </div>
                     </div>
                     <p
                        className="login__main-right-content-forget"
                        onClick={handleForgetPass}
                     >
                        Qu??n m???t kh???u?
                     </p>
                     <button
                        className="login__main-right-content-btn"
                        onClick={() => {
                           handleSend();
                        }}
                     >
                        ????ng nh???p
                     </button>
                     <button
                        className="login__main-right-content-facebook"
                        onClick={handleAuthFB}
                     >
                        ????ng nh???p b???ng t??i kho???n Facebook
                        <img src={facebook} alt="" />
                     </button>
                     <div className="login__main-right-content-register" >
                        <p className="login__main-right-content-register-p1">
                           B???n ???? c?? t??i kho???n ch??a?
                        </p>
                        <p className="login__main-right-content-register-p2" onClick={handleSignup}>
                           ????ng k??
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Login;
