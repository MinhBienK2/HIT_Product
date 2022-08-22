import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FriendsRequestRight.scss";
import FriendsRequestItems from "./friendRequestItems/FriendRequestItems";
// import Axios from "axios";
import Axios from "../../../services/axios.service";

function FriendsRequestRight() {
    const [confirmFriend, setConfirmFriend] = useState([]);
    useEffect(() => {
        Axios({
            method: "GET",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/friends/list-friend-confirm`,
            withCredentials: true,
        })
            .then((data) => {
                console.log(data);
                if (
                    data.status === "success" &&
                    data.lisConfirmFriend.length !== 0
                ) {
                    console.log("first");
                    data.lisConfirmFriend.forEach((ele) => {
                        console.log("thuy", ele);
                        setConfirmFriend((current) => [...current, ele]);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(confirmFriend);

    return (
        <div className="friendsRequestRight">
            <div className="friendsRequestRight_header">
                <h3>Yêu cầu kết bạn</h3>
                <p>Xem tất cả</p>
            </div>
            <div className="friendsRequestRight_main">
                {confirmFriend &&
                    confirmFriend.map((ele) => {
                        return (
                            <FriendsRequestItems
                                keyId={ele.id}
                                avatar={ele.userId.avatar}
                                name={ele.userId.name}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default FriendsRequestRight;
