import axios from "axios";
import storageService from "../storage.service";

class PostService {
  async createPost(bodyFormData) {
    axios
      .post("http://localhost:3000/api/v1/posts", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${storageService.get("accessToken")}`,
        },
      })
      .then((data) => {
        console.log(data);
      });
    // axios({
    //   method: "post",
    //   url: "http://localhost:3000/api/v1/posts",
    //   data: bodyFormData,
    //   headers: {
    //     "Content-Type": `multipart/form-data; boundary=${bodyFormData._boundary}`,
    //     Authorization: `Bearer ${storageService.get("accessToken")}`,
    //   },
    // }).then(function (response) {
    //   console.log(response);
    // });
  }
}

export default new PostService();
