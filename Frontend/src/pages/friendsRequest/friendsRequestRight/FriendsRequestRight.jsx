import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import './FriendsRequestRight.scss'
import FriendsRequestItems from './friendRequestItems/FriendRequestItems'
import Axios from "axios";

function FriendsRequestRight() {

  const [confirmFriend, setConfirmFriend] = useState([]);
    useEffect(() => {
        Axios({
            method: "GET",
            url: `http://localhost:3000/api/v1/friends/list-friend-confirm`,
            withCredentials: true,
        })
            .then((data) => {
                console.log(data);
                if (
                    data.status === "success" &&
                    data.lisConfirmFriend.length !== 0
                ) {
                    data.lisConfirmFriend.forEach((ele) => {
                        console.log(ele);
                        setConfirmFriend((current) => [...current, ele]);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    async function handleAccess(ele, friendId) {
        try {
            const data = await Axios({
                method: "PATCH",
                url: `http://localhost:3000/api/v1/friends/${friendId}`,
                withCredentials: true,
            });
            if (data.status === "success") {
                setConfirmFriend((current) => {
                    return current.filter((ele2) => {
                        return ele2 !== ele;
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const navigate = useNavigate()

    async function handleAbort(ele, friendId) {
        try {
            const data = await Axios({
                method: "DELETE",
                url: `http://localhost:3000/api/v1/friends/${friendId}`,
                withCredentials: true,
            });
            if (data.status === "success") {
                setConfirmFriend((current) => {
                    return current.filter((ele2) => {
                        return ele2 !== ele;
                    });
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    console.log(confirmFriend);

  return (
    <div className='friendsRequestRight'>
        <div className="friendsRequestRight_header">
            <h3>Yêu cầu kết bạn</h3>
            <p>Xem tất cả</p>
        </div>
        <div className="friendsRequestRight_main">
            {/* <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems />
            <FriendsRequestItems /> */}
            {confirmFriend && confirmFriend.map((ele) => {
              return (
                <FriendsRequestItems
                  key={ele._id}
                  avatar={ele.friendId.avatar}
                  name = {ele.friendId.name}
                />
              )
            })}
        </div>
    </div>
  )
}

export default FriendsRequestRight