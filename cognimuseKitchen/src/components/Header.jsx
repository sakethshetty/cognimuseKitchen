import React, { useState } from "react";
import "../styles/headStyle.css";
import { FaBars } from "react-icons/fa";
// import a hamburger icon from react-icons
import { Link,  } from "react-router-dom"
import SearchBar from "./SearchBar";

function Header(props) {
    console.log("rendered!");

    const [showMenu, setShowMenu] = useState(false); // create a state variable to toggle the menu

    const handleMenuClick = () => {
        setShowMenu(!showMenu); // change the state when the menu button is clicked
    };

    const handleLogout = () => {
        localStorage.setItem("isLoggedInKey", "");
        props.loggedInState.setLoggedIn("");
    }

    return (
        <div className="nav-holder">
            <div className="back-colorer">
                <nav className="navigationWrapper">
                    <div className="logoWrapper">
                        <span className="stylish">Cognimuse</span>
                        <span className="logo">Kitchen</span>
                    </div>
                    {!showMenu && <SearchBar></SearchBar>}
                    <div className="drpHolder">
                        <button className="menu-button" onClick={handleMenuClick}>
                            <FaBars /> {/* display the hamburger icon */}
                        </button>
                        <ul className={`navigation ${showMenu ? "active" : ""}`}>
                            {/* add a conditional class name based on the state */}
                            <li className="parent">
                                <Link to="/" className="link">
                                    Home
                                </Link>
                            </li>
                            <li className="parent">
                                <Link to="/recipes" className="link">
                                    Recipes
                                </Link>
                            </li>
                            <li className="parent">
                                {(props.loggedInState.isLoggedIn) ? <Link to="/fav" className="link">
                                    Favorites
                                </Link> : <Link to="/login" className="link">
                                    Favorites
                                </Link>}
                            </li>
                            <li className="parent">
                                <Link to="/about" className="link">
                                    About
                                </Link>
                            </li>
                            <li className="parent">
                                {(!props.loggedInState.isLoggedIn) ? <Link to="/login" className="link">
                                    Login
                                </Link> : <span className="link linkSpan" onClick={handleLogout}>Logout</span>}
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div >
    );
}

export default Header;
