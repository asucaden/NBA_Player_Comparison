import React from "react";
import PlayerRater from "./PlayerRater";

const Rater = () => {
  return (
    <>
      <section className="container-dashboard">
        <section className="container-centered">
          <h1 className="large text-primary">Player Rater</h1>
          <PlayerRater />
        </section>
      </section>
    </>
  );
};

export default Rater;
