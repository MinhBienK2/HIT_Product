import React, { useRef, useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Player, Hls } from "@vime/react";
import Photogrid from "react-facebook-photo-grid";
// import "./Post.scss";

import Axios from "../../services/axios.service";
import dot3 from "../../assets/icons/Group 33.svg";
import tymIcon from "../../assets/icons/clarity_heart-solid.svg";
import like from "../../assets/icons/bx_like.svg";
import heart from "../../assets/icons/heart-solid.svg";
import heartRed from "../../assets/icons/heartRed.svg";
import commentIcon from "../../assets/icons/ant-design_comment-outlined.svg";
import share from "../../assets/icons/bx_share.svg";
import send from "../../assets/icons/fluent_send-28-filled.svg";
import save from '../../assets/icons/heroicons-outline_save.svg'
import notificationOff from '../../assets/icons/mi_notification-off.svg'
import report from "../../assets/icons/ri_user-unfollow-line.svg"

function PostProfile({
    profilePic,
    images,
    videos,
    username,
    message,
    tym,
    comment,
    key,
    isCheckLike,
    ele,
}) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [checklike, setCheckLike] = useState();
    const [effectLike, setEffectLike] = useState();
    useEffect(() => {
        setCheckLike(tym);
        setEffectLike(isCheckLike);
    }, []);

    function handleClickLink(e) {
        e.preventDefault();
        console.log('effecLike: ',effectLike);
        try {
            setEffectLike(!effectLike);
            if (effectLike) {
                Axios({
                    method: "DELETE",
                    url: `http://localhost:3000/api/v1/reactions/of-post/${ele._id}`,
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
                    url: `http://localhost:3000/api/v1/reactions`,
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
    const check = useRef()

    const handleClick = () => {
                try{
                    setShow(!show);
                    if (show) {
                        check.current.style.display='block'
                    }
                    else{
                        check.current.style.display='none'
                    }

                }catch(err) {
                    console.log(err);
                }
        console.log(show)
    }

    const config = {
        method: 'delete',
        url: '{{URL}}/api/v1/post/',
        headers: { }
      };
      
      Axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    return (
        <div className="post" key={key}>
            <div className="post-top">
                <div className="post-top-info">
                    <Avatar src={profilePic} />
                    <p>{username}</p>
                </div>

                <div className="post-top-dropdownMenu">
                    <img src={dot3} alt="" onClick={handleClick}/>
                    <div className="post-top-dropdownMenu-menu" ref={check}>
                        <div className="post-top-dropdownMenu-menu-item">
                            <img src={save} alt=""/>
                            <p>Lưu bài viết</p>
                        </div>
                        <div className="post-top-dropdownMenu-menu-item">
                            <img src={notificationOff} alt=""/>
                            <p>Tắt thông báo bài viết này</p>
                        </div>
                        <div className="post-top-dropdownMenu-menu-item">
                            <img src={report} alt=""/>
                            <p>Báo cáo</p>
                        </div>
                        <div className="post-top-dropdownMenu-menu-item">
                            <img src={report} alt=""/>
                            <p>Xóa</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="post-bottom">
                <p>{message}</p>
            </div>
            <div className="post-image">
                {images.map((ele, index) => {
                    return (
                        <>
                            <img key={index} src={ele} alt="" />
                        </>
                    );
                })}

                {/* {images && <Photogrid
                    images={images} 
                    maxWidth={400} 
                ></Photogrid>} */}

                {videos.map((ele, index) => {
                    return (
                        <Player controls key={index}>
                            <Hls version="latest">
                                <source
                                    data-src={ele}
                                    type="application/x-mpegURL"
                                />
                            </Hls>
                        </Player>
                    );
                })}
            </div>
            <div className="post-reaction">
                <div className="post-reaction-tym">
                    {/* <img src={tymIcon} alt="" /> */}
                    <p>{checklike}</p>
                    <span>lượt yêu thích</span>
                </div>
                <div className="post-reaction-comment">
                    <p>{comment} Bình luận</p>
                </div>
            </div>
            <div className="post-options">
                <div className="post-options-option" onClick={handleClickLink}>
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
                <div className="post-options-option">
                    <img src={commentIcon} alt="" />
                    <p>Bình luận</p>
                </div>
                <div className="post-options-option">
                    <img src={share} alt="" />
                    <p>Chia sẻ</p>
                </div>
            </div>
            <div className="post-sendComment">
                <Avatar src={user.avatar} />
                <input type="text" placeholder="Thêm bình luận..." />
                <img src={send} alt="" />
            </div>
            <div className="post-comment">
                <Avatar src="" />
                <div className="post-comment-content">
                    <div className="post-comment-content_top">
                        <p>Nong nha nha nha nha </p>
                    </div>
                    <div className="post-comment-content_bottom">
                        <p>Thích</p>
                        <p>Trả Lời</p>
                        <p>Gỡ</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostProfile;
