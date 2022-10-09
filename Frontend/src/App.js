import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { publicRoutes } from "./routes/router";
import { connectWithWebSocket } from "./utils/webSocket";
import AuthGuard from "./middlewares/AuthGuard";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import ForgetPass from "./pages/forgetPass/ForgetPass";
import Choice from "./pages/resetPass/choice/Choice";
import NewPass from "./pages/resetPass/newPass/NewPass";
import CheckEmail from "./pages/resetPass/checkEmail/CheckEmail";

import Axios from "./services/axios.service";

function App() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [status, setStatus] = useState("");
    useEffect(() => {
        connectWithWebSocket();
    }, []);
    window.addEventListener("beforeunload", function (ev) {
        ev.preventDefault();
        callActiveState(user.id, "not-active");
        setTimeout(() => {
            return
        },1000)
        // return (ev.returnValue = "Are you sure you want to close?");
    });

    function callActiveState(userID, stateName) {
        Axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/state/${stateName}`,
            withCredentials: true,
            data: {
                userID,
            },
        });
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/login"
                        element={
                            localStorage.getItem("isLogin") ? (
                                <Navigate to="/" />
                            ) : (
                                <Login />
                            )
                        }
                    />
                    <Route
                        path="/Signup"
                        element={
                            localStorage.getItem("isLogin") ? (
                                <Navigate to="/" />
                            ) : (
                                <Signup />
                            )
                        }
                    />
                    <Route
                        path="/Choice"
                        element={
                            localStorage.getItem("isLogin") ? (
                                <Navigate to="/" />
                            ) : (
                                <Choice />
                            )
                        }
                    />
                    <Route
                        path="/ForgetPass"
                        element={
                            localStorage.getItem("isLogin") ? (
                                <Navigate to="/" />
                            ) : (
                                <ForgetPass />
                            )
                        }
                    />
                    <Route
                        path="/CheckEmail"
                        element={
                            localStorage.getItem("isLogin") ? (
                                <Navigate to="/" />
                            ) : (
                                <CheckEmail />
                            )
                        }
                    />
                    <Route
                        path="/NewPass/:tokenId"
                        element={
                            localStorage.getItem("isLogin") ? (
                                <Navigate to="/" />
                            ) : (
                                <NewPass />
                            )
                        }
                    />
                    <Route
                        element={
                            <AuthGuard
                                isLogin={
                                    localStorage.getItem("isLogin")
                                        ? localStorage.getItem("isLogin")
                                        : false
                                }
                            />
                        }
                    >
                        {publicRoutes.map((route, index) => {
                            const Layout = route.component;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={<Layout />}
                                />
                            );
                        })}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
