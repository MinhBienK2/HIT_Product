import React from 'react'
import './Group.scss'

function Group({icon,avatarGroup,title }) {
  return (
    <div className="group">
      <div className="group-img">
        <img className="group-img-icon" src={icon} alt="" />
        <img className="group-img-avatarGroup" src={avatarGroup} alt="" />
      </div>
      <p>{title}</p>
    </div>
  )
}

export default Group