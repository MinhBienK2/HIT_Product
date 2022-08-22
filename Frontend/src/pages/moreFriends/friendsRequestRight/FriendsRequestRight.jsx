import React, { useState, useEffect } from "react";
import FriendsRequestItems from "./friendRequestItems/FriendRequestItems";
import Axios from "../../../services/axios.service";

function FriendsRequestRight() {
    const [confirmFriend, setConfirmFriend] = useState([]);
    useEffect(() => {
        Axios({
            method: "GET",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/list-user-make-friend`,
            withCredentials: true,
        })
            .then((data) => {
                if (
                    data.status === "success" &&
                    data.listUserMakeFriend.length !== 0
                ) {
                    data.listUserMakeFriend.forEach((ele) => {
                        setConfirmFriend((current) => [...current, ele]);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
                                avatar={ele.avatar}
                                name={ele.name}
                                ele={ele}
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default FriendsRequestRight;
