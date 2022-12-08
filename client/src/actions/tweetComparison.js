import api from '../utils/api';
import { setAlert } from './alert';
import { loadPlayers } from './playerReview';
import { TWEET_COMPARISON_FAIL, TWEET_COMPARISON_SUCCESS } from './types';

// Register comparison to be tweeted
export const tweetComparison = players => async dispatch => {
  try {
    const res = await api.post('/playerComparison', players);
    dispatch({ type: TWEET_COMPARISON_SUCCESS, payload: res.data });
    dispatch(loadPlayers());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: TWEET_COMPARISON_FAIL });
  }
};
