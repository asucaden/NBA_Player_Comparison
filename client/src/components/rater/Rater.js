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
          <h1 className="large text-light">Player Rater</h1>
          <PlayerRater />
        </section>
      </section>
    </>
  );
};

export default Rater;
