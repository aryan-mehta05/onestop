import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../SignIn/reducer";
import * as client from "./client";

export default function ProfileInfo(profileUsername?: { profileUsername: any; }) {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [updateUser, setUpdateUser] = useState(currentUser);
    const [editing, setEditing] = useState(false)
    const [profileUser, setProfileUser] = useState<any>();
    const saveProfileChanges = () => {
        const uid = currentUser._id
        const likes = currentUser.likes
        dispatch(setCurrentUser({ ...updateUser, likes: likes }));
        client.updateUser(uid, updateUser)
        setEditing(false);
    }

    const findUserByUsername = async (username: string) => {
        let response = {}
        if (profileUsername && profileUsername.profileUsername) {
            response = await client.findUserByUsername(profileUsername.profileUsername);
        } else {
            response = currentUser;
        }
        setProfileUser(response);
    }

    useEffect(() => {
        findUserByUsername(currentUser.username);
    }, []);
    return (
        <div className="card ms-4">
            <img className="m-2" src="/images/profile-pic.jpg" alt="" />
            {!editing && <div>
                <div className="m-2">
                    {profileUsername && profileUsername.profileUsername && profileUser ? <div><b>{profileUser.firstName} {profileUser.lastName}</b></div> : <div><b>{currentUser.firstName} {currentUser.lastName}</b></div>}
                    {/* {profileUsername && profileUsername.profileUsername && profileUser ? <div>{profileUser.lastName}</div> : <div>{currentUser.lastName}</div>} */}
                    {profileUsername && profileUsername.profileUsername && profileUser ? <div>email: <b>{profileUser.email}</b></div> : <div>email: <b>{currentUser.email}</b></div>}
                    {profileUsername && profileUsername.profileUsername && profileUser ? <div>username: <b>{profileUser.username}</b></div> : <div>username: <b>{currentUser.username}</b></div>}
                    {profileUsername && profileUsername.profileUsername && profileUser ? <div>role: <b>{profileUser.role}</b></div> : <div>role: <b>{currentUser.role}</b></div>}
                    {profileUsername && !profileUsername.profileUsername && <button className="btn btn-primary" onClick={(() => { setEditing(!editing) })}>Edit Profile Info</button>}
                </div>

            </div>}
            {editing && <div>
                <label className="form-label" htmlFor="first_name">First Name:</label>
                <input className="form-control" id="first_name" type="text" defaultValue={currentUser.firstName}
                    onChange={((e) => { setUpdateUser({ ...updateUser, firstName: e.target.value }) })} />
                <br />
                <label className="form-label" htmlFor="last_name">Last Name:</label>
                <input className="form-control" id="last_name" type="text" defaultValue={currentUser.lastName}
                    onChange={((e) => { setUpdateUser({ ...updateUser, lastName: e.target.value }) })} />
                <br />
                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-control" id="email" type="email" defaultValue={currentUser.email}
                    onChange={((e) => { setUpdateUser({ ...updateUser, email: e.target.value }) })} />
                <div><b>{currentUser.username}</b></div>
                <label htmlFor="role">Role:</label>
                <select id="role" className="form-control"
                    onChange={((e) => { setUpdateUser({ ...updateUser, role: e.target.value }) })}>
                    {currentUser.role === "Guest" ? <option selected value="Guest">Guest</option> : <option value="Guest">Guest</option>}
                    {currentUser.role === "User" ? <option selected value="User">User</option> : <option value="User">User</option>}
                    {currentUser.role === "Admin" ? <option selected value="Admin">Admin</option> : <option value="Admin">Admin</option>}
                </select>
                <button className="btn btn-success m-2 float-end" onClick={(() => { saveProfileChanges() })}>Save</button>
                <button className="btn btn-danger m-2 float-end" onClick={(() => { setEditing(!editing) })}>Cancel</button>
            </div>}
        </div>
    )
}
