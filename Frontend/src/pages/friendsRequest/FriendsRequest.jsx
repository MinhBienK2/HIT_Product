import React from 'react'
import './FriendsRequest.scss'
import Header from '../../components/header/Header'
import FriendRequestLeft from './friendsRequetsLeft/FriendsRequestLeft'
import FriendRequestRight from './friendsRequestRight/FriendsRequestRight'

function FriendsRequest() {
  return (
    <div className='friendsRequest'>
        <Header />
        <div className="friendsRequest_main">
            <FriendRequestLeft />
            <FriendRequestRight />
        </div>
    </div>
  )
}

export default FriendsRequest