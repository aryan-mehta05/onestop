import { setCurrentUserLikes } from "../SignIn/reducer";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../Nav/index";
import * as client from "./client";
import * as homeClient from "../Home/client"
import HeaderLogo from "./HeaderLogo";

export default function Home() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [userLikesObjects, setUserLikesObjects] = useState(currentUser.likes);
    let userLikes: any;
    if (userLikesObjects) {
        userLikes = userLikesObjects.map((likeItem: any) => (
            likeItem.post
        ))
    } else {
        userLikes = []
    }
    const [posts, setPosts] = useState<any>();
    const [postLikes, setPostLikes] = useState<any>([]);
    const getAllPosts = async () => {
        const response = await client.findAllPosts();
        setPosts(response);
    }
    const likePost = async (pid: string, uid: string) => {
        const newLike = await client.likePost(pid, uid);
        setUserLikesObjects([...userLikesObjects, newLike]);
        dispatch(setCurrentUserLikes([...currentUser.likes, newLike]));
        setPostLikes((postLikes: any) => {
            return {
                ...postLikes,
                [pid]: postLikes[pid] ? [...postLikes[pid], newLike] : [newLike]
            };
        });
    }
    const deletePost = async (pid: string) => {
        await client.deletePost(pid);
        setPosts(posts.filter((post: any) => {
            return post._id !== pid
        }));
    }
    useEffect(() => {
        getAllPosts();
    }, []);
    useEffect(() => {
        const fetchLikes = async () => {
            let likes = [];
            for (const p of posts) {
                likes[p._id] = await homeClient.likes(p._id);
            }
            setPostLikes(likes);
        };

        if (posts && posts.length > 0) {
            fetchLikes();
        }
    }, [posts]);

    return (
        <div>
            <div className="row">
                <div>
                    <Nav />
                    <HeaderLogo />
                </div>
                <hr />
            </div>
            <div className="row">
                <h1 className="m-3">Hi{Object.keys(currentUser).length > 0 ? ` ${currentUser.firstName}` : ""}!</h1>
            </div>
            <hr />
            <ul className="post-list list-group">
                {posts && posts.length > 0 && posts.map((post: any) => {
                    const imageData = "data:image/png;base64," + String.fromCharCode(...post.photo.data);
                    const likeCount = postLikes[post._id];
                    return (
                        <li key={post._id} className="post-card m-2 card mw-10">
                            {<img src={imageData} alt={post.destinationCountry} className="m-4" />}
                            <Link to={`/profile/${post.poster}`} className="m-2">{post.poster}</Link>
                            <div className="m-4">{post.caption}</div>
                            <div className="mx-4"><b>{post.destinationCity}, {post.destinationCountry}</b></div>
                            {Object.keys(currentUser).length > 0 && currentUser.username && !userLikes.includes(post._id) && <button onClick={(() => { likePost(post._id, currentUser._id) })}>Like</button>}
                            {Object.keys(currentUser).length > 0 && currentUser.username && userLikes.includes(post._id) && <div>Liked!</div>}
                            {<div>{likeCount === undefined ? "Loading..." : `Likes: ${likeCount.length}`}</div>}
                            {(currentUser.role === "Admin" || currentUser.username == post.poster) && <button onClick={(() => deletePost(post._id))} className="float-end btn btn-danger m-4">Delete</button>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}