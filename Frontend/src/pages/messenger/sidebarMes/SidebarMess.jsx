import React,{ useState, useEffect } from 'react'
import './SidebarMess.scss'
import SidebarMessRow from './SidebarMessRow'
import search from '../../../assets/icons/akar-icons_search.svg'
import biChat from '../../../assets/icons/bi_chat.svg'
import newTab from '../../../assets/icons/carbon_new-tab.svg'
import {Avatar} from '@mui/material'
import dot from '../../../assets/icons/Ellipse 11.svg'
import ghim from '../../../assets/icons/bi_pin-angle.svg'
import moment from 'moment'

import { useDispatch, useSelector } from "react-redux";

// import ChatInput from "../../../components/chat"

import {renderListMessage} from "../../../store/reducers/message"

function SidebarMess() {
    const message = useSelector((state) => state.message);
   
   const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(renderListMessage());
    }, []);
 
   const user = localStorage.getItem("user");
 
  return (
    <div className="sidebarMess">
        <div className="sidebarMess__title">
            <div className="sidebarMess__title-left">
                <div className="sidebarMess__title-left-avatar">
                    <Avatar/>
                    <img src={dot} alt="" height="6" width="6"/>
                </div>
                <p>{JSON.parse(user).name}</p>
            </div>
            <div className="sidebarMess__title-right">
                <img src={biChat} alt="" />
                <img src={newTab} alt="" />
            </div>
        </div>
        <div className="sidebarMess-input">
          <img src={search} alt="search"/>
          <input type="text" placeholder="Tìm kiếm" />
        </div>
        <div className="sidebarMess-content">
            {message.listMessage && message.listMessage.map((message, index) => {
                return <SidebarMessRow 
                    // notify={ghim}
                    nickName= {message.members[0].memberId.name}
                    time={moment(message.contents[message.contents.length -1].createdAtcontent).fromNow()}
                    messenger={message.contents[message.contents.length -1].content}
                    key={message.members[0].memberId.id}
                    messageId = {message.messageId}
                    members = {message.members}
                />
            })}
        </div>
    </div>
  )
}

export default SidebarMess