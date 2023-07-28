import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/Home">Homes</Link>
        </li>
        <li>
          <Link to="/Reserve">Reserve a home</Link>
        </li>
        <li>
          <Link to="/Reservations">My Reservations</Link>
        </li>
        <li>
          <Link to="/AddHome">List your Home</Link>
        </li>
        <li>
          <Link to="/RemoveHome">Remove your listing</Link>
        </li>
      </ul>
    </div>
  );
}
