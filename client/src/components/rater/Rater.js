import React, { Fragment } from "react";
import PlayerRater from "./PlayerRater";
import Spinner from "../layout/Spinner";

const Rater = () => {
  return (
    <>
      <>
        {!PlayerRater && (
          <>
            <br />
            <br />
            <br />
            <br />
            <Spinner />
          </>
        )}
      </>
      <section className="container-dashboard">
        <section className="container-centered">
          <h1 className="large text-light text-center">Player Rater</h1>
          <PlayerRater />
          <p className="directions">
            If you mark a comparision 'tweet-worthy' it will be tweeted by the{" "}
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/c_swish_stats"
            >
              @c_swish_stats
            </a>{" "}
            twitter bot!
          </p>
        </section>
      </section>
    </>
  );
};

export default Rater;
