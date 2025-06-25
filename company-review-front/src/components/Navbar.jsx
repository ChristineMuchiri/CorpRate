import React from "react";
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const getClassName = (isActive) =>
        isActive ? 'nav-link active' : 'nav-link';

    return (
        <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          Review App
        </NavLink>
        <div className="nav-links">
          <NavLink to="/submit-review" className={({ isActive }) => getClassName(isActive)}>
            Submit Review
          </NavLink>
          <NavLink to="/company-reviews" className={({ isActive }) => getClassName(isActive)}>
            Company Reviews
          </NavLink>
        </div>
      </div>
    </nav>
    )
}

export default Navbar;