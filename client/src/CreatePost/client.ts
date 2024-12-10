import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";

export const createNewPost = async (newPost:any) => {
    const response = await axios.post(`${REMOTE_SERVER}/api/posts/createPost`, newPost);
    return response.data;
}