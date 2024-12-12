import { signout } from "./client";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../SignIn/reducer";

export default function SignOut() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: any) => state.userReducer);

    useEffect(() => {
        const signOut = async () => {
            await signout(currentUser);
        }

        signOut();
        dispatch(setCurrentUser([]));
        navigate("/");
    }, []);

    return (
        <div>Signing out...</div>
    );
}
