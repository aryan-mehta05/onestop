import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as client from "./client";
import * as profileClient from "../Profile/client";
import { setCurrentUser, setCurrentUserLikes, setCurrentUserFriends } from './reducer';
import Nav from "../Nav/index";
import HeaderLogo from '../Home/HeaderLogo';

export default function SignIn() {
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [credentials, setCredentials] = useState<any>({});
    const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signin = async (e: any) => {
        e.preventDefault();

        if (credentials.username === undefined || credentials.password === undefined) {
            alert("Please enter your username and password!");
            return;
        }

        try {
            const user = await client.signin(credentials);
            const userLikes = await client.getUserLikes(user._id);
            const userFriends = await profileClient.findFriendsByUsernameNoDetails(user.username)
            dispatch(setCurrentUser(user));
            dispatch(setCurrentUserLikes(userLikes));
            dispatch(setCurrentUserFriends(userFriends));
            navigate("/profile");
        } catch (error) {
            return;
        }
    };

    return (
        <div className="flex">
            <Nav />
            <HeaderLogo />
            <div className='post-list'>
                <div className='card post-card'>
                    <h1 className="mb-4 text-center">Sign In</h1>
                    <form className="">
                        <div className='text-center'>
                            <input
                                type="text"
                                placeholder="Username"
                                defaultValue={credentials.username}
                                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                className="border px-4 py-2 rounded"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                defaultValue={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                className="border px-4 py-2 rounded"
                            />
                            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                        </div>
                        <div className=''>
                            <button className='btn btn-primary mx-4 my-2' onClick={signin}>
                                Sign In
                            </button>
                            <button
                                className='btn mx-4 my-2 float-end'
                                onClick={() => navigate('/signup')}
                            >
                                Don't have an account? Sign Up!
                            </button>
                            <br />
                            <button
                                className='btn btn-secondary mx-4 mb-2 float-end'
                                onClick={() => navigate('/')}
                            >
                                Back to Home Screen
                            </button>
                        </div>

                    </form>
                </div>

            </div>

        </div>
    );
};