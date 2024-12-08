import { useEffect } from "react";
import * as client from "./client";

export default function ProfileFriends() {
    const currentUser = "mike_lappas"
    // const currentUser = "test";
    // const findFriendsByUsername = async (username: String) => {
    //     const response = await client.findFriendsByUsername(username);
    //     console.log(response);
    // }

    // useEffect(() => {
    //     findFriendsByUsername(currentUser);
    // }, []);
    return (
        <div className="w-3/12 flex justify-center relative overflow-hidden">Friends</div>
    )
}