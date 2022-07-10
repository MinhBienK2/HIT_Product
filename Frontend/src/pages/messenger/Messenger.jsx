import React from 'react'
import './Messenger.scss'
import Header from './header/Header'
import Message from './message/Message'
import SidebarMess from './sidebarMes/SidebarMess'
import WidgetsMess from './widgets/WidgetsMess'

function Messenger() {
  return (
    <div className="messenger">
        <Header/>
        <div className='messenger__body'>
          <SidebarMess/>
          <Message/>
          <WidgetsMess/>
        </div>
    </div>
  )
}

export default Messenger