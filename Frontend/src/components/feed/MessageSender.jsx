import React, {useState, useRef} from 'react';
import './MessageSender.scss';
import live from '../../assets/icons/bxs_video-plus.svg'
import picture from '../../assets/icons/fontisto_picture.svg'
import emoji from '../../assets/icons/fluent_emoji-24-regular.svg'
import {Avatar} from "@mui/material"
import axios from 'axios'

function MessageSender() {

    const [input, setInput] = useState('')
    const inputRef = useRef(null)
    const filepickerRef = useRef(null)
    const [imageToPost, setImageToPost] = useState(null)

    const handleSubmit = async(e) => {

        e.preventDefault()

        if(!inputRef.current.value) return;

        try {
            const data = await axios({
                method: 'post',
                url: 'http://localhost:3000/api/v1/posts',
                data: {
                    description: inputRef.current.value,
                    image: imageToPost
                }
            })
            
            if(data.data.status === 'success') {
                console.log(input)
            }
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
                <Avatar/>
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
