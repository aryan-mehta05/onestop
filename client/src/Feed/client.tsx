import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const POSTS_API = `${REMOTE_SERVER}/api/posts`;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const createPost = async (post: any) => {
    const response = await axiosWithCredentials.post(`${POSTS_API}/createPost`, post);

    return response.data;
}
