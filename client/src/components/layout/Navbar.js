import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loading }) => {
  const links = (
    <ul className="navbar-ul">
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          <span> Generate tweets</span>
        </Link>
      </li>
      <li>
        <Link to="/rater">
          📈
          <span> Rate players</span>
        </Link>
      </li>
      <li>
        <span>
          <a href="/leaderboard">🏀 Leaderboard</a>
        </span>
      </li>
      <li>
        <span>
          <a
            href="https://twitter.com/c_swish_stats"
            target="_blank"
            rel="noreferrer"
          >
            @ c_swish_stats
          </a>
        </span>
      </li>
    </ul>
  );

  return (
    <nav className="navbar-container bg-dark">
      <Link className="navbar-link" to="/">
        <h1>C Swish Stats</h1>
      </Link>
      {!loading && <>{links}</>}
    </nav>
  );
};

export default Navbar;
