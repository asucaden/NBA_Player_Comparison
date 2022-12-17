import React, { useEffect } from 'react';
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
              <br />
              {sleeperPlayer.cm_name}
              <br />
              PPG: {sleeperPlayer.pts}
              <br />
              RPG: {sleeperPlayer.reb}
              <br />
              APG: {sleeperPlayer.ast}
              <br />
              True Shooting: {Math.round(sleeperPlayer.cm_ts_pct * 1000) / 10}%
            </div>
            <div classname='float-child'>
              <br />
              {famousPlayer.cm_name}
              <br />
              PPG: {famousPlayer.pts}
              <br />
              RPG: {famousPlayer.reb}
              <br />
              APG: {famousPlayer.ast}
              <br />
              True Shooting: {Math.round(famousPlayer.cm_ts_pct * 1000) / 10}%
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
