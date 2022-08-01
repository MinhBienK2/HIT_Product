import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Chatbox.scss";
import ChatInput from "../../components/chat/ChatInputInMessage";
import ChatView from "../../components/chat/chatViewInMessage";

import Axios from "../../services/axios.service";
import {
    addListMessage,
    renderListMessage,
} from "../../store/reducers/message";

import {
    setMessageId,
    fetchChatInput,
    fetchChatView,
    addElementToArrayFriendId,
    formatArrayFriendId,
} from "../../store/reducers/chat";

import { chatJoin } from "../../utils/webSocket";

const Chatbox = () => {
    const message = useSelector((state) => state.message);
    const chat = useSelector((state) => state.chat);
    const notification = useSelector((state) => state.notification);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(renderListMessage());
    }, []);

    const handleClick = (messageId, members) => {
        try {
            dispatch(setMessageId(messageId));
            dispatch(formatArrayFriendId());
            members.forEach((ele) => {
                dispatch(addElementToArrayFriendId(ele.memberId._id));
            });
            const user = localStorage.getItem("user");
            console.log(chat.messageId);
            console.log(JSON.parse(user).id);
            chatJoin(messageId, JSON.parse(user).id);
            // const userId = localStorage.getItem("user");
            // console.log(JSON.parse(userId).id);
            // dispatch(addElementToArrayFriendId(JSON.parse(userId).id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="container">
                <div className="list-message">
                    <h1>My List messages</h1>
                    {message.listMessage &&
                        message.listMessage.map((message, index) => {
                            return (
                                <h5
                                    key={message.messageId}
                                    onClick={() =>
                                        handleClick(
                                            message.messageId,
                                            message.members
                                        )
                                    }
                                >
                                    {message.members[0].memberId.id}-
                                    {message.members[0].memberId.name}-
                                    {notification.countMessageUnread}
                                </h5>
                            );
                        })}
                </div>
                <div className="container">
                    <div className="message-content">
                        <h1>Chat box</h1>
                        {chat.messageId && <ChatView />}
                        {chat.messageId && <ChatInput />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chatbox;
