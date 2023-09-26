import React from "react";
import PlayerReviewer from "./PlayerReviewer";

const Dashboard = () => {
  return (
    <>
      <section className="container-dashboard">
        <section className="container-centered">
          <h1 className="large text-light text-center">Player Comparer</h1>
          <PlayerReviewer />
        </section>
      </section>
    </>
  );
};

export default Dashboard;
