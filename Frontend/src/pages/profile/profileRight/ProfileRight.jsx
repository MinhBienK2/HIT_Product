import React from 'react'
import './ProfileRight.scss'
import Avatar from '@mui/material/Avatar';
import Widgets from '../../../components/widgets/Widgets'

function ProfileRight() {
  return (
    <div className="profileRight">
      <div className="profileRight_addfr">
        <h3>Lời mời kết bạn</h3>
        <div className="profileRight_addfr-content">
          <div className="profileRight_addfr-content-items">
            <div className="profileRight_addfr-content-items-top">
              <div className="profileRight_addfr-content-items-top-left">
                <Avatar/>
              </div>
              <div className="profileRight_addfr-content-items-top-right">
                <p>Mai Lan</p>
                <span>8 bạn chung</span>
              </div>
            </div>
            <div  className="profileRight_addfr-content-items-bottom">
              <button  className="profileRight_addfr-content-items-bottom-accept">Chấp nhận</button>
              <button className="profileRight_addfr-content-items-bottom-refuse">Từ chối</button>
            </div>
          </div>
          <div className="profileRight_addfr-content-items">
            <div className="profileRight_addfr-content-items-top">
              <div className="profileRight_addfr-content-items-top-left">
                <Avatar/>
              </div>
              <div className="profileRight_addfr-content-items-top-right">
                <p>Dollar</p>
                <span>8 bạn chung</span>
              </div>
            </div>
            <div  className="profileRight_addfr-content-items-bottom">
              <button  className="profileRight_addfr-content-items-bottom-accept">Chấp nhận</button>
              <button className="profileRight_addfr-content-items-bottom-refuse">Từ chối</button>
            </div>
          </div>
        </div>
      </div>
      <div className="profileRight_friend">
        <Widgets/>
      </div>
    </div>
  )
}

export default ProfileRight