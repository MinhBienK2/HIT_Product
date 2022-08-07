import React, { useState, useEffect } from "react";
// import './FriendRequestItems.scss'
import img1 from "../../../../assets/images/Frame 212.svg";
import img2 from "../../../../assets/images/Frame 213.svg";
import img3 from "../../../../assets/images/Frame 214.svg";
import { Avatar } from "@mui/material";
import Axios from "../../../../services/axios.service";

function FriendRequestItems({ keyId, avatar, name, ele }) {
    const [confirmFriend, setConfirmFriend] = useState([]);

    async function handleAccess(ele, friendId) {
        console.log(keyId);
        try {
            const data = await Axios({
                method: "POST",
                url: `http://localhost:3000/api/v1/friends/${keyId}`,
                withCredentials: true,
            });
            if (data.status === "success") {
                alert("success");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function handleAbort(ele, friendId) {
        // try {
        //     const data = await Axios({
        //         method: "DELETE",
        //         url: `http://localhost:3000/api/v1/friends/${friendId}`,
        //         withCredentials: true,
        //     });
        //     if (data.status === "success") {
        //         setConfirmFriend((current) => {
        //             return current.filter((ele2) => {
        //                 return ele2 !== ele;
        //             });
        //         });
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <div className="friendsRequestItems" key={keyId}>
            <Avatar src={avatar} />
            <h3>{name}</h3>
            <div className="friendsRequestItems_bbc">
                <div className="friendsRequestItems_bbc-left">
                    <img
                        className="friendsRequestItems_bbc-left-img1"
                        src={img2}
                        alt=""
                    />
                    <img
                        className="friendsRequestItems_bbc-left-img2"
                        src={img3}
                        alt=""
                    />
                </div>
                <div className="friendsRequestItems_bbc-right">
                    <p>50 bạn bè chung</p>
                </div>
            </div>
            <button
                className="friendsRequestItems-btn"
                onClick={() => {
                    handleAccess(ele, ele.id);
                }}
            >
                Kết bạn
            </button>
            <button
                className="friendsRequestItems-btn2"
                onClick={() => {
                    handleAbort(ele, ele.id);
                }}
            >
                Ấn bỏ
            </button>
        </div>
    );
}

export default FriendRequestItems;
