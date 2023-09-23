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
      <button className="btn btn-primary" onClick={() => loadPlayers()}>
        Generate new player comparison
      </button>
      {sleeperPlayer.cm_name && (
        <>
          <div className="float-container">
            <div className="float-child">
              <br />
              {sleeperPlayer.cm_name}
              <br />
              {sleeperPlayer.pts} PTS
              <br />
              {sleeperPlayer.reb} REB
              <br />
              {sleeperPlayer.ast} AST
              <br />
              {sleeperPlayer.cm_ts_pct}% True Shooting
            </div>
            <div className="float-child">
              <br />
              {famousPlayer.cm_name}
              <br />
              {famousPlayer.pts} PTS
              <br />
              {famousPlayer.reb} REB
              <br />
              {famousPlayer.ast} AST
              <br />
              {famousPlayer.cm_ts_pct}% True Shooting
            </div>
          </div>
          <ComparisionTweeter className="flex-buttons" />
          <p className="directions">
            Mark a comparison 'tweet-worthy' to queue it to
            <br />
            be tweeted by the @c_swish_stats twitter bot!
          </p>
        </>
      )}
      {!sleeperPlayer.cm_name && <Spinner />}
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
