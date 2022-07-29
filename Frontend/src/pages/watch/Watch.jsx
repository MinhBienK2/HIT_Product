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
            url: `http://localhost:3000/api/v1/watch`,
            withCredentials: true,
        })
            .then((data) => {
                if (data.status === "success") {
                    data.listVideos.forEach((ele) => {
                        dispatch(AddListVideos(ele));
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
                url: `http://localhost:3000/api/v1/watch?page=${watch.pages}`,
                withCredentials: true,
                cancelToken: new axios.CancelToken((c) => (cancel = c)),
            })
                .then((data) => {
                    data.listPosts.forEach((ele) => {
                        dispatch(AddListVideos(ele));
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
                            return (
                                <Video
                                    key={ele._id}
                                    profilePic={ele.author[0].avatar}
                                    username={ele.author[0].name}
                                    message={ele.description}
                                    video={ele.videos}
                                    tym="50"
                                    comment="5"
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
