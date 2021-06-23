import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const logout = () => {
  localStorage.removeItem("weathernet_user");
  window.alert("user logged out");
  window.location.href = "./login";
};

export const NavBar = (props) => {
  const currentProfileId = localStorage.getItem("weathernet_user");

  return (
    <ul className="navbar">
      <li className="navbar__item active">
        <Link className="navbar__link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/forecasts">
          Forecasts
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to={`/profile/${currentProfileId}`}>
          Profile
        </Link>
      </li>
      <li className="logout__button">
        <button onClick={logout}>Logout</button>
      </li>
    </ul>
  );
};
