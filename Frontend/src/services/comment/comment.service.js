import axios from "axios";
import Axios from "../axios.service";
import storageService from "../storage.service";
import { sendComment } from "../../utils/webSocket";

class commentService {
    async getAllCommentOfPost(postID, setListComment, setCountComment) {
        try {
            const data = await Axios({
                method: "GET",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/comments/get-comment/${postID}`,
                withCredentials: true,
            });
            if (data.status === "success") {
                setListComment(data.allComments);
                setCountComment(data.lengthComment);
            }
        } catch (error) {
            // alert(error)
            console.log(error);
        }
    }
    async CreateComment(content, postID, parentCmt, focusMouse) {
        try {
            if (content === "" || content === null) {
                return;
            }
            const data = await Axios({
                method: "POST",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/comments`,
                withCredentials: true,
                data: {
                    content,
                    postID,
                    parentCmt,
                },
            });
            if (data.status === "success") {
                sendComment(data);
                focusMouse.current.value = "";
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new commentService();
