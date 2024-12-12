import { setCurrentUser, setCurrentUserFriends, setCurrentUserLikes } from "../SignIn/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Nav from "../Nav/index";
import * as profileClient from "../Profile/client"
import * as signinClient from "../SignIn/client"
import * as signupClient from "./client"
import HeaderLogo from "../Home/HeaderLogo";

export default function SignUp() {
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        role: "User"
    });
    const [errorMsg, setErrorMsg] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async (event: any) => {
        event.preventDefault();

        if (credentials.username === "" || credentials.password === "") {
            alert("Please enter your username and password!");
            return;
        }

        try {
            const newUser = {
                username: credentials.username,
                password: credentials.password,
                firstName: "",
                lastName: "",
                email: "",
                dob: "",
                role: credentials.role,
                loginId: "",
                lastActivity: "",
                totalActivity: ""
            };

            const user = await signupClient.signup(newUser);
            const userLikes = await signinClient.getUserLikes(user._id);
            const userFriends = await profileClient.findFriendsByUsernameNoDetails(user.username);

            dispatch(setCurrentUser(user));
            dispatch(setCurrentUserLikes(userLikes));
            dispatch(setCurrentUserFriends(userFriends));

            navigate("/profile");
        } catch (error) {
            return;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Nav />
            <HeaderLogo/>
            <h1 className="text-3xl mb-4">Sign Up</h1>
            <form className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Username"
                    defaultValue={credentials.username}
                    onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
                    className="border px-4 py-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    defaultValue={credentials.password}
                    onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                    className="border px-4 py-2 rounded"
                />
                <select
                    onChange={(event) => setCredentials({ ...credentials, role: event.target.value })}
                    className="border px-4 py-2 rounded"
                >
                    <option value="Guest">Guest</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
                {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                <button onClick={signup}>
                    Sign Up
                </button>
                <button onClick={() => navigate("/signin")} >
                    Have an account already? Sign In!
                </button>
                <button onClick={() => navigate("/")} >
                    Back to the Home Screen
                </button>
            </form>
            <div>hello {currentUser.username}</div>
        </div>
    );
}
