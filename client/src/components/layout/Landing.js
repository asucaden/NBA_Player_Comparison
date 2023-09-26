import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Rank, Discover, Tweet</h1>
          <p className="lead">
            C Swish Stats exists to unearth players whose stats outperform their
            public perception. Make your mark on public perception by rating
            players and tell the @cswishstats twitter bot what to tweet out
            next!
          </p>
          <div className="buttons">
            <Link to="/Rater" className="btn btn-primary">
              Rate Players
            </Link>
            <Link to="/Dashboard" className="btn btn-primary">
              Review Comparisons
            </Link>
            <a
              href="https://twitter.com/c_swish_stats"
              target="_blank"
              rel="noreferrer"
              className="btn btn-success tweet"
            >
              See Twitter Bot
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
