import React, { useEffect, userState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import { fetchChatView } from "../../../store/reducers/chat";
import { chatJoin } from "../../../utils/webSocket";
import "./MessageContentBegin.scss";

const MessageContentBegin = () => {
    const dispatch = useDispatch();
    const chat = useSelector((state) => state.chat);
    const user = localStorage.getItem("user");

    useEffect(() => {
        dispatch(fetchChatView());
    }, [chat.friendId]);

    return (
        <div className="message-content">
            {chat.listContent &&
                chat.listContent.map((ele, index) => {
                    if (JSON.parse(user).id === ele.userId) {
                        return (
                            <div key={index}>
                                {/* <p>{ele.name} -</p> */}
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

export default MessageContentBegin;
