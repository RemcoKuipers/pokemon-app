import { Link } from "react-router-dom";
import "./Navbar.css";
import Pokeball from "../../assets/Pokeball.png"

function Navbar() {
    return (
        <aside className="sidebar">
            <div className="logo">
                <Link to="/">
                    <img src={Pokeball} alt="Home" className="pokeball-logo" />
                </Link>
            </div>

            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
                <Link to="/collection">Collection</Link>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </nav>
        </aside>
    );
}

export default Navbar;