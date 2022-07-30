import React from 'react'
import './Messenger.scss'
import Header from './header/Header'
import Message from './message/Message'
import SidebarMess from './sidebarMes/SidebarMess'
import WidgetsMess from './widgets/WidgetsMess'

import { useSelector, useDispatch } from "react-redux";

function Messenger() {
  const chat = useSelector(state => state.chat)

  return (
    <div className="messenger">
        <Header/>
        <div className='messenger__body'>
          <SidebarMess/>
          {
            chat.messageId && <Message/>
          }
          {
            chat.messageId && <WidgetsMess/>
          }
          {/* <Message/>
          <WidgetsMess/> */}
        </div>
    </div>
  )
}

export default Messenger