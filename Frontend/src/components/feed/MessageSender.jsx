import React, { useState, useRef, useEffect } from "react";
import "./MessageSender.scss";
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

function HandleShowPost(props) {
    const [input, setInput] = useState("");
    const [file, setFile] = useState([]);
    const [fileVideo, setFileVideo] = useState([]);
    const inputRef = useRef(null);
    const filepickerRef = useRef(null);
    const [imageToPost, setImageToPost] = useState([]);
    const [videoToPost, setVideoToPost] = useState([]);
    var formData = new FormData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(localStorage.getItem("accessToken"));
        try {
            formData.append("description", inputRef.current.value);
            file.forEach((ele) => {
                formData.append("photos", ele);
            });
            fileVideo.forEach((ele) => {
                formData.append("videos", ele);
            });
            postService.createPost(formData).then((data) => {
                props.onHide();
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
                const reader = new FileReader();
                setFile((current) => [...current, file]);
                reader.onload = (readerEvent) => {
                    setImageToPost((current) => [
                        ...current,
                        readerEvent.target.result,
                    ]);
                };
                reader.readAsDataURL(file);
            }
            if (/\.(mp4)$/i.test(file.name)) {
                const reader = new FileReader();
                setFileVideo((current) => [...current, file]);
                reader.onload = (readerEvent) => {
                    setVideoToPost((current) => [
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
        setImageToPost(null);
    };

    const user = JSON.parse(localStorage.getItem("user"));
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
                    TẠO BÀI VIẾT
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
                    <input
                        input={input}
                        type="text"
                        placeholder={`${user.name} ơi, bạn đang nghĩ gì thế?`}
                        onChange={(e) => handleChangeInput(e)}
                        ref={inputRef}
                    />
                    {imageToPost &&
                        imageToPost.map((ele) => {
                            return (
                                <div
                                    onClick={removeImage}
                                    className="messageSender-top-postImage"
                                >
                                    <img src={ele} alt="" />
                                    <p>Remove</p>
                                </div>
                            );
                        })}
                    {videoToPost &&
                        videoToPost.map((ele) => {
                            return (
                                <div
                                    onClick={removeImage}
                                    className="messageSender-top-postImage"
                                >
                                    <video controls>
                                        <source src={ele} type="video/mp4" />
                                    </video>
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

function MessageSender() {
    const user = JSON.parse(localStorage.getItem("user"));

    const [postShow, setPostShow] = useState(false);

    const handleShowModal = () => {
        setPostShow(true);
    };

    return (
        <div className="messageSender">
            <div className="messageSender-top">
                <Avatar src={user.avatar} />
                <input
                    type="text"
                    placeholder="Bạn đang nghĩ gì?"
                    onClick={handleShowModal}
                    variant="primary"
                />

                <HandleShowPost
                    show={postShow}
                    onHide={() => setPostShow(false)}
                />
            </div>

            <div className="messageSender-bottom">
                <div className="messageSender-bottom-options">
                    <div className="messageSender-bottom-options-option">
                        <img src={live} alt="" height="32" width="21.33" />
                        <p>Phát trực tiếp</p>
                    </div>
                    <div className="messageSender-bottom-options-option">
                        <img src={picture} alt="" height="32.25" width="24" />
                        <p>Ảnh/Video</p>
                    </div>
                    <div className="messageSender-bottom-options-option">
                        <img src={emoji} alt="" height="32" width="32" />
                        <p>Cảm xúc/Hoạt động</p>
                    </div>
                </div>
                <button onClick={handleShowModal}>Đăng bài</button>
            </div>
        </div>
    );
}

export default MessageSender;
