import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import PlayerReviewer from "./PlayerReviewer";

const Dashboard = () => {
  return (
    <>
      <section className="container-dashboard">
        <section className="container-centered">
          <h1 className="large text-primary">Player Comparer</h1>
          <PlayerReviewer />
        </section>
        <section className="container-tweet">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="c_swish_stats"
            noHeader="true"
            options={{ height: 800, width: 350 }}
          />
        </section>
      </section>
    </>
  );
};

export default Dashboard;
