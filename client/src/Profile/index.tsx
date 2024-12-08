import ProfileFriends from "./ProfileFriends"
import ProfileInfo from "./ProfileInfo"
import ProfilePosts from "./ProfilePosts"

export default function Profile() {
    const currentUser = "mike_lappas";
    // const currentUser = "test";
    return (
        <div >
            <h1>Profile</h1>
            <div className="flex w-full h-screen">
                <ProfileInfo/>
                <ProfilePosts/>
                <ProfileFriends/>
            </div>
        </div>
    )
}