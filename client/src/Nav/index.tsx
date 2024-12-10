import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
    const { pathname } = useLocation();
    // return (
    //     <ul className="nav nav-pills">
    //         <li className="nav-item">
    //             <a href="/">Home</a>
    //         </li>
    //         <li className="nav-item">
    //             <a href="/search">Search</a>
    //         </li>
    //         <li className="nav-item">
    //             <a href="/profile">Profile</a>
    //         </li>
    //         <li className="nav-item">
    //             <a href="/signin">Sign In</a>
    //         </li>
    //     </ul>
    // )
    const links = [
        { label: "Home", path: "/"},
        { label: "Profile", path: "/profile" },
        { label: "Search", path: "/search"  },
        { label: "Sign In", path: "/signin" }
    ]
    return(
        <div>
            {links.map((link) => (
                <Link key={link.path} to={link.path}>
                    {link.label}
                </Link>
            ))}
        </div>
    )
}