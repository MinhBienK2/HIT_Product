import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

const slice = createSlice({
    name: "profileOther",
    initialState: {
        profileName: "",
        avatar: "",
        userId: "",
        checkRenderView: false,
    },
    reducers: {
        addProfileName: (state, action) => {
            state.profileName = action.payload;
        },
        addProfileAvatar: (state, action) => {
            state.avatar = action.payload;
        },
        addProfileUserId: (state, action) => {
            state.userId = action.payload;
        },
        addProfileCheckRenderView: (state, action) => {
            state.checkRenderView = action.payload;
        },
    },
});

export const {
    addProfileName,
    addProfileAvatar,
    addProfileUserId,
    addProfileCheckRenderView,
} = slice.actions;

export default slice.reducer;
