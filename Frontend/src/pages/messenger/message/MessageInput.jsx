import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import sendFile from "../../../assets/icons/fluent_attach-24-filled.svg";
import WhiteLike from "../../../assets/icons/WhiteLike.svg";
import { fetchChatInputWithMessage } from "../../../store/reducers/chat";
import {
    chatView,
    chatJoin,
    chatLeave,
    notificationView,
} from "../../../utils/webSocket";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const chat = useSelector((state) => state.chat);

    //    useEffect(() => {
    //         chatJoin(chat.messageId);
    //         return () => chatLeave(chat.messageId);
    //     }, [chat.messageId]);

    const handleInput = () => {
        try {
            dispatch(fetchChatInputWithMessage(message));
            const user = JSON.parse(localStorage.getItem("user"));
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
        <div className="message-input">
            <button>
                <img src={sendFile} alt="" height="18" width="18" />
            </button>
            <input
                type="text"
                value={message}
                name="content"
                placeholder="Nhập tin nhắn của bạn..."
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleInput}>
                <img src={WhiteLike} alt="" />
            </button>
        </div>
    );
};

export default MessageInput;
