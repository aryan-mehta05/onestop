import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.userReducer);
    if (currentUser.username) {
        return children;
    } else {
        return <Navigate to="/signin" />;
    }
}
