import React from 'react';
//import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { tweetComparison } from '../../actions/tweetComparison';
import { loadPlayers } from '../../actions/playerReview';

const ComparisonTweeter = ({ tweetComparison, loadPlayers, players }) => {
  return (
    <div>
      <button
        className='btn btn-success'
        onClick={() => tweetComparison(players)}
      >
        Tweet-worthy!
      </button>
      <button className='btn btn-danger' onClick={() => loadPlayers()}>
        Discard it
      </button>
    </div>
  );
};

ComparisonTweeter.propTypes = {
  loadPlayers: PropTypes.func.isRequired,
  players: PropTypes.object,
};

const mapStateToProps = state => ({
  players: state.playerReview,
});

export default connect(mapStateToProps, { tweetComparison, loadPlayers })(
  ComparisonTweeter
);
