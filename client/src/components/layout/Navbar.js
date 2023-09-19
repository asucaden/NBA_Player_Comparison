import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loading }) => {
  const links = (
    <ul className="navbar-ul">
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" /> <span>Generate tweets</span>
        </Link>
      </li>
      <li>
        <Link to="/rater">
          <i className="fas fa-user" />
          <span>Rate players</span>
        </Link>
      </li>
      <li>
        <a
          href="https://twitter.com/c_swish_stats"
          target="_blank"
          rel="noreferrer"
        >
          @c_swish_stats
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar-container bg-dark">
      <div>
        <Link className="navbar-link" to="/">
          <h1>C Swish Stats</h1>
        </Link>
      </div>
      {!loading && <>{links}</>}
    </nav>
  );
};

export default Navbar;
