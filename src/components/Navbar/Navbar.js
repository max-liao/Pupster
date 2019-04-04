import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
const Navbar = props => (
  <nav className="navbar navbar-default">
    <Link className="navbar-brand" to="/">
      Pupster
    </Link>
    <div className="container-fluid">
      <ul className="nav navbar-nav">
        <li
          className={
            window.location.pathname === "/" ||
            window.location.pathname === "/about"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/" className="nav-link">
            About
          </Link>
        </li>
        <li
          className={
            window.location.pathname === "/discover"
              ? "nav-item active"
              : "nav-item"
          }
        >
          <Link to="/discover" className="nav-link">
            Discover
          </Link>
        </li>
        <li
          className={
            window.location.pathname === "/search"
            ? "nav-item active"
            : "nav-item"
          }
        >
          <Link to="/search" className="nav-link">
            Search Breeds
          </Link>
        </li>
        <li
          className={
            window.location.pathname === "/sandbox"
            ? "nav-item active"
            : "nav-item"
          }
        >
          <Link to="/sandbox" className="nav-link">
            Find Pups
          </Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
