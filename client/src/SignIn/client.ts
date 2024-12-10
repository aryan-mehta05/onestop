import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const LIKES_API = `${REMOTE_SERVER}/api/likes`
const USERS_API = `${REMOTE_SERVER}/api/users`

const axiosWithCredentials = axios.create({ withCredentials: true });

export const signin = async (credentials: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response.data;
}

export const getUserLikes = async (uid: string) => {
    const response = await axios.get(`${LIKES_API}/user/${uid}`);
    return response.data;
}