import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const POSTS_API = `${REMOTE_SERVER}/api/posts`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const getAllPosts = async () => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/getAllPosts`);

    return response.data;
}
