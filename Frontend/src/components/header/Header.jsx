import React from 'react'
import './Header.scss'
import search from '../../assets/icons/akar-icons_search.svg'
import home from '../../assets/icons/Home (1).svg'
import watch from '../../assets/icons/Group 1.svg'
import group from '../../assets/icons/Group (2).svg'
import mess from '../../assets/icons/Vector.svg'
import logo from '../../assets/images/Logo.svg'
import notify from '../../assets/icons/mi_notification.svg'
import Avatar from '@mui/material/Avatar';
import setting from '../../assets/icons/ep_setting.svg'

function Header() {
  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className='header'>
      <div className="header__left">
        <img src={logo} alt="logo" />
        <div className="header__left-input">
          <img src={search} alt="search"/>
          <input type="text" placeholder="Tìm kiếm" />
        </div>
      </div>
      <div className="header__center">
        <div className="header__center-option-home">
          <img src={home} alt="home" />
        </div>
        <div className="header__center-option">
          <img src={watch} alt="home" />
        </div>
        <div className="header__center-option">
          <img src={group} alt="home" />
        </div>
        <div className="header__center-option">
          <img src={mess} alt="home" />
        </div>
      </div>
      <div className="header__right">
        <Avatar crossorigin="anonymous" src={user.avatar} alt=''  sx={{ width: 32, height: 32 }}/>
        <img src={notify} alt="" />
        <img src={setting} alt="" />
      </div>
    </div>
  )
}

export default Header