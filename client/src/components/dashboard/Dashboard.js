import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import PlayerReviewer from './PlayerReviewer';

const Dashboard = ({ loadUser, auth: { user } }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <section className='container-dashboard'>
      <section className='container-centered'>
        <h1 className='large text-primary'>Player Comparer</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Welcome {user && user.name}
        </p>
        {<PlayerReviewer />}
      </section>
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  players: state.PlayerReviewer,
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
