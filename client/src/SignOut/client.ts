import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const signout = async (credentials: any) => {
    const response = await axiosWithCredentials.post(`${REMOTE_SERVER}/api/users/signout`, credentials);
    return response.data;
}
