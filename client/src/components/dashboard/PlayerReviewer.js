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
      {sleeperPlayer.cm_name && (
        <>
          <button className='btn btn-primary' onClick={() => loadPlayers()}>
            Generate new player comparison
          </button>
          <div className='float-container'>
            <div classname='float-child'>
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
            <div classname='float-child'>
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
