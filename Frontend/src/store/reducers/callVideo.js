import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../services/axios.service";

const slide = createSlice({
   name: "listFriend",
   initialState: {
      uuid : '',
      calledId : '',
      isVideoCall : false,
      linkToPageVideoCall : '',
      roomIsFriendId : '',
      friendPeerId : '',
   },
   reducers: {
        setupUuid : (state,action) => {
            state.uuid = action.payload
        },
        setupCalled : (state,action) => {
            state.calledId = action.payload
        },
        setupIsVideoCall : (state,action) => {
         state.isVideoCall = !state.isVideoCall
        },
        setupLinkToPageVideoCall : (state,action) => {
            state.linkToPageVideoCall = `call-video/${action.payload.room}/${action.payload.friendId}`
        },
        setupRoomIsFriendId : (state,action) => {
            state.roomIsFriendId = action.payload
        },
        setupFriendPeerId :  (state,action) => {
            state.roomIsFriendId = action.payload
        },
   }
});

export const { setupUuid,setupCalled,setupIsVideoCall,setupLinkToPageVideoCall,setupRoomIsFriendId,setupFriendPeerId} =
   slide.actions;
export default slide.reducer;
