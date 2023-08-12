import api from "../utils/api";
import { RATING_GET_FAILURE, RATING_GET_SUCCESS } from "./types";

// Load Players
export const loadRatings = () => async (dispatch) => {
  try {
    const res = await api.get("/playerRating");

    dispatch({
      type: RATING_GET_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RATING_GET_FAILURE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
