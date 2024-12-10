import { useEffect, useState } from "react"
import * as client from "./client";
import React from "react";
import * as homeClient from "../Home/client";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/index";
import { setCurrentUser, setCurrentUserLikes } from "../SignIn/reducer";
import { Link } from "react-router-dom";

export default function ProfilePosts(profileUsername?: { profileUsername: any; }) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [posts, setPosts] = useState<any>();
    const [userLikesObjects, setUserLikesObjects] = useState(currentUser.likes);
    let userLikes: any;
    if (userLikesObjects) {
        userLikes = userLikesObjects.map((likeItem: any) => (
            likeItem.post
        ))
    } else {userLikes = []}
    const getPostsForUser = async (user: String) => {
        if (profileUsername && profileUsername.profileUsername) {
            const response = await client.findPostsByUser(profileUsername.profileUsername);
            setPosts(response);
        } else {
            const response = await client.findPostsByUser(currentUser.username);
            setPosts(response);
        }
    }
    const likePost = async (pid: string, uid: string) => {
        const newLike = await homeClient.likePost(pid, uid);
        setUserLikesObjects([...userLikesObjects, newLike]);
        dispatch(setCurrentUserLikes([...currentUser.likes, newLike]));

    }
    useEffect(() => {
        getPostsForUser(currentUser);
    }, []);
    return (
        <div className="w-6">
            <div className="justify-center">Posts</div>
            <br />
            <ul>
                {posts && posts.length > 0 && posts.map((post: any) => (
                    <li className="list-group-item border m-2">
                        {/* <div>{post.photo}</div> */}
                        {/* <img src={`${post.photo}`} alt="" /> */}
                        <div>{post.poster}</div>
                        <div>{post.caption}</div>
                        <div>{post.destinationCity}, {post.destinationCountry}</div>
                        {!userLikes.includes(post._id) && <button onClick={(() => { likePost(post._id, currentUser._id) })}>Like</button>}
                        {userLikes.includes(post._id) && <div>Liked!</div>}
                    </li>
                ))}
            </ul>
        </div>
    )
}