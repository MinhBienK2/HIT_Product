import React, { useEffect, userState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatBox from "../../components/chat/ChatBox";

import { showMessage, fetchListFriend } from "../../store/reducers/listFriend";
import {
   setFriendId,
   formatArrayFriendId,
   addElementToArrayFriendId,
} from "../../store/reducers/chat";

const ListFriend = () => {
   const dispatch = useDispatch();
   const listFriend = useSelector((state) => state.listFriend);
   const notification = useSelector((state) => state.notification);

   useEffect(() => {
      dispatch(fetchListFriend());
   }, []);

   const handleClick = (friendId) => {
      dispatch(setFriendId(friendId));
      dispatch(showMessage(friendId));
      dispatch(formatArrayFriendId());
      dispatch(addElementToArrayFriendId(friendId));
   };

   return (
      <>
         <h1>
            {notification.statusRead
               ? `khong co thong bao nao ${notification.countMessageUnread}`
               : `co thong bao ${notification.countMessageUnread}`}
         </h1>
         <ul>
            {listFriend.list &&
               listFriend.list.map((ele) => {
                  // console.log(ele);
                  return (
                     <li
                        key={ele.friendId.id}
                        onClick={() => {
                           handleClick(ele.friendId.id);
                        }}
                     >
                        `{ele.friendId.id} - {ele.friendId.name}`
                     </li>
                  );
               })}
         </ul>
         {listFriend.isShowMessage === true && <ChatBox />}
      </>
   );
};

export default ListFriend;
