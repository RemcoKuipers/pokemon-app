import {Link} from "react-router-dom";
import {useState} from "react";
import "./Navbar.css";
import Pokeball from "../../assets/Pokeball.png"


function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

    function toggleMenu() {
        setMenuOpen(false);
    }

    return (
        <aside className="sidebar">
            <div className="logo">
                <Link to="/">
                    <img src={Pokeball} alt="Home" className="pokeball-logo"/>
                </Link>
            </div>

            <button
                className="hamburger-button"
                onClick={() =>
                    setMenuOpen(!menuOpen)
                }
            >
                ☰
            </button>

            <nav
                className={`nav-links ${
                    menuOpen ? "open" : ""
                }`}
            >
                <Link to="/" onClick={toggleMenu}>Home</Link>
                <Link to="/search" onClick={toggleMenu}>Search</Link>
                <Link to="/collection" onClick={toggleMenu}>Collection</Link>
                <Link to="/login" onClick={toggleMenu}>Login</Link>
                <Link to="/register" onClick={toggleMenu}>Register</Link>
            </nav>
        </aside>
    );
}

export default Navbar;