import React from 'react'
import './FriendsRequestLeft.scss'
import {useNavigate} from 'react-router-dom'

import setting from '../../../assets/icons/ep_setting.svg'
import search from '../../../assets/icons/akar-icons_search.svg'
import home from '../../../assets/icons/fluent_home.svg'
import friendRequest from '../../../assets/icons/friendsRequestOrange.svg'
import moreFriend from '../../../assets/icons/moreFriend.svg'
import birthday from '../../../assets/icons/birthday.svg'
import customList from '../../../assets/icons/entypo_log-out (1).svg'
import arrowOrange from '../../../assets/icons/arrowOrange.svg'
import arrow from '../../../assets/icons/Vector 5.svg'

function FriendsRequestLeft() {

    const navigate = useNavigate()

  return (
    <div className="friendsRequestLeft">
        <div className="friendsRequestLeft_header">
            <p>Bạn bè</p>
            <img src={setting} alt="" />
        </div>
        <div className="friendsRequestLeft_input">
            <img src={search} alt="" />
            <input type="text" placeholder="Tìm kiếm" />
        </div>

        <div className="friendsRequestLeft_choose">
            <div className="friendsRequestLeft_choose-items">
                <div className="friendsRequestLeft_choose-items-left" onClick={()=>navigate('/AllFriends')}>
                    <img src={home} alt="" />
                    <p>Trang chủ</p>
                </div>
                
            </div>
            <div className="friendsRequestLeft_choose-items-main">
                <div className="friendsRequestLeft_choose-items-main-left">
                    <img src={friendRequest} alt="" />
                    <p>Yêu cầu kết bạn</p>
                </div>
                <img src={arrowOrange} alt="" />
            </div>
            <div className="friendsRequestLeft_choose-items">
                <div className="friendsRequestLeft_choose-items-left" onClick={()=>navigate('/MoreFriends')}>
                    <img src={moreFriend} alt="" />
                    <p>Gợi ý bạn bè</p>
                </div>
                <img src={arrow} alt="" />
                
            </div>
            <div className="friendsRequestLeft_choose-items">
                <div className="friendsRequestLeft_choose-items-left">
                    <img src={birthday} alt="" />
                    <p>Sinh nhật</p>
                </div>                
            </div>
            <div className="friendsRequestLeft_choose-items">
                <div className="friendsRequestLeft_choose-items-left">
                    <img src={customList} alt="" />
                    <p>Tùy chỉnh danh sách</p>
                </div>                
                <img src={arrow} alt="" />
            </div>
            
        </div>
    </div>
  )
}

export default FriendsRequestLeft