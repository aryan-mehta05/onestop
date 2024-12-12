import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
    const { pathname } = useLocation();
    const { currentUser } = useSelector((state: any) => state.userReducer);
    let links = [
        { label: "Home", path: "/" },
        { label: "Profile", path: "/profile" },
        { label: "Search", path: "/search" },
    ]

    if (Object.keys(currentUser).length > 0) {
        links = [
            ...links,
            { label: "Sign Out", path: "/signout" }
        ]
    } else {
        links = [
            ...links,
            { label: "Sign In", path: "/signin" },
            { label: "Sign Up", path: "/signup" },
        ]
    }

    return (
        <div className="float-end">
            <ul className="nav nav-tabs">
                {links.map((link) => (
                    <li className="nav-item">
                        <Link key={link.path} to={link.path} className={`nav-link ${pathname.endsWith(link.path) ? "active" : ""}`}>
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}