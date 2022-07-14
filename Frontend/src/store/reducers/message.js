import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

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
        getNameWithClick: (state, action) => {
            state.nameMessage = action.payload;
        },
    },
});

export const { addListMessage, getNameWithClick } = slice.actions;

export const renderListMessage = () => (dispatch, getState) => {
    Axios({
        method: "GET",
        url: `http://localhost:3000/api/v1/messages`,
        withCredentials: true,
    })
        .then((data) => {
            data.listMessage.forEach((message) => {
                dispatch(addListMessage(message));
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

export default slice.reducer;
