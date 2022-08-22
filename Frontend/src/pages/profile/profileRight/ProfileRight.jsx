import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileRight.scss";
import Avatar from "@mui/material/Avatar";
import Widgets from "../../../components/widgets/Widgets";
import axios from "axios";
import Axios from "../../../services/axios.service";

function ProfileRight() {
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
                url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/friends/${friendId}`,
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

    const navigate = useNavigate();

    async function handleAbort(ele, friendId) {
        try {
            const data = await Axios({
                method: "DELETE",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/friends/${friendId}`,
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

    // console.log(confirmFriend);
    return (
        <div className="profileRight">
            <div className="profileRight_addfr">
                <h3 onClick={() => navigate("/FriendsRequest")}>
                    Lời mời kết bạn
                </h3>
                <div className="profileRight_addfr-content">
                    {confirmFriend &&
                        confirmFriend.map((ele) => {
                            return (
                                <div
                                    className="profileRight_addfr-content-items"
                                    key={ele.id}
                                >
                                    <div className="profileRight_addfr-content-items-top">
                                        <div className="profileRight_addfr-content-items-top-left">
                                            <Avatar src={ele.userId.avatar} />
                                        </div>
                                        <div className="profileRight_addfr-content-items-top-right">
                                            <p>{ele.userId.name}</p>
                                            {/* <span>8 bạn chung</span> */}
                                        </div>
                                    </div>
                                    <div className="profileRight_addfr-content-items-bottom">
                                        <button
                                            className="profileRight_addfr-content-items-bottom-accept"
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
                                            className="profileRight_addfr-content-items-bottom-refuse"
                                            onClick={() => {
                                                handleAbort(ele, ele.userId.id);
                                            }}
                                        >
                                            Từ chối
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <div className="profileRight_friend">
                <Widgets />
            </div>
        </div>
    );
}

export default ProfileRight;
