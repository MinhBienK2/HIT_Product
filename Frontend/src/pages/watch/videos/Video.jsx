import React, { useRef, useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import dot3 from "../../../assets/icons/Group 33.svg";
import tymIcon from "../../../assets/icons/clarity_heart-solid.svg";
import like from "../../../assets/icons/bx_like.svg";
import commentIcon from "../../../assets/icons/ant-design_comment-outlined.svg";
import share from "../../../assets/icons/bx_share.svg";
import send from "../../../assets/icons/fluent_send-28-filled.svg";
import "./Video.scss";
import axios from "axios";
import { Player, Hls } from "@vime/react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Axios from "../../../services/axios.service";

import heart from "../../../assets/icons/heart-solid.svg";
import heartRed from "../../../assets/icons/heartRed.svg";

import {
    addProfileName,
    addProfileAvatar,
    addProfileUserId,
} from "../../../store/reducers/profileOther";

function Video({
    profilePic,
    video,
    username,
    message,
    tym,
    comment,
    keyId,
    isCheckLike,
    ele,
}) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [checklike, setCheckLike] = useState();
    const [effectLike, setEffectLike] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        setCheckLike(tym);
        setEffectLike(isCheckLike);
    }, []);

    function handleClickLink(e) {
        e.preventDefault();
        console.log("effecLike: ", effectLike);
        try {
            setEffectLike(!effectLike);
            if (effectLike) {
                Axios({
                    method: "DELETE",
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/reactions/of-post/${ele._id}`,
                    withCredentials: true,
                })
                    .then((data) => {
                        if (data.status === "success") {
                            setCheckLike((current) => current - 1);
                            setEffectLike(!effectLike);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                Axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/reactions`,
                    withCredentials: true,
                    data: {
                        forPost: ele._id,
                    },
                })
                    .then((data) => {
                        if (data.status === "success") {
                            setCheckLike((current) => current + 1);
                            setEffectLike(!effectLike);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [show, setShow] = useState(false);
    const post = useSelector((state) => state.post);
    const check = useRef();

    const handleClick = () => {
        try {
            setShow(!show);
            if (show) {
                check.current.style.display = "block";
            } else {
                check.current.style.display = "none";
            }
        } catch (err) {
            console.log(err);
        }
    };
    function handleToProfileOther() {
        dispatch(addProfileName(username));
        dispatch(addProfileAvatar(profilePic));
        dispatch(addProfileUserId(ele.author.id));
        navigate(`/profile-others/${ele.author.id}`);
    }

    return (
        <div className="Video" key={keyId}>
            <div className="Video-top">
                <div className="Video-top-info">
                    <Avatar src={profilePic} />
                    <p>{username}</p>
                </div>
                <img src={dot3} alt="" />
            </div>
            <div className="Video-bottom">
                <p>{message}</p>
            </div>
            <div className="Video-image">
                {
                    <Player controls>
                        <Hls version="latest">
                            <source
                                data-src={video}
                                type="application/x-mpegURL"
                            />
                        </Hls>
                    </Player>
                }
            </div>
            <div className="Video-reaction">
                <div className="Video-reaction-tym">
                    {/* <img src={tymIcon} alt="" /> */}
                    <p>{checklike}</p>
                    <span> lượt yêu thích</span>
                </div>
                <div className="Video-reaction-comment">
                    <p>{comment} Bình luận</p>
                </div>
            </div>
            <div className="Video-options">
                <div className="Video-options-option" onClick={handleClickLink}>
                    {/* <img src={like} alt="" />
                    <p>Thích</p> */}
                    {effectLike ? (
                        <img className="isCheckLikeImg" src={heartRed} alt="" />
                    ) : (
                        <img src={heart} alt="" />
                    )}
                    {effectLike ? (
                        <p className="isCheckLikeP">Tym</p>
                    ) : (
                        <p>Tym</p>
                    )}
                </div>
                <div className="Video-options-option">
                    <img src={commentIcon} alt="" />
                    <p>Bình luận</p>
                </div>
                <div className="Video-options-option">
                    <img src={share} alt="" />
                    <p>Chia sẻ</p>
                </div>
            </div>
            <div className="Video-sendComment">
                <Avatar src={profilePic} />
                <input type="text" placeholder="Thêm bình luận..." />
                <img src={send} alt="" />
            </div>
            <div className="Video-comment">
                <Avatar src="" />
                <div className="Video-comment-content">
                    <div className="Video-comment-content_top">
                        <p>Nong nha nha nha nha </p>
                    </div>
                    <div className="Video-comment-content_bottom">
                        <p>Thích</p>
                        <p>Trả Lời</p>
                        <p>Gỡ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Video;
