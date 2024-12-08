import axios from "axios";
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";

export const findPostsByUser = async (user:String) => {
    const response = await axios.get(`${REMOTE_SERVER}/api/posts/getPostsByUser/${user}`);
    return response.data;
}

export const findFriendsByUsername = async (username:String) => {
    const userResponse = await axios.get(`${REMOTE_SERVER}/api/user/${username}`)
    const user_id = userResponse.data._id
    const response = await axios.get(`${REMOTE_SERVER}/api/friends/${user_id}`);
    return response.data;
} 