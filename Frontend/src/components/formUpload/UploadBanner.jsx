import React, { useState, useRef, useEffect } from "react";
import "./UploadAvatar.scss";
import live from "../../assets/icons/bxs_video-plus.svg";
import picture from "../../assets/icons/fontisto_picture.svg";
import emoji from "../../assets/icons/fluent_emoji-24-regular.svg";
import { Avatar } from "@mui/material";
import axios from "axios";
import postService from "../../services/post/post.service";
import iconSmile from "../../assets/icons/bi_emoji-smile.svg";
import rainbow from "../../assets/icons/Frame 155.svg";
import pic from "../../assets/icons/Frame 156.svg";
import userTag from "../../assets/icons/fa6-solid_user-tag.svg";
import tagFace from "../../assets/icons/ic_round-tag-faces.svg";
import location from "../../assets/icons/Frame 157.svg";
import video from "../../assets/icons/Frame 161.svg";
import storageService from "../../services/storage.service";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Photogrid from "react-facebook-photo-grid";
import Axios from "../../services/axios.service";

function HandleShowPost(props) {
    const user = JSON.parse(localStorage.getItem("user"));
    const [input, setInput] = useState("");
    const [file, setFile] = useState([]);
    const inputRef = useRef(null);
    const filepickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState([]);
    var formData = new FormData();
    const [updateLocalUser, setUpdateLocalUser] = useState(false);
    var reader = new FileReader();
    useEffect(() => {
        Axios({
            method: "GET",
            url: "http://localhost:3000/api/v1/users/reset-user-local",
            withCredentials: true,
        }).then((data) => {
            if (data.status === "success") {
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.updateUserLocal)
                );
            }
        });
    }, [updateLocalUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(localStorage.getItem("accessToken"));
        try {
            file.forEach((ele) => {
                formData.append("banner", ele);
            });
            await axios
                .patch(
                    `http://localhost:3000/api/v1/users/${user.id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `Bearer ${localStorage.getItem(
                                "accessToken"
                            )}`,
                        },
                        withCredentials: true,
                    }
                )
                .then((data) => {
                    // setUpdateLocalUser(true);
                    reader.abort();
                    Axios({
                        method: "GET",
                        url: "http://localhost:3000/api/v1/users/reset-user-local",
                        withCredentials: true,
                    }).then((data) => {
                        if (data.status === "success") {
                            localStorage.setItem(
                                "user",
                                JSON.stringify(data.updateUserLocal)
                            );
                        }
                    });
                    props.onHide();
                    // setUpdateLocalUser(false);
                    window.location.reload();
                });
        } catch (err) {
            console.log(err);
            alert("Error");
        }
        // inputRef.current.value = ''
    };

    const addImageToPost = (e) => {
        function readAndPreview(file) {
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
                setFile((current) => [...current, file]);
                reader.onload = (readerEvent) => {
                    setImageToPost((current) => [
                        ...current,
                        readerEvent.target.result,
                    ]);
                };
                reader.readAsDataURL(file);
            }
        }

        if (e.target.files) {
            Array.prototype.forEach.call(e.target.files, readAndPreview);
        }
    };

    const removeImage = () => {
        filepickerRef.current.value = null;
        setImageToPost(null);
    };
    let classNameButtonSubmit = "btn-submit ";
    if (input.length > 0) {
        classNameButtonSubmit += "btn-submit-active";
    }

    const handleChangeInput = (e) => {
        setInput(e.target.value);
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton className="ms-title">
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="ms-title-p"
                >
                    Cập nhập Banner
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="ms-top">
                    <div className="ms-top-left">
                        <Avatar src={user.avatar} />
                    </div>
                    <div className="ms-top-right">
                        <p>{user.name}</p>
                    </div>
                </div>
                <div className="ms-content">
                    {imageToPost &&
                        imageToPost.map((ele) => {
                            return (
                                <div
                                    onClick={removeImage}
                                    className="messageSender-top-postImage"
                                >
                                    <img
                                        src={ele}
                                        alt=""
                                        style={{ width: "100%" }}
                                    />
                                    <p>Remove</p>
                                </div>
                            );
                        })}
                    <div className="ms-content-img">
                        <img src={iconSmile} alt="" />
                    </div>
                </div>

                <div className="ms-bottom">
                    <div className="ms-bottom-left">
                        <img src={rainbow} alt="" />
                    </div>
                    <div className="ms-bottom-right">
                        <div
                            className="ms-bottom-right-first"
                            onClick={() => filepickerRef.current.click()}
                        >
                            <img src={pic} alt="" />
                            <input
                                ref={filepickerRef}
                                onChange={addImageToPost}
                                multiple="true"
                                type="file"
                                hidden
                            />
                        </div>
                        <img src={userTag} alt="" height="24" width="30" />
                        <img src={tagFace} alt="" height="24" width="24" />
                        <img src={location} alt="" height="24" width="16" />
                        <img src={video} alt="" height="18" width="24.68" />
                    </div>
                </div>
                <button
                    onClick={handleSubmit}
                    id="btn-submit-id"
                    className={classNameButtonSubmit}
                >
                    Đăng
                </button>
            </Modal.Body>
        </Modal>
    );
}

export default HandleShowPost;
