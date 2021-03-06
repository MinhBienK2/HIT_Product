import React from 'react';
import {Avatar} from "@mui/material"
import dot3 from '../../../assets/icons/Group 33.svg'
import tymIcon from '../../../assets/icons/clarity_heart-solid.svg'
import like from '../../../assets/icons/bx_like.svg'
import commentIcon from '../../../assets/icons/ant-design_comment-outlined.svg'
import share from '../../../assets/icons/bx_share.svg'
import send from '../../../assets/icons/fluent_send-28-filled.svg'
import './Video.scss';
import axios from 'axios'

function Video({ profilePic, image, username, message, tym, comment }) {
    return (
        <div className="Video">
            <div className="Video-top">
                <div className="Video-top-info">
                    <Avatar src={profilePic}/>
                    <p>{username}</p>
                </div>
                <img src={dot3} alt=""/>
            </div>
            <div className="Video-bottom">
                <p>{message}</p>
            </div>
            <div className="Video-image">
                <img src={image} alt=""/>
            </div>
            <div className="Video-reaction">
                <div className="Video-reaction-tym">
                    <img src={tymIcon} alt=""/>
                    <p>{tym}</p>
                </div>
                <div className="Video-reaction-comment">
                    <p>{comment} Bình luận</p>
                </div>
            </div>
            <div className="Video-options">
                <div className="Video-options-option">
                    <img src={like} alt=""/>
                    <p>Thích</p>
                </div>
                <div className="Video-options-option">
                    <img src={commentIcon} alt=""/>
                    <p>Bình luận</p>
                </div>
                <div className="Video-options-option">
                    <img src={share} alt=""/>
                    <p>Chia sẻ</p>
                </div>
            </div>
            <div className="Video-sendComment">
                <Avatar src={profilePic}/>
                <input type="text" placeholder="Thêm bình luận..."/>
                <img src={send} alt=""/>
            </div>
            <div className="Video-comment">
                <Avatar src=''/>
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
