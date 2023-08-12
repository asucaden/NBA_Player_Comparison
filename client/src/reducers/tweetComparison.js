import {
  TWEET_COMPARISON_FAIL,
  TWEET_COMPARISON_SUCCESS,
} from "../actions/types";

export default function tweetComparison(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TWEET_COMPARISON_SUCCESS:
      return state;

    case TWEET_COMPARISON_FAIL:
      return { ...state, error: payload };
    default:
      return state;
  }
}
