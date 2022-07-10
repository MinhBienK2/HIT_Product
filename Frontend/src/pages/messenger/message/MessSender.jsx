import React from 'react'
import {Avatar} from "@mui/material"
import './MessSender.scss'

function MessSender({avar, content}) {
  return (
    <div className="messSender">
        <p>{content}</p>
        {avar ? <img src={avar} alt="" /> : <Avatar/> }
    </div>
  )
}

export default MessSender