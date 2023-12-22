import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadPlayers } from "../../actions/playerReview";
import ComparisionTweeter from "./ComparisionTweeter";
import Spinner from "../layout/Spinner";

const PlayerReviewer = ({
  loadPlayers,
  players: { sleeperPlayer, famousPlayer },
}) => {
  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  return (
    <>
      {sleeperPlayer.cm_name ? (
        <>
          <div className="float-container">
            <div className="float-child-left text-center">
              <h4>{sleeperPlayer.cm_name}</h4>
              {sleeperPlayer.pts} PTS
              <br />
              {sleeperPlayer.reb} REB
              <br />
              {sleeperPlayer.ast} AST
              <br />
              {sleeperPlayer.cm_ts_pct}% True Shooting
              <img
                className="player-picture"
                src={`playerPics/${sleeperPlayer.cm_name.replaceAll(
                  " ",
                  "-"
                )}.png`}
                alt={sleeperPlayer.cm_name}
              ></img>
            </div>
            <div className="float-child-right text-center">
              <h4>{famousPlayer.cm_name}</h4>
              {famousPlayer.pts} PTS
              <br />
              {famousPlayer.reb} REB
              <br />
              {famousPlayer.ast} AST
              <br />
              {famousPlayer.cm_ts_pct}% True Shooting
              <img
                className="player-picture"
                src={`playerPics/${famousPlayer.cm_name.replaceAll(
                  " ",
                  "-"
                )}.png`}
                alt={famousPlayer.cm_name}
              ></img>
            </div>
          </div>
          <ComparisionTweeter />

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
        </>
      ) : (
        <Spinner />
      )}{" "}
    </>
  );
};

PlayerReviewer.propTypes = {
  loadPlayers: PropTypes.func.isRequired,
  players: PropTypes.object,
};

const mapStateToProps = (state) => ({
  players: state.playerReview,
});

export default connect(mapStateToProps, { loadPlayers })(PlayerReviewer);
