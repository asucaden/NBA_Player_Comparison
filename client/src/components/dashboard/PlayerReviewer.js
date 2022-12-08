import React, { useEffect } from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadPlayers } from '../../actions/playerReview';
import ComparisionTweeter from './ComparisionTweeter';

const PlayerReviewer = ({
  loadPlayers,
  players: { sleeperPlayer, famousPlayer },
}) => {
  useEffect(() => {
    loadPlayers();
  }, [loadPlayers]);

  return (
    <>
      <button className='btn btn-primary' onClick={() => loadPlayers()}>
        Generate new player comparison
      </button>
      {sleeperPlayer && (
        <>
          <div className='float-container'>
            <div classname='float-child'>
              Player 1 stats:
              <br />
              {sleeperPlayer.Player}
              <br />
              PPG: {sleeperPlayer.PTS}
              <br />
              RPG: {sleeperPlayer.TRB}
              <br />
              APG: {sleeperPlayer.AST}
            </div>
            <div classname='float-child'>
              Player 2 stats:
              <br />
              {famousPlayer.Player}
              <br />
              PPG: {famousPlayer.PTS}
              <br />
              RPG: {famousPlayer.TRB}
              <br />
              APG:
              {famousPlayer.AST}
            </div>
          </div>
          <ComparisionTweeter />
        </>
      )}
    </>
  );
};

PlayerReviewer.propTypes = {
  loadPlayers: PropTypes.func.isRequired,
  players: PropTypes.object,
};

const mapStateToProps = state => ({
  players: state.playerReview,
});

export default connect(mapStateToProps, { loadPlayers })(PlayerReviewer);
