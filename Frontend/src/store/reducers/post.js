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
        listPosts : [],
        pages : 2,
        checkRepeat : []
   },
   reducers: {
      AddListPosts : (state,action) => {
        state.listPosts.push(action.payload)
      },
      updateNumberPage : (state,action) => {
         state.pages = state.pages +1;
      },
      updateCheckRepeat : (state,action) => {
         state.checkRepeat = action.paylaod
      }
   },

});

export const {
    AddListPosts,
    updateNumberPage,
    updateCheckRepeat
} = slice.actions;

export default slice.reducer;
