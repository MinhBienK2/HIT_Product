import React from 'react'
// import './FriendRequestItems.scss'
import img1 from '../../../../assets/images/Frame 212.svg'
import img2 from '../../../../assets/images/Frame 213.svg'
import img3 from '../../../../assets/images/Frame 214.svg'

function FriendRequestItems() {
  return (
    <div className="friendsRequestItems">
        <img src={img1} alt="" />
        <h3>Nguyen Chi</h3>
        <div className="friendsRequestItems_bbc">
            <div className="friendsRequestItems_bbc-left">
                <img className="friendsRequestItems_bbc-left-img1" src={img2} alt="" />
                <img className="friendsRequestItems_bbc-left-img2" src={img3} alt="" />
            </div>
            <div className="friendsRequestItems_bbc-right">
                <p>50 bạn bè chung</p>
            </div>
        </div>
        <button className="friendsRequestItems-btn">Kết bạn</button>
        <button className="friendsRequestItems-btn2">Ấn bỏ</button>
    </div>
  )
}

export default FriendRequestItems