import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

import { setFriendId } from "./chat";

const slice = createSlice({
    name: "notification",
    initialState: {
        statusRead: true,
        countMessageUnread: 0,
    },
    reducers: {
        updateStatusRead: (state, action) => {
            state.statusRead = action.payload;
        },
        updateCountMessageUnread: (state, action) => {
            state.countMessageUnread = action.payload;
        },
    },
});

export const { updateStatusRead, updateCountMessageUnread } = slice.actions;

export const createNotification =
    (messageId, ArrayFriendId) => (dispatch, getState) => {
        ArrayFriendId.forEach(async (ele) => {
            const res = await Axios({
                method: "GET",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications/message-id/${messageId}/friend-id/${ele}`,
                withCredentials: true,
            });
            console.log(res);
            if (res.data) {
                dispatch(updateStatusRead(res.data.statusRead));
                dispatch(updateCountMessageUnread(res.data.countMessageSended));
                dispatch(setFriendId(ele));
                const response1 = await Axios({
                    method: "PATCH",
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications/unread/message-id/${res.data.messageId}/friend-id/${res.data.friendId}`,
                    withCredentials: true,
                });
                console.log(response1);
            } else {
                const response = await Axios({
                    method: "POST",
                    url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/notifications/message-id/${messageId}/friend-id/${ele}`,
                    withCredentials: true,
                });
                if (response.status === "success") {
                    dispatch(updateStatusRead(response.data.statusRead));
                    dispatch(
                        updateCountMessageUnread(
                            response.data.countMessageSended
                        )
                    );
                    dispatch(setFriendId(ele));
                }
            }
        });
    };

export const notificationViewed = (data) => (dispatch, getState) => {
    const user = localStorage.getItem("user");
    console.log(data.arrayFriendId.includes(JSON.parse(user).id));
    if (data.arrayFriendId.includes(JSON.parse(user).id)) {
        Axios({
            method: "PATCH",
            url: `${
                process.env.REACT_APP_BACKEND_URL
            }/api/v1/notifications/read/message-id/${data.room}/friend-id/${
                JSON.parse(user).id
            }`,
            withCredentials: true,
        })
            .then((data) => {
                console.log("hello");
            })
            .catch((err) => {
                console.log(err);
            });
    }
};

export default slice.reducer;
