import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

import {
    setMessageId,
    fetchChatInput,
    fetchChatView,
    addElementToArrayFriendId,
    formatArrayFriendId,
} from "./chat";

import { setupCalled } from "./callVideo";
import { chatJoin } from "../../utils/webSocket";

const slice = createSlice({
    name: "message",
    initialState: {
        listMessage: [],
        nameMessage: "",
    },
    reducers: {
        //   renderListMessage: (state, action) => {},
        addListMessage: (state, action) => {
            state.listMessage.push(action.payload);
        },
        resetListMessage: (state, action) => {
            state.listMessage = action.payload;
        },
        getNameWithClick: (state, action) => {
            state.nameMessage = action.payload;
        },
    },
});

export const { addListMessage, getNameWithClick, resetListMessage } =
    slice.actions;

export const renderListMessage = () => (dispatch, getState) => {
    Axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/messages`,
        withCredentials: true,
    })
        .then((data) => {
            console.log(data.listMessage[0]);
            dispatch(resetListMessage([]));
            data.listMessage.forEach((message) => {
                dispatch(addListMessage(message));
            });
            // render message
            dispatch(setMessageId(data.listMessage[0].messageId));
            dispatch(formatArrayFriendId());
            data.listMessage[0].members.forEach((ele) => {
                dispatch(getNameWithClick(ele.memberId.name));
                dispatch(addElementToArrayFriendId(ele.memberId._id));
                dispatch(setupCalled(ele.memberId._id));
            });
            const user = localStorage.getItem("user");
            chatJoin(data.listMessage[0].messageId, JSON.parse(user).id);
            const userId = localStorage.getItem("user");
            dispatch(addElementToArrayFriendId(JSON.parse(userId).id));
        })
        .catch((err) => {
            console.log(err);
        });
};

export default slice.reducer;
