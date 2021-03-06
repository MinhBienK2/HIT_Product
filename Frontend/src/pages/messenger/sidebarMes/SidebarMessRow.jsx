import React from 'react'
import {Avatar} from '@mui/material'
import dot from '../../../assets/icons/Ellipse 11.svg'
import './SidebarMessRow.scss'
import { useDispatch, useSelector } from "react-redux";

import {setMessageId,
    fetchChatInput,
    fetchChatView,
    addElementToArrayFriendId,
    formatArrayFriendId} from "../../../store/reducers/chat"
import {chatJoin} from "../../../utils/webSocket"
import {getNameWithClick} from '../../../store/reducers/message.js'

function SidebarMessRow({src, nickName, time, messenger, notify,key,messageId,members}) {
    
    const chat = useSelector((state) => state.chat);
    const notification = useSelector((state) => state.notification);
    const dispatch = useDispatch();

    const handleClick = (messageId, members) => {
        dispatch(setMessageId(messageId));
        dispatch(formatArrayFriendId());
        members.forEach((ele) => {
           dispatch(getNameWithClick(ele.memberId.name))
            dispatch(addElementToArrayFriendId(ele.memberId._id));
        });
        const user = localStorage.getItem("user");
        chatJoin(messageId, JSON.parse(user).id);
        const userId = localStorage.getItem("user");
        dispatch(addElementToArrayFriendId(JSON.parse(userId).id));
     };
    
    return (
    <div className="sidebarMessRow" key={key} onClick={() =>
        handleClick(messageId,members)
     }>
        {src ? <Avatar src={src}/> : <Avatar/>}
        <div className = "sidebarMessRow-center">
            <div className="sidebarMessRow-center-left">
                <div className="sidebarMessRow-center-left-nickName">
                    <p>{nickName}</p>
                    <img src={dot} alt="" />
                </div>
                <span>{messenger}</span>
            </div>
            <div className="sidebarMessRow-center-right">
                {notify ? <img src={notify}/> : null}
                <p>{time}</p>
            </div>
        </div>
    </div>
  )
}

export default SidebarMessRow