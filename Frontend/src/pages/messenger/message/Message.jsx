import React from 'react'
import './Message.scss'
import sendFile from '../../../assets/icons/fluent_attach-24-filled.svg'
import WhiteLike from '../../../assets/icons/WhiteLike.svg'
import MessReceiver from './MessReceiver'
import MessSender from './MessSender'

function Message() {
  return (
    <div className='message'>
      <div className="message-title">
        <p>Tin nhắn từ</p>
        <span>Thao</span>
      </div>
      <div className="message-content">
        {/* <MessReceiver content='Ko biet dao nay ban khoe khong, nhung t thi khoe lam' />
        <MessSender content='U m khoe thi ke m, viec do dau co lien quan toi tui. Bay ranh qua do ha?' />
        <MessReceiver content='U thi biet vay di' />
        <MessSender content='okki di'/>
        <MessReceiver content='U thi biet vay di' />
        <MessReceiver content='U thi biet vay di' />
        <MessReceiver content='U thi biet vay di' />
        <MessReceiver content='U thi biet vay di' />
        <MessReceiver content='U thi biet vay di' /> */}
        <div className="messReceiver">
          <p>Ko biet dao nay ban khoe khong, nhung t thi khoe lam</p>
        </div>
        <div className="messSender">
          <p>U m khoe thi ke m, viec do dau co lien quan toi tui. Bay ranh qua do ha?</p>
        </div>
      </div>
      <div className="message-input">
        <button>
          <img src={sendFile} alt="" height="18" width="18"/>
        </button>
        <input type="text" placeholder="Nhập tin nhắn của bạn..." />
        <button>
          <img src={WhiteLike} alt="" />
        </button>
      </div>
    </div>
  )
}

export default Message