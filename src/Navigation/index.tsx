import { FaRegCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { LiaCogSolid } from "react-icons/lia";
import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
    const { pathname } = useLocation();

    const links = [
        { label: "Discover", path: "/OneStop/Discover", icon: FaSearch },
        { label: "Friends", path: "/OneStop/Friends", icon: FaUserFriends },
        { label: "Settings", path: "/OneStop/Settings", icon: LiaCogSolid },
    ];

    return (
        <div id="wd-onestop-navigation" style={{ width: 110 }} className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-primary z-2">
            <a href="https://github.com/aryan-mehta05/onestop/" id="wd-one-stop-link" className="list-group-item text-center border-0 bg-primary" target="_blank">
                <img src="/images/OneStop.png" width="75px" />
            </a>
            <Link to="/OneStop/Profile" className={`list-group-item text-center border-0 bg-primary
                ${pathname.includes("Profile") ? "bg-white text-info" : "bg-primary text-white"}`}>
                <FaRegCircleUser className={`fs-1 ${pathname.includes("Profile") ? "text-info" : "text-white"}`} />
                <br />
                Profile
            </Link>
            {links.map((link) => (
                <Link key={link.path} to={link.path} className={`list-group-item bg-primary text-center border-0 ${pathname.includes(link.label) ? "text-info bg-white" : "text-white bg-primary"}`}>
                    {link.icon({ className: "fs-1 text-info" })}
                    <br />
                    {link.label}
                </Link>
            ))}
        </div>
    );
}
