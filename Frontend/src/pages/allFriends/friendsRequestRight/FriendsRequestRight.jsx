import React from 'react'
import './FriendsRequestRight.scss'
import FriendsRequestItems from './friendRequestItems/FriendRequestItems'

function FriendsRequestRight() {
  return (
    <div className='friendsRequestRight'>
        <div className="friendsRequestRight_header">
            <h3>Tất cả bạn bè</h3>
            <p>Xem tất cả</p>
        </div>
        <div className="friendsRequestRight_main">
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
        </div>
    </div>
  )
}

export default FriendsRequestRight