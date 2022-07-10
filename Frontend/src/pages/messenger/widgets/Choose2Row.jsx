import React from 'react'
import './Choose2Row.scss'

function Choose2Row({icon, title}) {
  return (
    <div className="Choose2Row">
        <img src={icon} alt="" />
        <p>{title}</p>
    </div>
  )
}

export default Choose2Row