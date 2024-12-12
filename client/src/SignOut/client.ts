import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const USERS_API = `${REMOTE_SERVER}/api/users`

const axiosWithCredentials = axios.create({ withCredentials: true });

export const signout = async (credentials: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`, credentials);
    return response.data;
}
