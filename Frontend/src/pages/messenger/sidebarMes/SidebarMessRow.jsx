import React from 'react'
import {Avatar} from '@mui/material'
import dot from '../../../assets/icons/Ellipse 11.svg'
import './SidebarMessRow.scss'

function SidebarMessRow({src, nickName, time, messenger, notify}) {
  return (
    <div className="sidebarMessRow">
        {src ? <Avatar src={src}/> : <Avatar/>}
        <div className = "sidebarMessRow-center">
            <div className="sidebarMessRow-center-left">
                <div className="sidebarMessRow-center-left-nickName">
                    <p>{nickName}</p>
                    <img src={dot} alt="" />
                </div>
                <span>{messenger}</span>
            </div>
            <div className="sidebarMessRow-center-right">
                {notify ? <img src={notify}/> : null}
                <p>{time}</p>
            </div>
        </div>
    </div>
  )
}

export default SidebarMessRow