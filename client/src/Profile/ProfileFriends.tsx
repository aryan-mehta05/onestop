import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "./client";
import { Link } from "react-router-dom";

export default function ProfileFriends(profileUsername?: { profileUsername: any }) {
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [friends, setFriends] = useState<any>();
    const findFriendsByUsername = async (username: String) => {
        if (profileUsername && profileUsername.profileUsername) {
            const response = await client.findFriendsByUsername(profileUsername.profileUsername);
            setFriends(response);
        } else {
            const response = await client.findFriendsByUsername(username);
            setFriends(response);
        }
    }

    useEffect(() => {
        findFriendsByUsername(currentUser.username);
    }, []);
    return (
        <div className="card me-4">
            <h2 className="text-center">Friends</h2>
            <ul>
                {friends && friends.length > 0 && friends.map((friend: any) => (
                    <li className="card my-2 me-4">
                        <div className="mx-2"><Link to={`/profile/${friend.user2.username}`}>{friend.user2.username}</Link></div>
                        <div className="mx-2">{friend.user2.firstName} {friend.user2.lastName}</div>
                        {/* <div className="mx-2">{friend.user2.lastName}</div> */}
                        {/* <div>{friend.user2.email}</div> */}
                        <div className="mx-2">{friend.user2.role}</div>
                        {/* <div>{friend.user2.dob}</div> */}
                    </li>
                ))}
            </ul>
        </div>
    )
}