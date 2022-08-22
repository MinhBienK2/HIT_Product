import axios from "axios";
import Axios from "../axios.service";
import storageService from "../storage.service";

class commentService {
    async getAllCommentOfPost(postID, setListComment) {
        try {
            const data = await Axios({
                method: "GET",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/v1/comments/get-comment/${postID}`,
                withCredentials: true,
            });
            if (data.status === "success") {
                setListComment(data.allComments);
            }
        } catch (error) {
            // alert(error)
            console.log(error);
        }
    }
}

export default new commentService();
