import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const LIKES_API = `${REMOTE_SERVER}/api/likes`
const POSTS_API = `${REMOTE_SERVER}/api/posts`

const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAllPosts = async () => {
    const response = await axiosWithCredentials.get(`${POSTS_API}/getAllPosts`);

    return response.data;
}

export const likePost = async (pid: string, uid: string) => {
    const response = await axiosWithCredentials.post(`${LIKES_API}/likePost`, { pid: pid, uid: uid });

    return response.data;
}

export const deletePost = async(pid: string) => {
    const response = await axiosWithCredentials.delete(`${POSTS_API}/deletePost/` + pid);

    return response.data;
}

export const updatePost = async(post: any) => {
    const response = await axiosWithCredentials.put(`${POSTS_API}/updatePost/`, post);

    return response.data;
}

export const likes = async(pid: string) => {
    const response = await axiosWithCredentials.get(`${LIKES_API}/` + pid);

    return response.data;
}
