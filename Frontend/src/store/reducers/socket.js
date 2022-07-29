import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

const slide = createSlice({
    name: "socket",
    initialState: {
        socketId: "",
    },
    reducers: {
        setupSocketId: (state, action) => {
            state.socketId = action.payload;
        },
    },
});

export const { setupSocketId } = slide.actions;
export default slide.reducer;
