import React, { useEffect, useState, useRef } from "react";
import "./Watch.scss";
import Header from "./header/Header";
import SidebarWatch from "./sidebarWatch/SidebarWatch";
import Widgets from "../../components/widgets/Widgets";
import Video from "./videos/Video";
import img1 from "../../assets/images/ava5.jpg";
import Axios from "../../services/axios.service";
import { useSelector, useDispatch } from "react-redux";
import {
    AddListVideos,
    updateNumberPage,
    updateCheckRepeat,
} from "../../store/reducers/watch";
import axios from "axios";

function Watch() {
    const dispatch = useDispatch();
    const watch = useSelector((state) => state.watch);
    const tagFeed = useRef();
    const tagContainerPost = useRef();

    useEffect(() => {
        Axios({
            method: "GET",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/watch`,
            withCredentials: true,
        })
            .then((data) => {
                if (data.status === "success") {
                    // data.listVideos.forEach((ele) => {
                    //     dispatch(AddListVideos(ele));
                    // });
                    data.listVideos.forEach((ele) => {
                        if (ele) {
                            console.log(ele._id);
                            Axios({
                                method: "GET",
                                url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/reactions/of-post/${ele._id}`,
                                withCredentials: true,
                            })
                                .then((data) => {
                                    ele.numberReactions = data.reactionLength;
                                    Axios({
                                        method: "GET",
                                        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/reactions/check/${ele._id}`,
                                        withCredentials: true,
                                    })
                                        .then((data) => {
                                            if (data) {
                                                ele.isCheckExistLike = true;
                                                dispatch(AddListVideos(ele));
                                            }
                                        })
                                        .catch((err) => {
                                            if (err) {
                                                ele.isCheckExistLike = false;
                                                dispatch(AddListVideos(ele));
                                            }
                                        });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
                    });
                }
                console.log(data);
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
                url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/watch?page=${watch.pages}`,
                withCredentials: true,
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
                .then((data) => {
                    // data.listPosts.forEach((ele) => {
                    //     dispatch(AddListVideos(ele));
                    // });
                    data.listVideos.forEach((ele) => {
                        if (ele) {
                            console.log(ele._id);
                            Axios({
                                method: "GET",
                                url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/reactions/of-post/${ele._id}`,
                                withCredentials: true,
                            })
                                .then((data) => {
                                    ele.numberReactions = data.reactionLength;
                                    Axios({
                                        method: "GET",
                                        url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/reactions/check/${ele._id}`,
                                        withCredentials: true,
                                    })
                                        .then((data) => {
                                            if (data) {
                                                ele.isCheckExistLike = true;
                                                dispatch(AddListVideos(ele));
                                            }
                                        })
                                        .catch((err) => {
                                            if (err) {
                                                ele.isCheckExistLike = false;
                                                dispatch(AddListVideos(ele));
                                            }
                                        });
                                })
                                .catch((err) => {
                                    console.log(err);
                                });
                        }
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
        <div className="watch">
            <Header />
            <div className="watch__body" ref={tagFeed} onScroll={scrollCallApi}>
                <SidebarWatch />
                <div className="watch__body-video">
                    {watch.listPosts &&
                        watch.listPosts.map((ele) => {
                            console.log(ele);
                            return (
                                <Video
                                    key={ele._id}
                                    profilePic={ele.author[0].avatar}
                                    username={ele.author[0].name}
                                    message={ele.description}
                                    video={ele.videos}
                                    tym={ele.numberReactions}
                                    comment="5"
                                    isCheckLike={ele.isCheckExistLike}
                                    ele={ele}
                                />
                            );
                        })}
                </div>
                {/* <Widgets /> */}
            </div>
        </div>
    );
}

export default Watch;
