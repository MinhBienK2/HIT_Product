import React, {useState} from 'react';
import './MessageSender.scss';
import live from '../../assets/icons/bxs_video-plus.svg'
import picture from '../../assets/icons/fontisto_picture.svg'
import emoji from '../../assets/icons/fluent_emoji-24-regular.svg'
import {Avatar} from "@mui/material"

function MessageSender() {

    const [input, setInput] = useState('')

    const handleSubmit =(e)=> {
        e.preventDefault()
        
        console.log(input)
        setInput('')
    }

    return (
        <div className="messageSender">
            <div className="messageSender-top">
                <Avatar/>
                <input 
                    input={input}
                    onChange={(e)=> setInput(e.target.value)}
                    type="text" 
                    placeholder="Bạn đang nghĩ gì?"
                />
            </div>

            <div className="messageSender-bottom">
                <div className="messageSender-bottom-options">
                    <div className="messageSender-bottom-options-option">
                        <img src={live} alt=""/>
                        <p>Phát trực tiếp</p>
                    </div>
                    <div className="messageSender-bottom-options-option">
                        <img src={picture} alt=""/>
                        <p>Ảnh/Video</p>
                    </div>
                    <div className="messageSender-bottom-options-option">
                        <img src={emoji} alt=""/>
                        <p>Cảm xúc/Hoạt động</p>
                    </div>
                </div>
                <button onClick={handleSubmit}>Đăng bài</button>
            </div>
        </div>
    );
}

export default MessageSender;
