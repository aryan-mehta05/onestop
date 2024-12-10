import { useEffect, useState } from "react"
import * as client from "./client";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/index";
import { setCurrentUserLikes } from "../SignIn/reducer";
import { Link } from "react-router-dom";

export default function Home() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [userLikesObjects, setUserLikesObjects] = useState(currentUser.likes);
    let userLikes: any;
    if (userLikesObjects) {
        userLikes = userLikesObjects.map((likeItem: any) => (
            likeItem.post
        ))
    } else { userLikes = [] }
    // const [userLikes, setUserLikes] = useState(currentUser.likes.map((likeItem:any) => (
    //     likeItem.post
    // )))
    const [posts, setPosts] = useState<any>();
    const getAllPosts = async () => {
        const response = await client.findAllPosts();
        setPosts(response);
    }
    const likePost = async (pid: string, uid: string) => {
        const newLike = await client.likePost(pid, uid);
        setUserLikesObjects([...userLikesObjects, newLike]);
        dispatch(setCurrentUserLikes([...currentUser.likes, newLike]));
    }
    useEffect(() => {
        getAllPosts();
    }, []);
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

                        return (
                            <li key={post._id} className="list-group-item border m-2">
                                {<img src={imageData} alt={post.destinationCountry} />}
                                <Link to={`/profile/${post.poster}`}>{post.poster}</Link>
                                <div>{post.caption}</div>
                                <div><b>{post.destinationCity}, {post.destinationCountry}</b></div>
                                {currentUser.username && !userLikes.includes(post._id) && <button onClick={(() => { likePost(post._id, currentUser._id) })}>Like</button>}
                                {currentUser.username && userLikes.includes(post._id) && <div>Liked!</div>}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}