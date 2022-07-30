import './ProfileCenter.scss'
import MessageSender from '../../../components/feed/MessageSender' 
import Post from '../../../components/feed/Post'
import React, { useEffect, useState, useRef } from "react";
// import img1 from "../../assets/images/ava5.jpg";
import Axios from "../../../services/axios.service";

import { useSelector, useDispatch } from "react-redux";
import {
    AddListPosts,
    updateNumberPage,
    updateCheckRepeat,
} from "../../../store/reducers/post";
import axios from "axios";

function ProfileCenter() {

  const dispatch = useDispatch();
    const post = useSelector((state) => state.post);
    const tagFeed = useRef();
    const tagContainerPost = useRef();

    useEffect(() => {
        Axios({
            method: "GET",
            url: `http://localhost:3000/api/v1/posts`,
            withCredentials: true,
        })
            .then((data) => {
                if (data.status === "success") {
                    data.listPosts.forEach((ele) => {
                        // console.log(ele);
                        if (ele) {
                            Axios({
                                method: "GET",
                                url: `http://localhost:3000/api/v1/reactions/of-post/${ele._id}`,
                                withCredentials: true,
                            })
                                .then((data) => {
                                    ele.numberReactions = data.reactionLength;
                                    dispatch(AddListPosts(ele));
                                })
                                .catch((err) => {
                                    // alert(err);
                                    console.log(err);
                                });
                        }
                    });
                }
                // console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const scrollCallApi = () => {
        if (
            tagFeed.current.scrollTop === tagFeed.current.scrollHeight - 660 ||
            tagFeed.current.scrollTop === tagFeed.current.scrollHeight - 660.5
        ) {
            let cancel;
            Axios({
                method: "GET",
                url: `http://localhost:3000/api/v1/posts?page=${post.pages}`,
                withCredentials: true,
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
                .then((data) => {
                    data.listPosts.forEach((ele) => {
                        dispatch(AddListPosts(ele));
                    });
                    dispatch(updateNumberPage());
                })
                .catch((err) => {
                    console.log(err);
                    if (axios.isCancel(err)) return;
                });
            return () => cancel();
        }
    };


  return (
    <div className='profileCenter'>
        
        <MessageSender />
        <div className="getHeightScroll" ref={tagContainerPost}>
       
                {post.listPosts &&
                    post.listPosts.filter(item => item.author.id === JSON.parse(localStorage.getItem("user")).id).map((ele) => {
                        return (
                            <Post
                                key={ele._id}
                                profilePic={ele.author.avatar}
                                username={ele.author.name}
                                message={ele.description}
                                images={ele.photos}
                                videos={ele.videos}
                                tym={ele.numberReactions}
                                comment="5"
                            />
                        );
                    })}
            </div>
    </div>
  )
}

export default ProfileCenter