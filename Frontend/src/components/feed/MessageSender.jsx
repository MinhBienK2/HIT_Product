import React, {useState, useRef} from 'react';
import './MessageSender.scss';
import live from '../../assets/icons/bxs_video-plus.svg'
import picture from '../../assets/icons/fontisto_picture.svg'
import emoji from '../../assets/icons/fluent_emoji-24-regular.svg'
import {Avatar} from "@mui/material"
import axios from 'axios'
import postService from '../../services/post/post.service';
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

    return (
        <div className="messageSender">
            <div className="messageSender-top">
                <Avatar src={user.avatar}/>
                <input 
                    input={input}
                    onChange={(e)=> setInput(e.target.value)}
                    type="text" 
                    placeholder="Bạn đang nghĩ gì?"
                    ref={inputRef}
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
                        <img src={live} alt=""/>
                        <p>Phát trực tiếp</p>
                    </div>
                    <div 
                        onClick={()=>filepickerRef.current.click()} 
                        className="messageSender-bottom-options-option"
                    >
                        <img src={picture} alt=""/>
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
                        <img src={emoji} alt=""/>
                        <p>Cảm xúc/Hoạt động</p>
                    </div>
                </div>
                <button onClick={handleSubmit}>Đăng bài</button>
            </div>
        </div>
    );
}

export default MessageSender;
