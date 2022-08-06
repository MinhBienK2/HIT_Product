import React from 'react'
import friend from '../../assets/icons/fa-solid_user-friends.svg'
import memory from '../../assets/icons/eos-icons_modified-date.svg'
import saved from '../../assets/icons/Vector (1).svg'
import group from '../../assets/icons/Group (1).svg'
import dot from '../../assets/icons/Ellipse 5.svg'
import Avatar from '@mui/material/Avatar';
import group1 from '../../assets/icons/Ellipse 4.svg'
import group2 from '../../assets/icons/Ellipse 4 (1).svg'
import icon from '../../assets/icons/Group1.svg'
import nextPage from '../../assets/icons/gridicons_next-page.svg'
import more from '../../assets/icons/ep_d-arrow-right.svg'
import Group from './Group'
import NextPage from './NextPage'
import './Sidebar.scss'
import {useNavigate} from 'react-router-dom'

function SideBar() {

  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <div className='sidebar'>
      <div className="sidebar__top">
        <div className="sidebar__top-avatar"  onClick={()=> navigate('/Profile')}>
          <Avatar src={user.avatar} alt=''  x={{ width: 32, height: 32 }}/>
          <p>{user.name}</p>
        </div>

        <div className='sidebar__top-items'>
          <div className="sidebar__top-items-item">
            <div className="sidebar__top-items-item-info">
              <img src={friend} alt="" height="25.6" width="32"/>
              <p>Bạn bè</p>
            </div>
            <img src={dot} alt="" className='sidebar__top-items-item-dot'/>
          </div>

          <div className="sidebar__top-items-item">
            <div className="sidebar__top-items-item-info">
              <img src={memory} alt="" height="33.45" width="32"/>
              <p>Kỷ niệm</p>
            </div>
          </div>

          <div className="sidebar__top-items-item">
            <div className="sidebar__top-items-item-info">
              <img src={saved} alt="" height="32" width="32"/>
              <p>Đã lưu</p>
            </div>
          </div>

          <div className="sidebar__top-items-item">
            <div className="sidebar__top-items-item-info">
              <img src={group} alt="" height="32" width="32"/>
              <p>Nhóm</p>
            </div>
            <img src={dot} alt="" className='sidebar__top-items-item-dot'/>
          </div>
        </div>
      </div>
      <hr/>
      <div className="sidebar__bottom">
        <h4>Lối tắt của bạn</h4>
        <div className="sidebar__bottom-group">
          <Group icon={icon} avatarGroup={group1} title='Làm đẹp-skincare'/>
          <Group icon={icon} avatarGroup={group2} title='Làm đẹp-skincare'/>
          <Group icon={icon} avatarGroup={group2} title='Làm đẹp-skincare'/>
          <Group icon={icon} avatarGroup={group2} title='Làm đẹp-skincare'/>
        </div>
        <div className="sidebar__bottom-page">
          <NextPage icon={nextPage} title='Làm đẹp-skincare'/>
          <NextPage icon={nextPage} title='Làm đẹp-skincare'/>
        </div>
        <div className="sidebar__bottom-more">
          <p>Xem thêm</p>
          <img src={more} alt="" />
        </div>
      </div>
    </div>
  )
}

export default SideBar