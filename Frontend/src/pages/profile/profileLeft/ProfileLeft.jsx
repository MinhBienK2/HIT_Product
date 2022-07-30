import React from 'react'
import './ProfileLeft.scss'
import location from '../../../assets/icons/ic_baseline-place.svg'
import date from '../../../assets/icons/bi_heart-fill.svg'
import ins from '../../../assets/icons/ins.svg'
import link from '../../../assets/icons/link.svg'
import more from '../../../assets/icons/ic_baseline-place (1).svg'
import edit from '../../../assets/icons/fa_pencil-square.svg'
import { Avatar } from "@mui/material";

import img1 from '../../../assets/images/Rectangle 55.svg'
import img2 from '../../../assets/images/Rectangle 56.svg'
import img3 from '../../../assets/images/Rectangle 58.svg'
import img4 from '../../../assets/images/Rectangle 59.svg'
import img5 from '../../../assets/images/Rectangle 61.svg'
import img6 from '../../../assets/images/Rectangle 62.svg'
import img7 from '../../../assets/images/Rectangle 63.svg'

function ProfileLeft() {
  return (
    <div className='profileLeft'>
        <div className="profileLeft_intro">
            <div className="profileLeft_intro-items">
                <img src={location} alt="" />
                <p>Đến từ </p>
                <span>Hà Nội</span>
            </div>
            <div className="profileLeft_intro-items">
                <img src={date} alt="" />
                <p>Hẹn hò</p>
            </div>
            <div className="profileLeft_intro-items">
                <img src={ins} alt="" />
                <p>huongthu315</p>
            </div>
            <div className="profileLeft_intro-items">
                <img src={link} alt="" />
                <p>behance.net/huongthu</p>
            </div>
            <div className="profileLeft_intro-items">
                <img src={more} alt="" />
                <p>Xem thêm</p>
            </div>
        </div>

        <div className="profileLeft_edit">
            <p>Chỉnh sửa thông tin</p>
            <img src={edit} alt="" />
        </div>

        <div className="profileLeft_image">
            <div className="profileLeft_image-top">
                <p>Ảnh </p>
                <span>Xem tất cả ảnh</span>
            </div>
            <div className="profileLeft_image-bottom">
                <img src={img1} alt="" />
                <img src={img2} alt="" />
                <img src={img3} alt="" />
                <img src={img4} alt="" />
                <img src={img5} alt="" />
                <img src={img6} alt="" />
                <img src={img7} alt="" />
            </div>
        </div>
        <div className="profileLeft_friend">
            <div className="profileLeft_friend-top">
                <div className="profileLeft_friend-top-left">
                    <p>Bạn bè</p>
                    <span>123 người bạn</span>
                </div>
                <span>Xem tất cả bạn bè</span>
            </div>
            <div className="profileLeft_friend-bottom">
                <div className="profileLeft_friend-bottom-items">
                    <img src={img1} alt="" />
                    <p>Bánh Bơ</p>
                </div>
                <div className="profileLeft_friend-bottom-items">
                    <img src={img2} alt="" />
                    <p>Bánh Bơ</p>
                </div>
                <div className="profileLeft_friend-bottom-items">
                    <img src={img3} alt="" />
                    <p>Bánh Bơ</p>
                </div>
                <div className="profileLeft_friend-bottom-items">
                    <img src={img4} alt="" />
                    <p>Bánh Bơ</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileLeft