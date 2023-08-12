import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ loading }) => {
  const links = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">
            Generate tweets&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </Link>
        <Link to="/rater">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Rate players&nbsp;&nbsp;&nbsp;&nbsp;</span>
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
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">C Swish Stats </Link>
      </h1>
      {!loading && <Fragment>{links}</Fragment>}
    </nav>
  );
};

export default Navbar;
