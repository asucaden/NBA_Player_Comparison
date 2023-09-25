import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import PlayerReviewer from "./PlayerReviewer";

const Dashboard = () => {
  return (
    <>
      <section className="container-dashboard">
        <section className="container-centered">
          <h1 className="large text-light text-center">Player Comparer</h1>
          <PlayerReviewer />
        </section>
        {/* <section className="container-tweet">
          {false && (
            <TwitterTimelineEmbed
              sourceType="timeline"
              screenName="@c_swish_stats"
              noHeader="false"
              options={{ height: 800, width: 350 }}
            />
          )}
        </section> */}
      </section>
    </>
  );
};

export default Dashboard;
