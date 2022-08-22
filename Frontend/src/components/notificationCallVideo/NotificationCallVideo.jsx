import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./NotificationCallVideo.scss";
import {
    setupIsVideoCall,
    setupLinkToPageVideoCall,
} from "../../store/reducers/callVideo";
import { useNavigate } from "react-router-dom";

const NotificationCallVideo = () => {
    const dispatch = useDispatch();
    const callVideo = useSelector((state) => state.callVideo);
    const navigate = useNavigate();

    const clickSuccess = () => {
        try {
            dispatch(setupLinkToPageVideoCall(""));
            navigate(callVideo.linkToPageVideoCall);
        } catch (error) {
            console.log(error);
        }
    };

    const clickFail = () => {
        try {
            dispatch(setupIsVideoCall());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="notification-Call-Video">
            <div className="login-form">
                <div className="head-info">
                    <a href="#">
                        <img
                            id="border-image"
                            src={`${process.env.REACT_APP_BACKEND_URL}/images/photos/photos-62a0145202bdec9a37419707-1658248491721.jpeg`}
                        />
                    </a>
                    {/* <div className="head"><a href="#"><img src="http://localhost:3000/images/photos/photos-62a0145202bdec9a37419707-1658248491721.jpeg" /></a></div> */}
                </div>
                <div className="social-icons">
                    <h2>Ed Droste</h2>
                    <ul className="bottom-buttons">
                        <li onClick={clickSuccess}>
                            <a>
                                <i className="video"> </i>
                                <p>Talk</p>
                            </a>
                        </li>
                        <li onClick={clickFail}>
                            <a className="top-close">
                                <i className="close"> </i>
                                <p>Later</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotificationCallVideo;
