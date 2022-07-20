import React,{useEffect,useState} from 'react'
import './NotificationCallVideo.scss'

<script type="application/x-javascript">  </script>


const NotificationCallVideo = () => {

    // const listenerEvent = () => {
    //     setTimeout(hideURLbar, 0);
    // }

    // function hideURLbar(){ window.scrollTo(0,1); } 

  return (
        <div className="login-form">
            <div className="head-info">
                <a href="#"><img id="border-image" src="http://localhost:3000/images/photos/photos-62a0145202bdec9a37419707-1658248491721.jpeg" /></a>
                {/* <div className="head"><a href="#"><img src="http://localhost:3000/images/photos/photos-62a0145202bdec9a37419707-1658248491721.jpeg" /></a></div> */}
            </div>
                <div className="social-icons">
                    <h2>Ed Droste</h2>
                    <ul className="bottom-buttons">
                        <li>
                            <a href="#">
                                <i className="video"> </i>
                                <p>Talk</p>
                            </a>
                        </li>
                            <li>
                            <a href="#" className="top-close">
                                <i className="close"> </i>
                                <p>Later</p>
                            </a>
                        </li>
                    </ul>
                </div>
	    </div>
  )
}

export default NotificationCallVideo