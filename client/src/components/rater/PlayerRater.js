import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadRatings } from "../../actions/playerRater";
import { ratePlayers } from "../../actions/ratePlayers";
import Spinner from "../layout/Spinner";

const PlayerRater = ({
  loadRatings,
  ratePlayers,
  players: { player1, player2 },
}) => {
  useEffect(() => {
    loadRatings();
  }, [loadRatings]);

  return (
    <>
      {player1.cm_name && (
        <>
          <button className="btn btn-primary" onClick={() => loadRatings()}>
            Generate new player comparison
          </button>

          <div className="float-container">
            <div classname="float-child">
              <br />
              {player1.cm_name}
              <br />
              {Math.round(player1.cm_fame)} ELO Rating
              <br />
              <button
                className="btn btn-success"
                onClick={() =>
                  ratePlayers({
                    player1: player1.cm_name,
                    player2: player2.cm_name,
                    winner: 1,
                  })
                }
              >
                ^ He's better
              </button>
            </div>
            <div classname="float-child">
              <br />
              {player2.cm_name}
              <br />
              {Math.round(player2.cm_fame)} ELO Rating
              <br />
              <button
                className="btn btn-success float-child-center"
                onClick={() =>
                  ratePlayers({
                    player1: player1.cm_name,
                    player2: player2.cm_name,
                    winner: 2,
                  })
                }
              >
                ^ He's better
              </button>
            </div>
          </div>
        </>
      )}

      {!player1.cm_name && <Spinner />}
    </>
  );
};

PlayerRater.propTypes = {
  loadPlayers: PropTypes.func.isRequired,
  ratePlayers: PropTypes.func.isRequired,
  players: PropTypes.object,
};

const mapStateToProps = (state) => ({
  players: state.playerRater,
});

export default connect(mapStateToProps, { loadRatings, ratePlayers })(
  PlayerRater
);
