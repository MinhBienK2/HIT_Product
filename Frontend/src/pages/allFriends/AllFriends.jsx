import React from 'react'
import Header from '../../components/header/Header'
import FriendRequestLeft from './friendsRequetsLeft/FriendsRequestLeft'
import FriendRequestRight from './friendsRequestRight/FriendsRequestRight'

function AllFriends() {
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

export default AllFriends