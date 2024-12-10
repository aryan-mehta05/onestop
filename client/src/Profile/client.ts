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

export const findFriendsByUsernameNoDetails = async (username:String) => {
    const userResponse = await axios.get(`${REMOTE_SERVER}/api/user/${username}`)
    const user_id = userResponse.data._id
    const response = await axios.get(`${REMOTE_SERVER}/api/friends/no_detail/${user_id}`);
    return response.data;
} 

export const updateUser = async (uid:String, updateUser:any) => {
    const response = await axios.put(`${REMOTE_SERVER}/api/user/update/${uid}`, updateUser);
    return response.data;
}

export const findUserByUsername = async (username:string) => {
    const response = await axios.get(`${REMOTE_SERVER}/api/user/${username}`)
    return response.data
}

export const followFriend = async (user1: string, user2:string) => {
    const response = await axios.post(`${REMOTE_SERVER}/api/friends/add`, {user1, user2});
    return response.data;
}