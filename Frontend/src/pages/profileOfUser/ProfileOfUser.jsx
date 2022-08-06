import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ProfileOfUser.scss";
import { useDispatch, useSelector } from "react-redux";

import {
    setFriendId,
    formatArrayFriendId,
    addElementToArrayFriendId,
} from "../../store/reducers/chat";
import { showMessage } from "../../store/reducers/listFriend";
import { getNameWithClick } from "../../store/reducers/message";
import { addProfileCheckRenderView } from "../../store/reducers/profileOther";

const ProfileOfUser = () => {
    const dispatch = useDispatch();
    const listFriend = useSelector((state) => state.listFriend);
    const notification = useSelector((state) => state.notification);
    const profileOther = useSelector((state) => state.profileOther);
    const { userId } = useParams();
    const navigate = useNavigate();

    function handleClick() {
        try {
            dispatch(setFriendId(userId));
            dispatch(showMessage(userId));
            dispatch(formatArrayFriendId());
            dispatch(addElementToArrayFriendId(userId));
            dispatch(getNameWithClick(profileOther.profileName));
            dispatch(addProfileCheckRenderView(true));
            navigate("/Messenger");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <button onClick={handleClick}> message</button>
        </>
    );
};

export default ProfileOfUser;
