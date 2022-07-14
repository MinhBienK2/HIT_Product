import React from 'react'

import { useSelector, useDispatch } from "react-redux";

import './Message.scss'
import sendFile from '../../../assets/icons/fluent_attach-24-filled.svg'
import WhiteLike from '../../../assets/icons/WhiteLike.svg'
import MessReceiver from './MessReceiver'
import MessSender from './MessSender'

import MessageContent from './MessageContent'
import MessageInput from './MessageInput'

function Message() {
  const message = useSelector((state) => state.message);

  return (
    <div className='message'>
      <div className="message-title">
        <p>Tin nhắn từ</p>
        <span>{message.nameMessage}</span>
      </div>
      <MessageContent />
      <MessageInput />
    </div>
  )
}

export default Message