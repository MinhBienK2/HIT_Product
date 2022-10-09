import React from "react";
import { Avatar } from "@mui/material";
import smallDot from "../../assets/icons/Ellipse 11.svg";
import "./WidgetsRow.scss";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import {
    addProfileName,
    addProfileAvatar,
    addProfileUserId,
} from "../../store/reducers/profileOther";

function WidgetsRow({ avatar, title, keyId, state, TimeUpdatedAt }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleToProfileOther() {
        dispatch(addProfileName(title));
        dispatch(addProfileAvatar(avatar));
        dispatch(addProfileUserId(keyId));
        navigate(`/profile-others/${keyId}`);
    }

    return (
        <div className="widgetsRow" key={keyId} onClick={handleToProfileOther}>
            {avatar ? <Avatar src={avatar} /> : <Avatar />}
            <p>{title}</p>
            {state === false ? (
                <p className="timeActive">{moment(TimeUpdatedAt).fromNow()}</p>
            ) : (
                <img src={smallDot} alt="" />
            )}
        </div>
    );
}

export default WidgetsRow;
