import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Widgets from '../../components/widgets/Widgets'
import './home.scss'

const Home = () => {
  return (
    <div class='home'>
      <Header />
      <div className="home__body">
        <Sidebar/>
        <Feed/>
        <Widgets/>
      </div>
    </div>
  )
}

export default Home