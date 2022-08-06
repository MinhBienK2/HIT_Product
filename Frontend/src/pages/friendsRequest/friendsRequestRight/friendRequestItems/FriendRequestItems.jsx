import React, { useState, useEffect } from "react";
import './FriendRequestItems.scss'
import img1 from '../../../../assets/images/Frame 212.svg'
import img2 from '../../../../assets/images/Frame 213.svg'
import img3 from '../../../../assets/images/Frame 214.svg'
import { Avatar } from "@mui/material";
import Axios from "../../../../services/axios.service";

function FriendRequestItems({key, avatar, name}) {

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
  console.log('t',confirmFriend)

  return (
    <div>
      {confirmFriend && confirmFriend.map((ele) => {
        return (
          <div className="friendsRequestItems">
            <Avatar src={avatar}/>
            <h3>{name}</h3>
            <div className="friendsRequestItems_bbc">
                <div className="friendsRequestItems_bbc-left">
                    <img className="friendsRequestItems_bbc-left-img1" src={img2} alt="" />
                    <img className="friendsRequestItems_bbc-left-img2" src={img3} alt="" />
                </div>
                <div className="friendsRequestItems_bbc-right">
                    <p>50 bạn bè chung</p>
                </div>
            </div>
            <button 
              className="friendsRequestItems-btn1"
              onClick={() => {
                handleAccess(
                  ele,
                  ele.userId.id
                );
                }}
            >
                Chấp nhận
              </button>
            <button 
              className="friendsRequestItems-btn2"
              onClick={() => {
                handleAbort(
                  ele,
                  ele.userId.id
                );
              }}
            >
              Từ chối
            </button>
          </div>
        )
      })} 
    </div>
    
  )
}

export default FriendRequestItems