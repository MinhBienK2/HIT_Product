import React from 'react'
import './ProfileCenter.scss'
import MessageSender from '../../../components/feed/MessageSender' 
import Post from '../../../components/feed/Post'

function ProfileCenter() {
  return (
    <div className='profileCenter'>
        
        <MessageSender />
        {/* <Post /> */}
    </div>
  )
}

export default ProfileCenter