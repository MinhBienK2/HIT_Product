import React from 'react'
import {Avatar} from '@mui/material'
import './WidgetsMess.scss'
import Choose2Row from './Choose2Row'
import dot from '../../../assets/icons/Ellipse 6.svg'
import call from '../../../assets/icons/Group 61.svg'
import callVideo from '../../../assets/icons/Group 66.svg'
import user from '../../../assets/icons/Group 68.svg'
import notify from '../../../assets/icons/Group 70.svg'
import editName from '../../../assets/icons/icon-park-outline_edit-name.svg'
import search from '../../../assets/icons/akar-icons_search.svg'
import picture from '../../../assets/icons/icomoon-free_file-picture.svg'
import file from '../../../assets/icons/ant-design_file-outlined.svg'
import pricetags from '../../../assets/icons/ion_pricetags-outline.svg'
import ghim from '../../../assets/icons/bi_pin-angle (1).svg'
import eyeslash from '../../../assets/icons/bi_eye-slash.svg'
import block from '../../../assets/icons/ooui_block.svg'
import report from '../../../assets/icons/ooui_block (1).svg'
import img1 from '../../../assets/images/Rectangle 55.svg'
import img2 from '../../../assets/images/Rectangle 59.svg'
import img3 from '../../../assets/images/Rectangle 58.svg'
import img4 from '../../../assets/images/Rectangle 56.svg'
import arrow from '../../../assets/icons/akar-icons_arrow-left.svg'

function WidgetsMess() {
  return (
    <div className='widgetsMess'>
      <div className="widgetsMess-info">
        <div className="widgetsMess-info-avatar">
          <Avatar/>
          <img src={dot} alt="" height="12" width="12"/>
        </div>
        <p>Thao Nguyen</p>
      </div>
      <div className="widgetsMess-choose1">
        <div className="widgetsMess-choose1-item">
          <img src={call} alt="" />
          <p>Gọi thoại</p>
        </div>
        <div className="widgetsMess-choose1-item">
          <img src={callVideo} alt="" />
          <p>Gọi video</p>
        </div>
        <div className="widgetsMess-choose1-item">
          <img src={user} alt="" />
          <p>Trang cá nhân</p>
        </div>
        <div className="widgetsMess-choose1-item">
          <img src={notify} alt="" />
          <p>Thông báo</p>
        </div>
      </div>
      <div className="widgetsMess-choose2">
        <Choose2Row icon={editName} title="Biệt danh" />
        <Choose2Row icon={search} title="Tìm kiếm trong cuộc trò chuyện" />
        <Choose2Row icon={picture} title="Ảnh" />
        <div className="widgetsMess-choose2-images">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
          <div className="widgetsMess-choose2-images-img">
            <img src={img4} alt="" className="bottom"/>
            <img src={arrow} alt="" className="top"/>
          </div>
        </div>
        <Choose2Row icon={file} title="File & liên kết đã chia sẻ" />
        <Choose2Row icon={pricetags} title="Phân loại" />
        <Choose2Row icon={ghim} title="Ghim cuộc trò chuyện" />
        <Choose2Row icon={eyeslash} title="Ẩn cuộc trò chuyện" />
        <Choose2Row icon={block} title="Chặn" />
        <Choose2Row icon={report} title="Báo cáo" />
      </div>
    </div>
  )
}

export default WidgetsMess