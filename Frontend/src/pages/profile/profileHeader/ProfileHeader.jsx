import React from 'react'
import './ProfileHeader.scss'

import Avatar from '@mui/material/Avatar';
import coverImg from '../../../assets/images/Rectangle 60.svg'
import camera from '../../../assets/icons/bi_camera-fill.svg'
import music from '../../../assets/icons/bi_file-earmark-music.svg'
import write from '../../../assets/icons/fa_pencil-square.svg'

function ProfileHeader() {

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className="profileHeader">
        <div className="profileHeader_top">
            <img className="profileHeader_top-img1" src={coverImg} alt="" /> 
            <img className="profileHeader_top-img2" src={camera} alt="" /> 
        </div>

        <div className="profileHeader_bottom">
            <div className="profileHeader_bottom-content">
              <div className="profileHeader_bottom-content-left">
                  <div className="profileHeader_bottom-content-left-img"> 
                    <img src={music} alt="" />
                  </div>
                  <p>Bao tiền một mớ bình yên</p>
              </div>
              <div className="profileHeader_bottom-content-right">
                  <p>Chỉnh sửa</p>
                  <img src={write} alt="" />
              </div>
            </div>
        </div>

        <div className="profileHeader_info">
          <div className="profileHeader_info-avar">
            <Avatar src={user.avatar} alt=''/>
            <img src={camera} alt="" />
          </div>
          <h3>{user.name}</h3>
          <h4>(Sun)</h4>
          <p>We are one!</p>
        </div>
    </div>
  )
}

export default ProfileHeader