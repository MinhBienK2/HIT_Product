import React from 'react'
import './SidebarMess.scss'
import SidebarMessRow from './SidebarMessRow'
import search from '../../../assets/icons/akar-icons_search.svg'
import biChat from '../../../assets/icons/bi_chat.svg'
import newTab from '../../../assets/icons/carbon_new-tab.svg'
import {Avatar} from '@mui/material'
import dot from '../../../assets/icons/Ellipse 11.svg'
import ghim from '../../../assets/icons/bi_pin-angle.svg'

function SidebarMess() {
  return (
    <div className="sidebarMess">
        <div className="sidebarMess__title">
            <div className="sidebarMess__title-left">
                <div className="sidebarMess__title-left-avatar">
                    <Avatar/>
                    <img src={dot} alt="" height="6" width="6"/>
                </div>
                <p>Thao Nguyen</p>
            </div>
            <div className="sidebarMess__title-right">
                <img src={biChat} alt="" />
                <img src={newTab} alt="" />
            </div>
        </div>
        <div className="sidebarMess-input">
          <img src={search} alt="search"/>
          <input type="text" placeholder="Tìm kiếm" />
        </div>
        <div className="sidebarMess-content">
            <SidebarMessRow
                notify={ghim}
                nickName="Thao"
                time="15:30"
                messenger="hello"
            />
            <SidebarMessRow
                nickName="Thao Nguyen"
                time="15:00"
                messenger="An com ch"
            />
        </div>
    </div>
  )
}

export default SidebarMess