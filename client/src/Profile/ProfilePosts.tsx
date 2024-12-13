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
            <ul className="post-list list-group">
                {posts && posts.length > 0 && posts.map((post: any) => {
                    const imageData = "data:image/png;base64," + String.fromCharCode(...post.photo.data);
                    const likeCount = postLikes[post._id];

                    return (
                        <li className="post-card-profile m-2 card mw-10">

                            {<img src={imageData} alt={post.destinationCountry} className="m-4" />}
                            <div className="card-body">
                                <div className="mb-2">{post.poster}</div>
                                {!editing ? <div className="mx-2">{post.caption}</div> : <textarea className="post-caption-edit form-control" rows={10} cols={50} id="caption" value={newCaption} onChange={handleCaptionChange} />}
                                {!editing ? <div className="mx-2"><b>{post.destinationCity}, {post.destinationCountry}</b></div> :
                                    <div>
                                        <label className="form-label mt-2" htmlFor="destinationCity">City:</label>
                                        <input className="form-control " id="destinationCity" value={newDestinationCity} onChange={handleDestinationCityChange} />
                                        <label className="form-label mt-2" htmlFor="destinationCountry">Country:</label>
                                        <input className="form-control" id="destinationCountry" value={newDestinationCountry} onChange={handleDestinationCountryChange} />
                                    </div>}
                                {<div className="m-2">{likeCount === undefined ? "Loading..." : `Likes: ${likeCount.length}`}</div>}
                                {Object.keys(currentUser).length > 0 && !userLikes.includes(post._id) && <button className="like-post-button btn btn-primary ms-2" onClick={(() => { likePost(post._id, currentUser._id) })}>Like</button>}
                                {Object.keys(currentUser).length > 0 && userLikes.includes(post._id) && <div className="ms-2 btn btn-outline-primary">Liked!</div>}
                                {(currentUser.role === "Admin" || currentUser.username == post.poster) && !editing && <button className="delete-post-button btn btn-danger float-end" onClick={(() => deletePost(post._id))}>
                                    Delete</button>}
                                {(currentUser.username == post.poster) && !editing ?
                                    <button className="edit-post-button btn btn-warning float-end mx-2" onClick={(() => {
                                        setNewCaption(post.caption);
                                        setNewDestinationCity(post.destinationCity);
                                        setNewDestinationCountry(post.destinationCountry);

                                        setEditing(true);
                                    })}>Edit</button>
                                    :
                                    <span></span>
                                }
                                {editing ?
                                    <button className="update-post-button btn btn-success float-end mx-2" onClick={(() => {
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
                                    : <div></div>
                                }
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}