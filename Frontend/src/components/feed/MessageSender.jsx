import React, {useState, useRef} from 'react';
import './MessageSender.scss';
import live from '../../assets/icons/bxs_video-plus.svg'
import picture from '../../assets/icons/fontisto_picture.svg'
import emoji from '../../assets/icons/fluent_emoji-24-regular.svg'
import {Avatar} from "@mui/material"
import axios from 'axios'
import postService from '../../services/post/post.service';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function HandleShowPost(props) {
    const user = JSON.parse(localStorage.getItem('user'))

    return(
        <Modal
            {...props}
            size='lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Tạo bài viết
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="ms-top">
                    <div className="ms-top-left">
                        <Avatar src={user.avatar}/>
                    </div>
                    <div className="ms-top-right">
                        <p>{user.name}</p>
                    </div>
                </div>
                <div className="ms-content">
                    <input type="text" />
                </div>

                <div className="ms-bottom">
                    
                </div>

            </Modal.Body>
        </Modal>
    )
}

function MessageSender() {
    const user = JSON.parse(localStorage.getItem('user'))

    const [input, setInput] = useState('')
    const [file, setFile] = useState()
    const inputRef = useRef(null)
    const filepickerRef = useRef(null)
    const [imageToPost, setImageToPost] = useState(null)

    var formData = new FormData();
    
    const handleSubmit = async(e) => {

        e.preventDefault()

        if(!inputRef.current.value) return;

        try {
            formData.append('description', inputRef.current.value);
            formData.append('photos', file)

            postService.createPost(formData).then(data => {
                console.log(data);
            })
            console.log(file)
            
            // if(data.data.status === 'success') {
            //     console.log(input)
            // }
        }
        catch (err) {
            alert('Error')
        }
        inputRef.current.value = ''
      }

      const addImageToPost =(e) =>{
        const reader= new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0])
            setFile(e.target.files[0])
        }
        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result)
        }
      }

      const removeImage=()=>{
        setImageToPost(null)
      }

    // const handleSubmit =(e)=> {
    //     e.preventDefault()
        
    //     console.log(input)
    //     setInput("")
    // }

    const [postShow, setPostShow] = useState(true)

    const handleShowModal = () => {
        setPostShow(true);
    }

    return (
        <div className="messageSender">
            <div className="messageSender-top">
                <Avatar src={user.avatar}/>
                <input 
                    // input={input}
                    // onChange={(e)=> setInput(e.target.value)}
                    type="text" 
                    placeholder="Bạn đang nghĩ gì?"
                    // ref={inputRef}
                    onClick={handleShowModal}
                    variant="primary"
                />
                
                <HandleShowPost 
                    show={postShow}
                    onHide={()=>setPostShow(false)}
                />

                {imageToPost && (
                    <div onClick={removeImage} className="messageSender-top-postImage">
                        <img src={imageToPost} alt="" />
                        <p>Remove</p>
                    </div>
                )}
            </div>

            <div className="messageSender-bottom">
                <div className="messageSender-bottom-options">
                    <div className="messageSender-bottom-options-option">
                        <img src={live} alt="" height='32' width='21.33'/>
                        <p>Phát trực tiếp</p>
                    </div>
                    <div 
                        onClick={()=>filepickerRef.current.click()} 
                        className="messageSender-bottom-options-option"
                    >
                        <img src={picture} alt="" height='32.25' width='24'/>
                        <p>Ảnh/Video</p>
                        <input 
                            ref={filepickerRef} 
                            onChange={addImageToPost} 
                            multiple="true"
                            type="file" 
                            hidden 
                        />
                    </div>
                    <div className="messageSender-bottom-options-option">
                        <img src={emoji} alt="" height='32' width='32'/>
                        <p>Cảm xúc/Hoạt động</p>
                    </div>
                </div>
                <button onClick={handleSubmit}>Đăng bài</button>
            </div>
        </div>
    );
}

export default MessageSender;
