import axios from "axios";
import storageService from "../storage.service";

class PostService {
    async createPost(bodyFormData) {
        await axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`,
                bodyFormData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                        )}`,
                    },
                }
            )
            .then((data) => {
                console.log(data.data);
                return data.data;
            });
    }
}

export default new PostService();
