import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadLeaderboard } from "../../actions/leaderboard";
import Spinner from "../layout/Spinner";

const Leaderboard = ({ loadLeaderboard, players }) => {
  useEffect(() => {
    loadLeaderboard();
  }, [loadLeaderboard]);

  let count = 0;

  return (
    <>
      <section className="container-dashboard">
        <section className="container-centered">
          <h1 className="large text-light text-center">ELO Leaderboard</h1>

          {players[0] ? (
            <div className="leaderboard-div">
              <table className="leaderboard-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>ELO</th>
                    <th>PPG</th>
                    <th>RPG</th>
                    <th>APG</th>
                    <th>TS%</th>
                  </tr>
                </thead>
                <tbody>
                  {players
                    .sort((a, b) => b.cm_fame - a.cm_fame)
                    .map((player) => {
                      return (
                        <tr key={player.cm_name}>
                          <td>{++count}</td>
                          <td>{player.cm_name} </td>
                          <td>{Math.round(player.cm_fame)} </td>
                          <td>
                            {(Math.round(player.pts * 10) / 10).toFixed(1)}{" "}
                          </td>
                          <td>
                            {(Math.round(player.reb * 10) / 10).toFixed(1)}{" "}
                          </td>
                          <td>
                            {(Math.round(player.ast * 10) / 10).toFixed(1)}{" "}
                          </td>
                          <td>
                            {(Math.round(player.ts * 1000) / 10).toFixed(1)}%{" "}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : (
            <Spinner />
          )}
        </section>
      </section>
    </>
  );
};
Leaderboard.propTypes = {
  loadLeaderboard: PropTypes.func.isRequired,
  players: PropTypes.array,
};

const mapStateToProps = (state) => ({
  players: state.leaderboard.players,
});

export default connect(mapStateToProps, { loadLeaderboard })(Leaderboard);
