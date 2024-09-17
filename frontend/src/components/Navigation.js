import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  return (
    <nav className="top-nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink exact className="nav-button" activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-button" activeClassName="active" to="/upload">
            Upload
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-button" activeClassName="active" to="/users">
            Users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
