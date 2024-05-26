import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadRatings } from "../../actions/playerRater";
import { ratePlayers } from "../../actions/ratePlayers";
import Spinner from "../layout/Spinner";
import { sleep } from "../../utils/sleep";

const PlayerRater = ({
  loadRatings,
  ratePlayers,
  players: { player1, player2, updated, fame_delta },
}) => {
  useEffect(() => {
    loadRatings();
  }, [loadRatings]);

  return (
    <>
      <button
        className="btn btn-primary btn-skip"
        onClick={() => {
          loadRatings();
        }}
      >
        Skip
      </button>
      {player1.cm_name ? (
        <>
          <div className="float-container">
            {updated === 0 && (
              <div
                className="float-child-left button-div"
                onClick={async () => {
                  ratePlayers({
                    player1: player1,
                    player2: player2,
                    winner: 1,
                  });
                  await sleep(600);
                  loadRatings();
                }}
              >
                <p className="player-name text-center">
                  {player1.cm_name} <br /> {Math.round(player1.cm_fame)} ELO
                  Rating
                </p>
                <img
                  className="player-picture"
                  onLoad={() => {}}
                  src={`/playerPics/${player1.cm_name.replaceAll(
                    " ",
                    "-"
                  )}.png`}
                  alt={player1.cm_name}
                ></img>
              </div>
            )}
            {updated === 1 && (
              <div className="float-child-left button-div-winner">
                <p className="player-name player-name-rise text-center">
                  {player1.cm_name} <br /> {Math.round(player1.cm_fame)}(+
                  {fame_delta}) ELO Rating
                </p>
                <img
                  className="player-picture player-picture-fade"
                  src={`/playerPics/${player1.cm_name.replaceAll(
                    " ",
                    "-"
                  )}.png`}
                  alt={player1.cm_name}
                ></img>
              </div>
            )}
            {updated === 2 && (
              <div className="float-child-left button-div-loser">
                <p className="player-name player-name-fall text-center">
                  {player1.cm_name} <br /> {Math.round(player1.cm_fame)}
                  (-{fame_delta}) ELO Rating
                </p>
                <img
                  className="player-picture player-picture-fade"
                  src={`/playerPics/${player1.cm_name.replaceAll(
                    " ",
                    "-"
                  )}.png`}
                  alt={player1.cm_name}
                ></img>
              </div>
            )}

            {updated === 0 && (
              <div
                className="float-child-right button-div"
                onClick={async () => {
                  ratePlayers({
                    player1: player1,
                    player2: player2,
                    winner: 2,
                  });
                  await sleep(600);
                  loadRatings();
                }}
              >
                <p className="player-name text-center">
                  {player2.cm_name}
                  <br /> {Math.round(player2.cm_fame)} ELO Rating
                </p>
                <img
                  className="player-picture"
                  src={`/playerPics/${player2.cm_name.replaceAll(
                    " ",
                    "-"
                  )}.png`}
                  alt={player2.cm_name}
                ></img>
              </div>
            )}
            {updated === 1 && (
              <div className="float-child-right button-div-loser">
                <p className="player-name player-name-fall text-center">
                  {player2.cm_name} <br /> {Math.round(player2.cm_fame)}(-
                  {fame_delta}) ELO Rating
                </p>
                <img
                  className="player-picture player-picture-fade"
                  src={`/playerPics/${player2.cm_name.replaceAll(
                    " ",
                    "-"
                  )}.png`}
                  alt={player2.cm_name}
                ></img>
              </div>
            )}
            {updated === 2 && (
              <div className="float-child-right button-div-winner">
                <p className="player-name player-name-rise text-center">
                  {player2.cm_name} <br /> {Math.round(player2.cm_fame)}(+
                  {fame_delta}) ELO Rating
                </p>
                <img
                  className="player-picture player-picture-fade"
                  src={`/playerPics/${player2.cm_name.replaceAll(
                    " ",
                    "-"
                  )}.png`}
                  alt={player2.cm_name}
                ></img>
              </div>
            )}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

PlayerRater.propTypes = {
  loadRatings: PropTypes.func.isRequired,
  ratePlayers: PropTypes.func.isRequired,
  players: PropTypes.object,
};

const mapStateToProps = (state) => ({
  players: state.playerRater,
});

export default connect(mapStateToProps, { loadRatings, ratePlayers })(
  PlayerRater
);
