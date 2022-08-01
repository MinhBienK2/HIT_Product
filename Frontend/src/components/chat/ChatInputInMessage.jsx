import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "../../services/axios.service";

import { fetchChatInputWithMessage } from "../../store/reducers/chat";
// import { createNotification } from "../../store/reducers/notification";
import {
    chatView,
    chatJoin,
    chatLeave,
    notificationView,
} from "../../utils/webSocket";

const ChatInput = () => {
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const chat = useSelector((state) => state.chat);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        chatJoin(chat.messageId);
        return () => chatLeave(chat.messageId);
    }, [chat.messageId]);

    const handleInput = () => {
        try {
            dispatch(fetchChatInputWithMessage(message));
            // dispatch(createNotification(chat.messageId, chat.arrayFriendId));
            chatView({
                room: chat.messageId,
                userId: user.id,
                name: user.name,
                content: message,
            });
            notificationView({
                room: chat.messageId,
                arrayFriendId: chat.arrayFriendId,
            });
            setMessage("");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="sendMessage">
            <input
                type="text"
                name="content"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleInput}>send</button>
        </div>
    );
};

export default ChatInput;
