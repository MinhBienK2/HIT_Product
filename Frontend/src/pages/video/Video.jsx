import React, { useState, useRef } from "react";
import { Player, Hls } from "@vime/react";

const Video = () => {
    const hlsConfig = {
        // ...
    };

    return (
        <Player controls>
            <Hls version="latest" config={hlsConfig} poster="">
                <source
                    data-src={`${process.env.REACT_APP_BACKEND_URL}/videos/stories/story-62a0145202bdec9a37419707-1656833586307/story-62a0145202bdec9a37419707-1656833586307.m3u8`}
                    type="application/x-mpegURL"
                />
            </Hls>
            {/* ... */}
        </Player>
    );
};

export default Video;
