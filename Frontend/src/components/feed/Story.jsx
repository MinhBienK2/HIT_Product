import React from 'react';
import {Avatar} from "@mui/material"
import './Story.scss'

function Story({profileSrc, title}) {
    return (
        <div className="story">
            <div className="story-avatar">
                <Avatar src={profileSrc} />
            </div>
            <div className="story-status">
                <p>LIVE</p>
            </div>
            <h4>{title}</h4>
        </div>
    );
}

export default Story;
