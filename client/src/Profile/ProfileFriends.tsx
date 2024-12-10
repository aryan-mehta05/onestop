import { useEffect, useState } from "react";
import * as client from "./client";
import React from "react";
import { useSelector } from "react-redux";

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