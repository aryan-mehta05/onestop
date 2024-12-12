import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const POSTS_API = `${REMOTE_SERVER}/api/posts`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const createNewPost = async (newPost:any) => {
    const response = await axiosWithCredentials.post(`${POSTS_API}/createPost`, newPost);

    return response.data;
}
