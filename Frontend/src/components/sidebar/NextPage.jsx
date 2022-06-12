import React from 'react'
import './NextPage.scss'

function NextPage({icon, title}) {
  return (
    <div className="page">
        <img src={icon} alt="" />
        <p>{title}</p>
    </div>
  )
}

export default NextPage