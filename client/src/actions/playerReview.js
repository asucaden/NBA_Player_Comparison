import api from '../utils/api';
import { PLAYER_LOAD_SUCCESS, PLAYER_LOAD_FAILURE } from './types';

// Load Players
export const loadPlayers = () => async dispatch => {
  try {
    const res = await api.get('/playerComparison');

    dispatch({
      type: PLAYER_LOAD_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PLAYER_LOAD_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
