import { useEffect, useState } from "react";
import * as client from "./client";

export default function ProfileFriends() {
    const currentUser = "mike_lappas1"
    const [friends, setFriends] = useState<any>();
    const findFriendsByUsername = async (username: String) => {
        const response = await client.findFriendsByUsername(username);
        setFriends(response);
    }

    useEffect(() => {
        findFriendsByUsername(currentUser);
    }, []);
    return (
        <div className="w-3/12">
            <div className="justify-center">Friends</div>
            <br />
            <ul>
                {friends && friends.length > 0 && friends.map((friend: any) => (
                    <li className="border">
                        <div>{friend.user2.username}</div>
                        <div>{friend.user2.firstName}</div>
                        <div>{friend.user2.lastName}</div>
                        <div>{friend.user2.email}</div>
                        <div>{friend.user2.role}</div>
                        <div>{friend.user2.dob}</div>
                    </li>
                    
                ))}
            </ul>
        </div>


    )
}