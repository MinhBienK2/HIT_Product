import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

import {
    setMessageId,
    fetchChatInput,
    fetchChatView,
    addElementToArrayFriendId,
    formatArrayFriendId,
} from "./chat";

import { addProfileCheckRenderView } from "../reducers/profileOther";

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
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/messages`,
        withCredentials: true,
    })
        .then((data) => {
            let checkprofile = false;

            if (getState().profileOther.checkRenderView) {
                data.listMessage.every(function (ele) {
                    if (
                        ele.members[0].memberId.id ===
                        getState().profileOther.userId
                    ) {
                        checkprofile = true;
                        return false;
                    } else return true;
                });
                if (checkprofile) {
                    // console.log(data.listMessage[0]);
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
                    chatJoin(
                        data.listMessage[0].messageId,
                        JSON.parse(user).id
                    );
                    const userId = localStorage.getItem("user");
                    dispatch(addElementToArrayFriendId(JSON.parse(userId).id));
                    dispatch(addProfileCheckRenderView(false));
                } else {
                    dispatch(resetListMessage([]));
                    data.listMessage.forEach((message) => {
                        dispatch(addListMessage(message));
                    });
                }
            } else {
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
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

export default slice.reducer;
