import React from 'react'
import './Header.scss'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

import search from '../../assets/icons/akar-icons_search.svg'
import home from '../../assets/icons/Home (1).svg'
import watch from '../../assets/icons/Group 1.svg'
import group from '../../assets/icons/Group (2).svg'
import mess from '../../assets/icons/Vector.svg'
import logo from '../../assets/images/Logo.svg'
import notify from '../../assets/icons/mi_notification.svg'
import Avatar from '@mui/material/Avatar';
import setting from '../../assets/icons/ep_setting.svg'
import arrow from '../../assets/icons/vector 1.svg'
import set from '../../assets/icons/fluent_settings-24-filled.svg'
import help from '../../assets/icons/bxs_help-circle.svg'
import mood from '../../assets/icons/eva_moon-fill.svg'
import option from '../../assets/icons/carbon_crowd-report-filled.svg'
import logOut from '../../assets/icons/entypo_log-out.svg'
import arrowRight from '../../assets/icons/Vector 5.svg'

function Header() {
  const user = JSON.parse(localStorage.getItem('user'))

  const navigate = useNavigate()
  
  const [show, setShow] = useState(true)

  const handleClick = () => {
    setShow(!show)
    if(show) {
      document.querySelector('.header__right_dropdownMenu-menu').style.display = 'block'
    }
    else{
      document.querySelector('.header__right_dropdownMenu-menu').style.display = 'none'
    }
    
  }

  const handleLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isLogin')
    window.location.reload()
    navigate('/login')
  }

  return (
    <div className='header'>
      <div className="header__left">
        <img src={logo} alt="logo" />
        <div className="header__left-input">
          <img 
            src={search} 
            alt="search"
          />
          <input type="text" placeholder="Tìm kiếm" />
        </div>
      </div>
      <div className="header__center">
        <div className="header__center-option">
          <img 
            src={home} 
            alt="home" 
            onClick ={() => navigate('/')}
          />
        </div>
        <div className="header__center-option">
          <img 
            src={watch} 
            alt="home" 
            onClick={()=>navigate('/watch')}
          />
        </div>
        <div className="header__center-option">
          <img src={group} alt="home" />
        </div>
        <div className="header__center-option">
          <img 
            src={mess} 
            alt="home" 
            onClick={()=>navigate('/Messenger')}
          />
        </div>
      </div>
      <div className="header__right">
        <Avatar crossorigin="anonymous" src={user.avatar} alt=''  sx={{ width: 32, height: 32 }}/>
        <img src={notify} alt="" />
        <div className="header__right_dropdownMenu">
          <img onClick={handleClick} src={setting} alt="" />
          <div className="header__right_dropdownMenu-menu">
            <div className="header__right_dropdownMenu-menu-title">
              <div className="header__right_dropdownMenu-menu-title-info">
                <Avatar crossorigin="anonymous" src={user.avatar} alt=''  sx={{ width: 32, height: 32 }}/>
                <p>{user.name}</p>
              </div>
              <span>Đi tới trang cá nhân <img src={arrow}/> </span>
            </div>
              
            <div className="header__right_dropdownMenu-menu_items">
              <div className="header__right_dropdownMenu-menu_items-right">
                <img src={set} alt="set" />
                <p>Cài đặt & quyền riêng tư</p>
              </div>
              <img className="arrowRight" src={arrowRight} alt=""/>
            </div>
            <div className="header__right_dropdownMenu-menu_items">
              <div className="header__right_dropdownMenu-menu_items-right">
                <img src={help} alt="set" />
                <p>Trợ giúp & hỗ trợ</p>
              </div>
              <img className="arrowRight" src={arrowRight} alt="" />
            </div>
            <div className="header__right_dropdownMenu-menu_items">
              <div className="header__right_dropdownMenu-menu_items-right">
                <img src={mood} alt="set" />
                <p>Màn hình & trợ năng</p>
              </div>
              <img className="arrowRight" src={arrowRight} alt="" />
            </div>

            <div className="header__right_dropdownMenu-menu_item">
              <img src={option} alt="" />
              <p>Đóng góp ý kiến</p>
            </div>
            <div className="header__right_dropdownMenu-menu_item" onClick={handleLogOut}>
              <img src={logOut} alt="" />
              <p>Đăng xuất</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header