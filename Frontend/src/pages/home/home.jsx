import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Widgets from '../../components/widgets/Widgets'
import './home.scss'
import NotificationCallVideo from "../../components/notificationCallVideo/NotificationCallVideo";


const Home = () => {
  const callVideo = useSelector(state => state.callVideo)

  return (
    <div class='home'>
      <Header />
      <div className="home__body">
        <Sidebar/>
        <Feed/>
        <Widgets/>
      </div>
      {
        callVideo.isVideoCall && <NotificationCallVideo />
      }
    </div>
  )
}

export default Home