import React from "react";
import io from "socket.io-client";
import store from "../store/configStore";

import {
    setFriendId,
    setMessageId,
    setNameFriend,
    chatViewed,
    fetchTest,
    addChat,
} from "../store/reducers/chat.js";

import { notificationViewed, updateSkip } from "../store/reducers/notification";

const SERVER = "http://localhost:3000";

const { dispatch } = store;

let socket;
export const connectWithWebSocket = () => {
    socket = io(SERVER);
    socket.on("connection", () => {
        console.log("succesfully connected with wss server");
        console.log("socket client id: ", socket.id);
    });

    socket.on("chatViewed", (data) => dispatch(addChat(data)));

    socket.on("notificationViewed", (data) =>
        setTimeout(() => {
            dispatch(notificationViewed(data));
        }, 1000)
    );

    socket.on("updateNotificationReaded", (data) => {});
};

export const chatJoin = (data, userId) => {
    socket.emit("chatJoin", data, userId);
};
export const chatView = (data) => socket.emit("chatView", data);
export const chatLeave = (data) => socket.emit("chatLeave", data);
export const notificationView = (data) => socket.emit("notificationView", data);
