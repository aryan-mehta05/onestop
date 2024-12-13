import { useEffect, useState } from "react";
import ProfileFriends from "./ProfileFriends"
import ProfileInfo from "./ProfileInfo"
import ProfilePosts from "./ProfilePosts"
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/index";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import { setCurrentUserFriends } from "../SignIn/reducer";
import HeaderLogo from "../Home/HeaderLogo";

export default function Profile() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [userFriendsObjects, setUserFriendsObjects] = useState(currentUser.friends);
    let userFriends;
    if (userFriendsObjects) {
        userFriends = userFriendsObjects.map((friendItem: any) => (
            friendItem.user2
        ))
    } else { userFriends = [] }
    const profileUsername = useParams().username;
    const [profileUser, setProfileUser] = useState<any>();
    const followFriend = async () => {
        const response = await client.followFriend(currentUser._id, profileUser._id);
        setUserFriendsObjects([...userFriendsObjects, response]);
        dispatch(setCurrentUserFriends([...currentUser.friends, response]));
    }
    const findUserByUsername = async (username: string) => {
        let response = {}
        if (profileUsername) {
            response = await client.findUserByUsername(profileUsername);
        } else {
            response = currentUser;
        }
        setProfileUser(response);
    }
    useEffect(() => {
        findUserByUsername(currentUser.username);
    }, []);
    return (
        <div >
            <div className="row">
                <div>
                    <Nav />
                    <HeaderLogo />
                </div>
                <hr />
            </div>
            {profileUser && Object.keys(profileUser).length > 0 && <h1 className="mx-4">{profileUser.username}'s Profile</h1>}
            {Object.keys(currentUser).length > 0 && profileUsername && profileUser && !userFriends.includes(profileUser._id) && <button onClick={(() => { followFriend() })}>Follow</button>}
            {Object.keys(currentUser).length > 0 && profileUsername && profileUser && userFriends.includes(profileUser._id) && <div>Followed!</div>}

            <div className="row">
                <div className="col-12 col-md-4 col-lg-2">
                    <ProfileInfo profileUsername={profileUsername as string} />
                    {!profileUsername && <Link className="ms-4 my-2 btn btn-primary" to="/createPost">
                        {currentUser.role !== "Guest" && <button>Create New Post</button>}
                    </Link>}
                </div>
                <div className="col-12 col-md-8 col-lg-7">
                    <ProfilePosts profileUsername={profileUsername as string} />
                </div>
                <div className="col-12 col-md-12 col-lg-3">
                    <ProfileFriends profileUsername={profileUsername as string} />
                </div>
            </div>
        </div>
    )
}