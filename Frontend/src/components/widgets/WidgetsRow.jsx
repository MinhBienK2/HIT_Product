import React from 'react'
import {Avatar} from '@mui/material'
import smallDot from '../../assets/icons/Ellipse 11.svg'
import './WidgetsRow.scss'

function WidgetsRow({avatar, title}) {
  return (
    <div className="widgetsRow">
        {avatar ? <Avatar src={avatar} /> : <Avatar/>}
        <p>{title}</p>
        <img src={smallDot} alt="" />
    </div>
  )
}

export default WidgetsRow