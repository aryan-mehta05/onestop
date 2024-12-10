import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Nav() {
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
        <div>
            {links.map((link) => (
                <Link key={link.path} to={link.path}>
                    {link.label}
                </Link>
            ))}
        </div>
    )
}