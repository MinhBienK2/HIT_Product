import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Axios from "../services/axios.service";

const AuthGuard = (isLogin) => {
    const navigate = useNavigate();
    // console.log(isLogin);
    if (!isLogin.isLogin) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
};

export default AuthGuard;
