import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const signin = async (credentials: any) => {
    const response = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/users/signin`, credentials);
    return response.data;
}

export const getUserLikes = async (uid: string) => {
    const response = await axios.get(`${REMOTE_SERVER}/api/likes/user/${uid}`);
    return response.data;
}