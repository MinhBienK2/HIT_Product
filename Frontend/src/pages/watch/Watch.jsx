import React from 'react'
import './Watch.scss'
import Header from './header/Header'
import SidebarWatch from './sidebarWatch/SidebarWatch'
import Widgets from '../../components/widgets/Widgets'
import Video from './videos/Video'
import img1 from '../../assets/images/ava5.jpg'

function Watch() {
  return (
    <div className="watch">
        <Header/>
        <div className='watch__body'>
          <SidebarWatch/>
          <div className="watch__body-video">
            <Video
                message="Hello, how are you?"
                username="Thảo Nguyễn"
                tym='50'
                comment='5'
                image={img1}
            />
          </div>
          <Widgets/>
        </div>
    </div>
  )
}

export default Watch