import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

import {
    updateStatusRead,
    updateCountMessageUnread,
    createNotification,
} from "./notification";

const slice = createSlice({
    name: "chat",
    initialState: {
        friendId: "", // ca nhan
        arrayFriendId: [], // nhieu nguoi dung cho notification
        messageId: "", // code of a message
        user: {
            id: "",
            name: "",
        },
        nameFriend: "",
        listContent: [], // array message of a friendId
    },
    reducers: {
        setFriendId: (state, action) => {
            state.friendId = action.payload;
        },
        setMessageId: (state, action) => {
            state.messageId = action.payload;
        },
        UpdateUserState: (state, action) => {
            state.user.id = action.payload.id;
            state.user.name = action.payload.name;
        },
        setNameFriend: (state, action) => {
            state.nameFriend = action.payload;
        },
        chatViewed: (state, action) => {
            state.listContent = action.payload;
        },
        addChat: (state, action) => {
            // console.log(action.payload);
            state.listContent.push(action.payload);
        },
        addElementToArrayFriendId: (state, action) => {
            // if (!state.ArrayFriendId.includes(action.payload))
            state.arrayFriendId.push(action.payload);
        },
        formatArrayFriendId: (state, action) => {
            state.arrayFriendId = [];
        },
    },
    // extraReducers: (builder) => {
    //    builder
    //       .addCase(fetchTest.pending, (state, action) => {
    //          state.test.state = "loading";
    //       })
    //       .addCase(fetchTest.fulfilled, (state, action) => {
    //          state.test.testArr.push(action.payload);
    //          state.test.state = "idle";
    //       });
    // },
});

export const {
    setFriendId,
    setMessageId,
    UpdateUserState,
    setNameFriend,
    chatViewed,
    addChat,
    addElementToArrayFriendId,
    formatArrayFriendId,
} = slice.actions;

export const fetchChatInput = (valueMessage) => (dispatch, getState) => {
    if (getState().chat.listContent.length === 0) {
        Axios({
            method: "POST",
            url: `${
                process.env.REACT_APP_BACKEND_URL
            }/api/v1/messages/friend-id/${getState().chat.friendId}`,
            withCredentials: true,
        })
            .then(async (data) => {
                if (data.status === "success") {
                    dispatch(setMessageId(data.messageId));
                    localStorage.setItem(
                        "messageIdOfNotification",
                        data.messageId
                    );
                    Axios({
                        method: "POST",
                        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/messages/${data.messageId}`,
                        withCredentials: true,
                        data: {
                            content: valueMessage,
                        },
                    })
                        .then(async (data1) => {
                            console.log(data1);
                            const user = localStorage.getItem("user");
                            const response1 = await Axios({
                                method: "POST",
                                url: `${
                                    process.env.REACT_APP_BACKEND_URL
                                }/api/v1/notifications/message-id/${
                                    data.messageId
                                }/friend-id/${JSON.parse(user).id}`,
                                withCredentials: true,
                            });
                            if (response1.status === "success") {
                                await Axios({
                                    method: "PATCH",
                                    url: `${
                                        process.env.REACT_APP_BACKEND_URL
                                    }/api/v1/notifications/read/message-id/${
                                        data.messageId
                                    }/friend-id/${JSON.parse(user).id}`,
                                    withCredentials: true,
                                });
                            }
                            getState().chat.arrayFriendId.forEach(
                                async (ele) => {
                                    const response = await Axios({
                                        method: "POST",
                                        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications/message-id/${data.messageId}/friend-id/${ele}`,
                                        withCredentials: true,
                                    });
                                    if (response.status === "success") {
                                        dispatch(
                                            updateStatusRead(
                                                response.data.statusRead
                                            )
                                        );
                                        dispatch(
                                            updateCountMessageUnread(
                                                response.data.countMessageSended
                                            )
                                        );
                                        dispatch(setFriendId(ele));
                                    }
                                }
                            );
                        })
                        .catch((err1) => {
                            console.log(err1);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        Axios({
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/messages/${
                getState().chat.messageId
            }`,
            withCredentials: true,
            data: {
                content: valueMessage,
            },
        })
            .then((data1) => {
                console.log(data1);
                // dispatch(
                //    createNotification(
                //       getState().chat.messageId,
                //       getState().chat.arrayFriendId
                //    )
                // );
                getState().chat.arrayFriendId.forEach(async (ele) => {
                    // dispatch(updateStatusRead(res.data.statusRead));
                    // dispatch(updateCountMessageUnread(res.data.countMessageSended));
                    dispatch(setFriendId(ele));
                    Axios({
                        method: "PATCH",
                        url: `${
                            process.env.REACT_APP_BACKEND_URL
                        }/api/v1/notifications/unread/message-id/${
                            getState().chat.messageId
                        }/friend-id/${getState().chat.friendId}`,
                        withCredentials: true,
                    })
                        .then((data2) => {
                            console.log(data2);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            })
            .catch((err1) => {
                console.log(err1);
            });
    }
};

export const fetchChatView = () => (dispatch, getState) => {
    Axios({
        method: "GET",
        withCredentials: true,
        url: `${
            process.env.REACT_APP_BACKEND_URL
        }/api/v1/messages/get-message/${getState().chat.friendId}`,
    })
        .then((data) => {
            let nameFriend;
            if (!data.messageWithFriend) {
                Axios({
                    method: "GET",
                    withCredentials: true,
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${
                        getState().chat.friendId
                    }`,
                })
                    .then((dataUser) => {
                        nameFriend = dataUser.data.name;
                        dispatch(setNameFriend(nameFriend));
                        dispatch(setMessageId(""));
                    })
                    .catch((err1) => {
                        console.log(err1);
                    });
                dispatch(chatViewed([]));
            } else {
                nameFriend = data.messageWithFriend.members[0].memberId.name;
                let checkFriendId = [];
                if (data.messageWithFriend.contents !== 0) {
                    data.messageWithFriend.contents.forEach((content) => {
                        checkFriendId.push({
                            userId: content.senderId.id,
                            name: content.senderId.name,
                            content: content.content,
                            createdAtcontent: content.createdAtcontent,
                        });
                    });
                    dispatch(chatViewed(checkFriendId));
                }
                dispatch(setMessageId(data.messageWithFriend.messageId));
            }
            dispatch(setNameFriend(nameFriend));
        })
        .catch((err) => {
            console.log(err);
        });
};

export const fetchChatInputWithMessage =
    (valueMessage) => (dispatch, getState) => {
        Axios({
            method: "POST",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/messages/${
                getState().chat.messageId
            }`,
            withCredentials: true,
            data: {
                content: valueMessage,
            },
        })
            .then((data1) => {
                console.log(data1);
                getState().chat.arrayFriendId.forEach(async (ele) => {
                    // dispatch(updateStatusRead(res.data.statusRead));
                    // dispatch(updateCountMessageUnread(res.data.countMessageSended));
                    dispatch(setFriendId(ele));
                    Axios({
                        method: "PATCH",
                        url: `${
                            process.env.REACT_APP_BACKEND_URL
                        }/api/v1/notifications/unread/message-id/${
                            getState().chat.messageId
                        }/friend-id/${getState().chat.friendId}`,
                        withCredentials: true,
                    })
                        .then((data2) => {
                            console.log(data2);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                });
            })
            .catch((err1) => {
                console.log(err1);
            });
    };

export const fetchChatViewInMessage = (messageId) => (dispatch, getState) => {
    Axios({
        method: "GET",
        withCredentials: true,
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/messages/${messageId}`,
    })
        .then((data) => {
            // console.log(data);
            let nameFriend = data.data.messages[0].members[0].memberId.name;
            let checkFriendId = [];
            data.data.messages[0].contents.forEach((content) => {
                checkFriendId.push({
                    userId: content.senderId.id,
                    name: content.senderId.name,
                    content: content.content,
                    createdAtcontent: content.createdAtcontent,
                });
            });
            dispatch(chatViewed(checkFriendId));
        })
        .catch((err) => {
            console.log(err);
        });
};

export default slice.reducer;
