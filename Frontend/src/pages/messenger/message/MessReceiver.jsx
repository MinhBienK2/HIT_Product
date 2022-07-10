import {Avatar} from "@mui/material"
import React from 'react'
import './MessReceiver.scss'

function MessReceiver({avar, content}) {
  return (
    <div className="MessReceiver">
        {avar ? <img src={avar} alt="" /> : <Avatar/> }
        <p>{content}</p>
    </div>
  )
}

export default MessReceiver