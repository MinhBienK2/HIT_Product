import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

const slide = createSlice({
    name: "listFriend",
    initialState: {
        avatar: "",
        list: [],
        isShowMessage: false,
    },
    reducers: {
        renderListFriend: (state, action) => {
            state.list = action.payload;
        },
        addToList: (state, action) => {
            // state.list.push(action.payload);
        },
        deleteFriendToList: (state, action) => {},
        showMessage: (state, action) => {
            state.isShowMessage = true;
        },
    },
});

export const { addToList, deleteFriendToList, renderListFriend, showMessage } =
    slide.actions;

export const fetchListFriend = () => async (dispatch, getState) => {
    // const { listFriend } = getState();
    Axios({
        method: "GET",
        withCredentials: true,
        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/friends`, // dung localhost
    })
        .then((data) => {
            console.log(data);
            const arr = [];
            data.listFriend.forEach((ele) => {
                arr.push(ele);
            });
            dispatch(renderListFriend(arr));
        })
        .catch((err) => {
            console.log(err);
        });
};

// export const fetchListFriend = createAsyncThunk(
//    "listFriend/fetchListFriend",
//    async (data) => {
//       ////.....
//    }
// );

export default slide.reducer;
