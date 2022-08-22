import axios from "axios";

const instance = axios.create({
    //    baseUrl: `${process.env.REACT_APP_BACKEND_URL}`,
});

instance.interceptors.response.use((response) => {
    const { data } = response;
    return response.data;
});

export default instance;
