import React from 'react'
import StoryReel from './StoryReel'
import MessageSender from './MessageSender'
import img1 from '../../assets/images/ava5.jpg'
import Post from './Post'
import './Feed.scss'
import axios from 'axios'

function Feed() {
  return (
    <div className="feed">
        <StoryReel/>
        <MessageSender/>
        <Post
          message="Hello, how are you?"
          username="Thảo Nguyễn"
          tym='50'
          comment='5'
          image={img1}
        />
    </div>
  )
}

export default Feed