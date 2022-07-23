import React from 'react'
import setting from '../../../assets/icons/ep_setting.svg'
import search from '../../../assets/icons/akar-icons_search.svg'
import group1 from '../../../assets/icons/Ellipse 4.svg'
import group2 from '../../../assets/icons/Ellipse 4 (1).svg'
import icon from '../../../assets/icons/Group1.svg'
import nextPage from '../../../assets/icons/gridicons_next-page.svg'
import more from '../../../assets/icons/ep_d-arrow-right.svg'
import home from '../../../assets/icons/menuHome.svg'
import livetr from '../../../assets/icons/livetr.svg'
import video_saved from '../../../assets/icons/video saved.svg'
import arrow from '../../../assets/icons/ep_d-arrow.svg'
import Group from './Group'
import NextPage from './NextPage'
import './SidebarWatch.scss'
import storageService from '../../../services/storage.service'

function SidebarWatch() {

  return (
    <div className='SidebarWatch'>
      <div className="SidebarWatch__top">
        <div className="SidebarWatch__top-content">
          <h3>Video</h3>
          <img src={setting} alt="" />
        </div>
        <div className="SidebarWatch__top-input">
          <img src={search} alt="search"/>
          <input type="text" placeholder="Tìm kiếm" />
        </div>
        <div className="SidebarWatch__top-menu">
          <div className="SidebarWatch__top-menu-items">
            <img src={home} alt="" />
            <p style={{color:'#ff7f24'}}>Trang chủ</p>
          </div>
          <div className="SidebarWatch__top-menu-items">
            <img src={livetr} alt="" />
            <p>Trực tiếp</p>
          </div>
          <div className="SidebarWatch__top-menu-bottom">
            <div className="SidebarWatch__top-menu-bottom-left">
              <img src={video_saved} alt=""/>
              <p>Video đã lưu</p>
            </div>
            <div className="SidebarWatch__top-menu-bottom-right">
              <p>Xem thêm</p>
              <img src={arrow} alt="" height="12" width="12"/>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="SidebarWatch__bottom">
        <div className="SidebarWatch__bottom-content">
          <h4>Đang theo dõi</h4>
          <p>Chỉnh sửa</p>
        </div>
        <div className="SidebarWatch__bottom-group">
          <Group icon={icon} avatarGroup={group1} title='Làm đẹp-skincare'/>
          <Group icon={icon} avatarGroup={group2} title='Làm đẹp-skincare'/>
          <Group icon={icon} avatarGroup={group2} title='Làm đẹp-skincare'/>
          <Group icon={icon} avatarGroup={group2} title='Làm đẹp-skincare'/>
        </div>
        <div className="SidebarWatch__bottom-page">
          <NextPage icon={nextPage} title='Làm đẹp-skincare'/>
          <NextPage icon={nextPage} title='Làm đẹp-skincare'/>
        </div>
        <div className="SidebarWatch__bottom-more">
          <p>Xem thêm</p>
          <img src={more} alt="" />
        </div>
      </div>
    </div>
  )
}

export default SidebarWatch