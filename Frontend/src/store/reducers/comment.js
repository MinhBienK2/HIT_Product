import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

const slide = createSlice({
    name: "callVideo",
    initialState: {
        comments: [],
    },
    reducers: {
        initListComment: (state, action) => {
            state.comments = action.payload;
        },
        AddListComment: (state, action) => {
            state.comments.push(action.payload);
        },
        resetListComment: (state, action) => {
            state.comments = [];
        },
        addCommentWithRealtime: (state, action) => {
            state.comments.forEach((comment) => {
                if (
                    comment.allComments.length !== 0 &&
                    comment.allComments[0].postID === action.payload.postID &&
                    action.payload.parentCmt === null
                ) {
                    console.log(comment.allComments);
                    comment.allComments.push(action.payload);
                    comment.lengthComment += 1;
                } else if (
                    comment.allComments.length !== 0 &&
                    comment.allComments[0].postID === action.payload.postID &&
                    action.payload.parentCmt !== null
                ) {
                    comment.allComments.forEach((ele) => {
                        if (ele._id === action.payload.parentCmt) {
                            ele.childrenCmt.push(action.payload);
                            comment.lengthComment += 1;
                        }
                    });
                }
            });
        },
    },
});

export const {
    initListComment,
    AddListComment,
    addCommentWithRealtime,
    resetListComment,
} = slide.actions;
export default slide.reducer;

export const handleRealtimeComment = (data) => (dispatch, getState) => {
    dispatch(addCommentWithRealtime(data));
};
