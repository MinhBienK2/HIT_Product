import React from "react";
import "./Messenger.scss";
import Header from "./header/Header";
import Message from "./message/Message";
import MessageBegin from "./messageBegin/MessageBegin";
import SidebarMess from "./sidebarMes/SidebarMess";
import WidgetsMess from "./widgets/WidgetsMess";

import { useSelector, useDispatch } from "react-redux";

function Messenger() {
    const chat = useSelector((state) => state.chat);
    const listFriend = useSelector((state) => state.listFriend);
    const profileOther = useSelector((state) => state.profileOther);

    return (
        <div className="messenger">
            <Header />
            <div className="messenger__body">
                <SidebarMess />
                {/* {chat.messageId && !listFriend.isShowMessage && <Message />}
                {listFriend.isShowMessage && !chat.messageId && (
                    <MessageBegin />
                )}
                {chat.messageId && !listFriend.isShowMessage && <WidgetsMess />}
                {listFriend.isShowMessage && !chat.messageId && <WidgetsMess />} */}
                {chat.messageId && !profileOther.checkRenderView && <Message />}
                {profileOther.checkRenderView && !chat.messageId && (
                    <MessageBegin />
                )}
                {chat.messageId && !profileOther.checkRenderView && (
                    <WidgetsMess />
                )}
                {profileOther.checkRenderView && !chat.messageId && (
                    <WidgetsMess />
                )}

                {/* <Message/>
          <WidgetsMess/> */}
            </div>
        </div>
    );
}

export default Messenger;
