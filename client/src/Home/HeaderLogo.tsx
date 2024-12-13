import { Link } from "react-router-dom";
import Nav from "../Nav";

export default function HeaderLogo() {
    return (
        <div>
            <Link to={"/"}><img src="/logo192.png" alt="" style={{ width: '50px', height: '50px' }} className="mx-4" /></Link>
        </div>
    )
}