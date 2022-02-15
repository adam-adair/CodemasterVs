import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import profile from './reducers/profile';
import friends from './reducers/friends';
import games from './reducers/games';
import tutorialVisible from './reducers/tutorialVisible';
import profileLoading from './reducers/profileLoading';
import adCounter from './reducers/adCounter';

const reducer = combineReducers({
  profile,
  friends,
  games,
  tutorialVisible,
  profileLoading,
  adCounter,
});

export default createStore(reducer, applyMiddleware(thunk));
