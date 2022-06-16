import React from 'react'
import Story from './Story'
import {Avatar} from "@mui/material"
import camera from '../../assets/icons/camera.svg'
import './StoryReel.scss'

function StoryReel() {
  return (
    <div className="storyReel">
      <div className="storyReel-add">
        <Avatar className="storyReel-add-avatar"/>
        <img src={camera} alt="camera" className="storyReel-add-icon"/>
        <p>+Add</p>
      </div>
      <Story title="Thảo Nguyễn"/>
      <Story title="Thảo Nguyễn"/>
      <Story title="Thảo Nguyễn"/>
      <Story title="Thảo Nguyễn Thủy aaaa"/>
    </div>
  )
}

export default StoryReel