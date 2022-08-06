import React, { useEffect, userState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { fetchChatViewInMessage } from "../../../store/reducers/chat";
import { chatJoin } from "../../../utils/webSocket";
import "./MessageContent.scss";

const MessageContent = () => {
    const dispatch = useDispatch();
    const chat = useSelector((state) => state.chat);
    useEffect(() => {
        dispatch(fetchChatViewInMessage(chat.messageId));
    }, [chat.messageId]);
    const user = localStorage.getItem("user");
    return (
        <div className="message-content">
            {chat.listContent &&
                chat.listContent.map((ele, index) => {
                    if (JSON.parse(user).id === ele.userId) {
                        return (
                            <div key={index}>
                                <div className="messSender">
                                    <span>
                                        {moment(ele.createdAtcontent).fromNow()}
                                    </span>
                                    <p>{ele.content}</p>
                                </div>
                            </div>
                        );
                    } else {
                        return (
                            <div key={index}>
                                <div className="MessReceiver">
                                    <span>
                                        {moment(ele.createdAtcontent).fromNow()}
                                    </span>
                                    <p>{ele.content}</p>
                                </div>
                            </div>
                        );
                    }
                })}
        </div>
    );
};

export default MessageContent;
