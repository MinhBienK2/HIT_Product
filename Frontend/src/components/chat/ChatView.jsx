import React, { useEffect, userState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "../../services/axios.service";

import {
   setFriendId,
   setMessageId,
   setNameFriend,
   chatViewed,
   fetchChatView,
} from "../../store/reducers/chat";

import { chatJoin } from "../../utils/webSocket";

const ChatContent = () => {
   const dispatch = useDispatch();
   const chat = useSelector((state) => state.chat);
   useEffect(() => {
      dispatch(fetchChatView());
   }, [chat.friendId]);
   return (
      <>
         {chat.nameFriend ? <h3>{chat.nameFriend}</h3> : <></>}
         <div className="chat"></div>
         {chat.listContent &&
            chat.listContent.map((ele, index) => {
               return (
                  <div key={index}>
                     <p>
                        {ele.userId} - {ele.name} -{ele.createdAtcontent}
                     </p>
                     <p>{ele.content} </p>
                  </div>
               );
            })}
      </>
   );
};

export default ChatContent;
