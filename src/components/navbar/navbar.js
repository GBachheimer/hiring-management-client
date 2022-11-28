import { Link} from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../userContext";
import { AdminContext } from "../adminContext";
import "./navbar.css";

export default function Navbar(props) {
    const {user} = useContext(AuthContext);
    const {admin} = useContext(AdminContext);
    const navigate = useNavigate();

    const logOut = () => {
        signOut(auth);
        navigate("/");
        console.log("Logged out!");
    }

    return (
        <div>
            {window.innerWidth > 768 ? <nav className = "navbar navbar-dark bg-dark bg-opacity-50">
                <NavLink className = "navbar-brand mx-4 p-1" to = "/" style = {{fontSize: "0.8rem"}}>Home</NavLink>
                {(!user || (user && !user.emailVerified)) && <div>
                    <NavLink className = "buttonStyleNavbar mx-2 p-1" aria-current = "page" to = "/signup">Sign up</NavLink>
                    <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/login">Login</NavLink>
                </div>}
                {user && user.emailVerified && <div>
                    <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/overview">Overview</NavLink>
                    <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/statistics">Statistics</NavLink>
                    {admin && <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/positions">Positions</NavLink>}
                    {admin && <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/companies">Companies</NavLink>}
                    {admin && <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/admins">Admins</NavLink>}
                    <button className = "buttonStyleNavbar mx-2 p-1" onClick = {logOut}>Logout</button>
                </div>}
            </nav> :
            <nav className = "navbar navbar-dark bg-dark fixed-top">
                <div className = "container-fluid">
                    <a className = "navbar-brand" href="#">Menu</a>
                    <button className = "navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
                        <span className = "navbar-toggler-icon"></span>
                    </button>
                    <div className = "offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div className = "offcanvas-header">
                            <h5 className = "offcanvas-title" id="offcanvasDarkNavbarLabel">Menu</h5>
                            <button type="button" className = "btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className = "offcanvas-body">
                            <NavLink className = "navbar-brand mx-4 p-1" to = "/" style = {{fontSize: "0.8rem"}}>Home</NavLink>
                            {(!user || (user && !user.emailVerified)) && <ul className = "navbar-nav justify-content-end flex-grow-1 pe-3">
                                <NavLink className = "buttonStyleNavbar mx-2 p-1" aria-current = "page" to = "/signup">Sign up</NavLink>
                                <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/login">Login</NavLink>
                            </ul>}
                            {user && user.emailVerified && <ul className = "navbar-nav justify-content-end flex-grow-1 pe-3">
                                <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/overview">Overview</NavLink>
                                <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/statistics">Statistics</NavLink>
                                {admin && <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/positions">Positions</NavLink>}
                                {admin && <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/companies">Companies</NavLink>}
                                {admin && <NavLink className = "buttonStyleNavbar mx-2 p-1" to = "/admins">Admins</NavLink>}
                                <button className = "buttonStyleNavbar mx-2 p-1" onClick = {logOut}>Logout</button>
                            </ul>}
                        </div>
                    </div>
                </div>
            </nav>}
      </div>
    );
}