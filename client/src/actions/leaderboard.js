import api from "../utils/api";
import { LEADERBOARD_LOAD_SUCCESS, LEADERBOARD_LOAD_FAILURE } from "./types";

// Load Players
export const loadLeaderboard = () => async (dispatch) => {
  try {
    const res = await api.get("/leaderboard");

    dispatch({
      type: LEADERBOARD_LOAD_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LEADERBOARD_LOAD_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
