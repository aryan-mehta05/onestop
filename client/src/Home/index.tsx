import { setCurrentUserLikes } from "../SignIn/reducer";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Nav from "../Nav/index";
import * as client from "./client";
import * as homeClient from "../Home/client"

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
            <Nav />
            <div>Home</div>
            <div className="w-6">
                <div className="justify-center">Posts</div>
                <br />
                <ul>
                    {posts && posts.length > 0 && posts.map((post: any) => {
                        const imageData = "data:image/png;base64," + String.fromCharCode(...post.photo.data);
                        const likeCount = postLikes[post._id];

                        return (
                            <li key={post._id} className="list-group-item border m-2">
                                {<img src={imageData} alt={post.destinationCountry} />}
                                <Link to={`/profile/${post.poster}`}>{post.poster}</Link>
                                <div>{post.caption}</div>
                                <div><b>{post.destinationCity}, {post.destinationCountry}</b></div>
                                {currentUser.username && !userLikes.includes(post._id) && <button onClick={(() => { likePost(post._id, currentUser._id) })}>Like</button>}
                                {currentUser.username && userLikes.includes(post._id) && <div>Liked!</div>}
                                {<div>{likeCount === undefined ? "Loading..." : `Likes: ${likeCount.length}`}</div>}
                                {(currentUser.role === "Admin" || currentUser.username == post.poster) && <button onClick={(() => deletePost(post._id))}>Delete</button>}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}