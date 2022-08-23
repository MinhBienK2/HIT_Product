import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

const slide = createSlice({
    name: "callVideo",
    initialState: {
        listComment: [],
        countComment: "",
    },
    reducers: {
        initListComment: (state, action) => {
            state.listComment = action.payload;
        },
        AddListComment: (state, action) => {
            state.listComment.push(action.payload);
        },
        initCountComment: (state, action) => {
            state.countComment = action.payload;
        },
    },
});

export const { initListComment, AddListComment, initCountComment } =
    slide.actions;
export default slide.reducer;
