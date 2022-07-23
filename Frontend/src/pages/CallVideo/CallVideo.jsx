import React,{useEffect,useState,useRef} from 'react'
import {useParams} from 'react-router-dom'
import './CallVideo.scss'
import { Peer } from "peerjs";
import {callVideo} from '../../utils/webSocket'
import { useDispatch,useSelector } from 'react-redux';
import {sendPeerIdToFriend} from '../../utils/webSocket'


const CallVideo = () => {
    const callVideo = useSelector(state => state.callVideo)
    // let {room,friendId} = useParams();
    const peer = new Peer()
    const userStreams1 = useRef()
    const userStreams2 = useRef()
    let peers
    const myVideo = document.createElement("video")
    // useEffect(() => {
        const constraints = {
            'video': true,
            'audio': true
        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(stream => {
                renderStreamVideo(myVideo,stream)
                connectWithPeerId(callVideo.friendPeerId)
                const myVideo3 = document.createElement("video")
                peer.on('call', function(call) {
                    call.answer(stream);
                    call.on('stream', function(stream) {
                        renderStreamVideo(myVideo3,stream)
                      });
                });
                
            })
            .catch(error => {
                console.error('Error accessing media devices.', error);
            });

            peer.on('open', function(id) {
                console.log('My peer ID is: ' + id);
                sendPeerIdToFriend({
                    peerId : id,
                    room : callVideo.roomIsFriendId
                })
            });

    // },[])
            
    const connectWithPeerId = (peerId,streamRemote) => {
        const myVideo2 = document.createElement("video")
        var call = peer.call(peerId,streamRemote);
        call.on('stream', function(stream) {
            renderStreamVideo(myVideo2,stream)
          });
        call.on("close", () => {
            console.log("first");
            myVideo2.remove();
         });
         peers[peerId] = call;
    }

    const renderStreamVideo = (video,stream) => {
        video.srcObject = stream;
        video.addEventListener("loadedmetadata", () => {
            video.play();
         });
         video.muted = true;
         userStreams1.current.append(video)
    }

  return (
    <div className='main'>
        <div className="user-streams" >
            <div className='user-me-streams-1' ref={userStreams1}></div>
            <div className='user-me-streams-2' ref={userStreams2}></div>
        </div>
        <div className="footer">
            <div className="icon-wrapper">
                <img className="control-icon" src="../../assets/iconVideo/video.svg" />
                <p>Cam</p>x
            </div>

            <div className="icon-wrapper">
                <img className="control-icon" src="../../assets/iconVideo/microphone.svg" />
                <p>Mic</p>
            </div>

            <div className="icon-wrapper">
                <img className="control-icon" src="../../assets/iconVideo/leave.svg" />
                <p>Leave</p>
            </div>
        </div>
    </div>
  )
}

export default CallVideo