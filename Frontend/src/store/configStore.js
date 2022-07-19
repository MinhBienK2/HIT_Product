import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import chatReducer from "./reducers/chat";
import listFriendReducer from "./reducers/listFriend";
import messageReducer from "./reducers/message";
import notificationReducer from "./reducers/notification";
import postReducer from "./reducers/post";

export default configureStore({
   reducer: {
      chat: chatReducer,
      listFriend: listFriendReducer,
      message: messageReducer,
      notification: notificationReducer,
      post : postReducer
   },
   middleware: [...getDefaultMiddleware()],
});
