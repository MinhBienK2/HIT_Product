import React from 'react';
import {Avatar} from "@mui/material"
import './Story.scss'
import { Player, Hls } from '@vime/react';


function Story({profileSrc, title,id,avatar}) {
    return (
        <div className="story" key={id}>
            <div className="story-avatar">
                {
                    profileSrc.split('.')[1] ==='m3u8' ? 
                        <Player>
                            <Hls version="latest" >
                            <source data-src={profileSrc} type="application/x-mpegURL" />
                            </Hls>
                        </Player>
                        : <Avatar src={profileSrc} />
                }
            </div>
            <div className="story-status">
                <p>LIVE</p>
            </div>
            <h4>{title}</h4>
        </div>
    );
}

export default Story;
