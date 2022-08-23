import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import { callVideo } from "../utils/webSocket";

import chatReducer from "./reducers/chat";
import listFriendReducer from "./reducers/listFriend";
import messageReducer from "./reducers/message";
import notificationReducer from "./reducers/notification";
import postReducer from "./reducers/post";
import callVideo from "./reducers/callVideo";
import socket from "./reducers/socket";
import watch from "./reducers/watch";
import profileOther from "./reducers/profileOther";
import comment from "./reducers/comment";

export default configureStore({
    reducer: {
        chat: chatReducer,
        listFriend: listFriendReducer,
        message: messageReducer,
        notification: notificationReducer,
        post: postReducer,
        callVideo: callVideo,
        sockets: socket,
        watch: watch,
        profileOther: profileOther,
        comment: comment,
    },
    middleware: [...getDefaultMiddleware()],
});
