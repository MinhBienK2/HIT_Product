import React, { useEffect, userState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Axios from "../../services/axios.service";

import ChatInput from "./ChatInput";
import ChatView from "./ChatView";

const ChatBox = () => {
   return (
      <>
         <div className="container">
            <div className="message-content">
               <h1>Chat box</h1>
               <ChatView />
               <ChatInput />
            </div>
         </div>
      </>
   );
};

export default ChatBox;
