import React, { useEffect } from "react";
import io from "socket.io-client";
import store from "../store/configStore";
import { useSelector } from "react-redux";
import Axios from "../services/axios.service";

import {
    setFriendId,
    setMessageId,
    setNameFriend,
    chatViewed,
    fetchTest,
    addChat,
} from "../store/reducers/chat.js";
import { setupSocketId } from "../store/reducers/socket";
import { notificationViewed, updateSkip } from "../store/reducers/notification";
import {
    setupIsVideoCall,
    setupLinkToPageVideoCall,
    setupFriendPeerId,
} from "../store/reducers/callVideo";

import { handleRealtimeComment } from "../store/reducers/comment";

const SERVER = `${process.env.REACT_APP_BACKEND_URL}`;

const { dispatch, getState } = store;
const callVideo2 = getState();

let socket;

export const connectWithWebSocket = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    socket = io(SERVER);
    socket.on("connection", () => {
        console.log("succesfully connected with wss server");
        console.log("socket client id: ", socket.id);
        dispatch(setupSocketId(socket.id));
        socket.emit("joinRoomByMyId", user.id);
        callActiveState(user.id, "active");
    });

    // socket.on("disconnect", () => {
    //     window.addEventListener("beforeunload", function () {
    //         socket.emit("hello", user.id);
    //         callActiveState(user.id, "not-active");
    //     });
    //     return "";
    // });

    socket.on("chatViewed", (data) => dispatch(addChat(data)));

    socket.on("notificationViewed", (data) =>
        setTimeout(() => {
            dispatch(notificationViewed(data));
        }, 1000)
    );

    socket.on("updateNotificationRead", (data) => {});

    socket.on("videoCalled", (data) => {
        dispatch(setupIsVideoCall());
        dispatch(
            setupLinkToPageVideoCall({
                room: data.room,
                friendId: data.friendId,
            })
        );
    });

    socket.on("sendPeerIdToReceiver", (peerId) => {
        console.log("pid ", peerId);
        dispatch(setupFriendPeerId(peerId));
    });

    socket.on("sendedComment", (data) => {
        console.log(data);
        dispatch(handleRealtimeComment(data));
    });
};

export const chatJoin = (data, userId) => {
    socket.emit("chatJoin", data, userId);
};

export const chatView = (data) => socket.emit("chatView", data);
export const chatLeave = (data) => socket.emit("chatLeave", data);
export const notificationView = (data) => socket.emit("notificationView", data);
export const callVideo = (data) => socket.emit("callVideo", data);
export const sendPeerIdToFriend = (data) =>
    socket.emit("sendPeerIdToFriend", data);
export const sendComment = (data) => socket.emit("sendComment", data);

function callActiveState(userID, stateName) {
    Axios({
        method: "PATCH",
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/state/${stateName}`,
        withCredentials: true,
        data: {
            userID,
        },
    });
}
