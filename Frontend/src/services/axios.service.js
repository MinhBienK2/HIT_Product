import axios from "axios";

const instance = axios.create({
   //    baseUrl: "http://localhost:3000",
});

instance.interceptors.response.use((response) => {
   const { data } = response;
   return response.data;
});

export default instance;
