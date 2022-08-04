import React, { useState, useEffect } from "react";
import "./ProfileHeader.scss";

import Avatar from "@mui/material/Avatar";
import coverImg from "../../../assets/images/Rectangle 60.svg";
import camera from "../../../assets/icons/bi_camera-fill.svg";
import music from "../../../assets/icons/bi_file-earmark-music.svg";
import write from "../../../assets/icons/fa_pencil-square.svg";
import UploadAvatar from "../../../components/formUpload/UploadAvatar";
import UploadBanner from "../../../components/formUpload/UploadBanner";

function ProfileHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [postShow, setPostShow] = useState(false);
    const [bannerShow, setBannerShow] = useState(false);

    const handleShowModal = () => {
        setPostShow(true);
    };

    const handleShowModalBanner = () => {
        setBannerShow(true);
    };

    return (
        <div className="profileHeader">
            <div className="profileHeader_top">
                <img className="profileHeader_top-img1" src={coverImg} alt="" />
                <img
                    className="profileHeader_top-img2"
                    src={camera}
                    alt=""
                    onClick={handleShowModalBanner}
                />
                <UploadBanner
                    show={bannerShow}
                    onHide={() => setBannerShow(false)}
                />
            </div>

            <div className="profileHeader_bottom">
                <div className="profileHeader_bottom-content">
                    <div className="profileHeader_bottom-content-left">
                        <div className="profileHeader_bottom-content-left-img">
                            <img src={music} alt="" />
                        </div>
                        <p>Bao tiền một mớ bình yên</p>
                    </div>
                    <div className="profileHeader_bottom-content-right">
                        <p>Chỉnh sửa</p>
                        <img src={write} alt="" />
                    </div>
                </div>
            </div>

            <div className="profileHeader_info">
                <div className="profileHeader_info-avar">
                    <Avatar src={user.avatar} alt="" />
                    <img src={camera} alt="" onClick={handleShowModal} />
                    <UploadAvatar
                        show={postShow}
                        onHide={() => setPostShow(false)}
                    />
                </div>
                <h3>{user.name}</h3>
                <h4>(Sun)</h4>
                <p>We are one!</p>
            </div>
        </div>
    );
}

export default ProfileHeader;
