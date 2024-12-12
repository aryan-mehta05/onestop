import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUserLikes } from "../SignIn/reducer";
import * as client from "./client";
import * as homeClient from "../Home/client";

export default function ProfilePosts(profileUsername?: { profileUsername: any; }) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [posts, setPosts] = useState<any>();
    const [postLikes, setPostLikes] = useState<any>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const [newCaption, setNewCaption] = useState<string>("");
    const [newDestinationCity, setNewDestinationCity] = useState<string>("");
    const [newDestinationCountry, setNewDestinationCountry] = useState<string>("");
    const handleCaptionChange = (event: any) => {
        setNewCaption(event.target.value);
    }
    const handleDestinationCityChange = (event: any) => {
        setNewDestinationCity(event.target.value);
    }
    const handleDestinationCountryChange = (event: any) => {
        setNewDestinationCountry(event.target.value);
    }
    const [userLikesObjects, setUserLikesObjects] = useState(currentUser.likes);
    let userLikes: any;
    if (userLikesObjects) {
        userLikes = userLikesObjects.map((likeItem: any) => (
            likeItem.post
        ))
    } else { userLikes = [] }
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
    const deletePost = async (pid: string) => {
        await homeClient.deletePost(pid);
        setPosts(posts.filter((post: any) => {
            return post._id !== pid
        }));
    }
    const updatePost = async (newPost: any) => {
        await homeClient.updatePost(newPost);
    }
    useEffect(() => {
        getPostsForUser(currentUser);
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
        <div className="w-6">
            <div className="justify-center">Posts</div>
            <br />
            <ul>
                {posts && posts.length > 0 && posts.map((post: any) => {
                    const imageData = "data:image/png;base64," + String.fromCharCode(...post.photo.data);
                    const likeCount = postLikes[post._id];

                    return (
                        <li className="list-group-item border m-2">
                            {<img src={imageData} alt={post.destinationCountry} />}
                            <div>{post.poster}</div>
                            {!editing ? <div>{post.caption}</div> : <div><input id="caption" value={newCaption} onChange={handleCaptionChange} /></div>}
                            {!editing ? <div><b>{post.destinationCity}, {post.destinationCountry}</b></div> : <div><input id="destinationCity" value={newDestinationCity} onChange={handleDestinationCityChange} />, <input id="destinationCountry" value={newDestinationCountry} onChange={handleDestinationCountryChange} /></div>}
                            {Object.keys(currentUser).length > 0 && !userLikes.includes(post._id) && <button onClick={(() => { likePost(post._id, currentUser._id) })}>Like</button>}
                            {Object.keys(currentUser).length > 0 && userLikes.includes(post._id) && <div>Liked!</div>}
                            {<div>{likeCount === undefined ? "Loading..." : `Likes: ${likeCount.length}`}</div>}
                            {(currentUser.username == post.poster) && !editing ?
                                <button onClick={(() => {
                                    setNewCaption(post.caption);
                                    setNewDestinationCity(post.destinationCity);
                                    setNewDestinationCountry(post.destinationCountry);

                                    setEditing(true);
                                })}>Edit</button>
                                :
                                <button onClick={(() => {
                                    setPosts(posts.filter(async (p: any) => {
                                        if (p._id !== post._id) {
                                            return p;
                                        }

                                        p.caption = newCaption;
                                        p.destinationCity = newDestinationCity;
                                        p.destinationCountry = newDestinationCountry;

                                        await updatePost(p);

                                        setEditing(false);

                                        setNewCaption("");
                                        setNewDestinationCity("");
                                        setNewDestinationCountry("");

                                        return p;
                                    }));
                                })}>Update</button>
                            }
                            {(currentUser.role === "Admin" || currentUser.username == post.poster) && <button onClick={(() => deletePost(post._id))}>Delete</button>}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}