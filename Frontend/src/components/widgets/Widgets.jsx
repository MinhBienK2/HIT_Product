import React, { useEffect, userState } from "react";
import WidgetsRow from "./WidgetsRow";
import BigDot from "../../assets/icons/Ellipse 6.svg";
import dot3 from "../../assets/icons/Group 33.svg";
import search from "../../assets/icons/akar-icons_search.svg";
import ava from "../../assets/images/ava5.jpg";
import "./Widgets.scss";

import { useDispatch, useSelector } from "react-redux";
import { showMessage, fetchListFriend } from "../../store/reducers/listFriend";

function Widgets() {
    const dispatch = useDispatch();
    const listFriend = useSelector((state) => state.listFriend);

    useEffect(() => {
        dispatch(fetchListFriend());
    }, []);

    return (
        <div className="widgets">
            <div className="widgets-top">
                <div className="widgets-top-left">
                    <p>Bạn bè đang hoạt động</p>
                    <img src={BigDot} alt="" />
                </div>
                <div className="widgets-top-right">
                    <img src={search} alt="" />
                    <img src={dot3} alt="" className="widgets-top-right-dot3" />
                </div>
            </div>
            <div className="widgets-bottom">
                {listFriend.list &&
                    listFriend.list.map((ele) => {
                        // console.log(ele);
                        return (
                            <WidgetsRow
                                avatar={
                                    ele.friendId.avatar
                                        ? ele.friendId.avatar
                                        : ava
                                }
                                title={ele.friendId.name}
                                keyId={ele.friendId.id}
                                state={ele.friendId.activeState.state}
                                TimeUpdatedAt={
                                    ele.friendId.activeState.updatedAt
                                }
                            />
                        );
                    })}
            </div>
        </div>
    );
}

export default Widgets;
