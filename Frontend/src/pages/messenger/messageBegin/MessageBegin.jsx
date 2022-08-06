import React from "react";

import { useSelector, useDispatch } from "react-redux";

import "./MessageBegin.scss";
import sendFile from "../../../assets/icons/fluent_attach-24-filled.svg";
import WhiteLike from "../../../assets/icons/WhiteLike.svg";

import MessageContentBegin from "./MessageContentBegin";
import MessageInputBegin from "./MessageInputBegin";

function MessageBegin() {
    const message = useSelector((state) => state.message);

    return (
        <div className="message">
            <div className="message-title">
                <p>Tin nhắn từ</p>
                <span>{message.nameMessage}</span>
            </div>
            <MessageContentBegin />
            <MessageInputBegin />
        </div>
    );
}

export default MessageBegin;
