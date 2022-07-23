import React from 'react'
import './ProfileHeader.scss'

import coverImg from '../../../assets/images/Rectangle 60.svg'
import camera from '../../../assets/icons/bi_camera-fill.svg'


function ProfileHeader() {
  return (
    <div className="profileHeader">
        <div className="profileHeader_top">
            <img src={coverImg} alt="" /> 
            <img src={camera} alt="" /> 
        </div>

        <div className="profileHeader_bottom">

        </div>
    </div>
  )
}

export default ProfileHeader