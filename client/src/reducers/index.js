import { combineReducers } from 'redux';
import playerReview from './playerReview';
import { tweetComparison } from '../actions/tweetComparison';

export default combineReducers({ playerReview, tweetComparison });
