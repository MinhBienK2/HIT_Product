import React,{useEffect,useState} from 'react'
import Story from './Story'
import {Avatar} from "@mui/material"
import camera from '../../assets/icons/camera.svg'
import './StoryReel.scss'
import Axios from '../../services/axios.service'

function StoryReel() {

  const [stories,setStories] = useState([])

  useEffect(()=> {
    Axios({
      method : "GET",
      url : 'http://localhost:3000/api/v1/stories',
      withCredentials: true,
    }).then(data => {
      if(data.status ==="success"){
        setStories(data.stories)
      }
    }).catch(err => {
      console.log(err);
    })
  },[])

  return (
    <div className="storyReel">
      <div className="storyReel-add">
        <Avatar className="storyReel-add-avatar"/>
        <img src={camera} alt="camera" className="storyReel-add-icon"/>
        <p>+Add</p>
      </div>
      {
        stories && stories.map(story => {
          return <Story title={story.userId.name} avatar={story.userId.avatar} profileSrc={story.story} id={story._id}/> 
        })
      }
    </div>
  )
}

export default StoryReel