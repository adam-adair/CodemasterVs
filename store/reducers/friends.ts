import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addFriendToDB,
  getFriendsFromDB,
  removeFriendFromDB,
} from '../../firebase';
import { RootState, TFriend } from '../../types/frontend';

// action types

const ADD_FRIEND = 'ADD_FRIEND';
const REMOVE_FRIEND = 'REMOVE_FRIEND';
const SET_FRIENDS = 'SET_FRIENDS';

// action creators

const addFriendAction = (friend: TFriend): AnyAction => {
  return {
    type: ADD_FRIEND,
    friend,
  };
};

const removeFriendAction = (friend: TFriend): AnyAction => {
  return {
    type: REMOVE_FRIEND,
    friend,
  };
};

const setFriendsAction = (friends: TFriend[]): AnyAction => {
  return {
    type: SET_FRIENDS,
    friends,
  };
};

// thunks with firebase and asyncstorage calls

export const addFriend = (friend: TFriend) => {
  return async (
    dispatch: (arg0: AnyAction) => void,
    getState: () => RootState
  ) => {
    try {
      const { friends } = getState();
      // save friends to disk
      AsyncStorage.setItem('@friends', JSON.stringify([...friends, friend]));

      // add friend on FB
      addFriendToDB({ friend });

      // send friend a notification
      // notify

      dispatch(addFriendAction(friend));
    } catch (e) {
      console.log(e);
    }
  };
};

export const removeFriend = (friend: TFriend) => {
  return async (
    dispatch: (arg0: AnyAction) => void,
    getState: () => RootState
  ) => {
    try {
      const { friends } = getState();
      // save friends to disk
      AsyncStorage.setItem(
        '@friends',
        JSON.stringify([...friends.filter((f) => f.uid !== friend.uid)])
      );

      // remove friend on FB
      removeFriendFromDB({ uid: friend.uid });

      dispatch(removeFriendAction(friend));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getFriends = () => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      // get friends from db
      const friends = (await getFriendsFromDB()).data as TFriend[];

      // save friends to disk
      AsyncStorage.setItem('@friends', JSON.stringify([...friends]));

      dispatch(setFriendsAction(friends));
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearFriends = () => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      // save friends to disk
      AsyncStorage.removeItem('@friends');

      dispatch(setFriendsAction([]));
    } catch (e) {
      console.log(e);
    }
  };
};

export const loadLocalFriends = () => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@friends');
      const friends: TFriend[] = jsonValue ? JSON.parse(jsonValue) : [];
      dispatch(setFriendsAction(friends));
    } catch (e) {
      console.log(e);
    }
  };
};

// reducer

const initialState: TFriend[] = [];

function reducer(state = initialState, action: AnyAction): TFriend[] {
  switch (action.type) {
    case ADD_FRIEND:
      return [...state, action.friend];
    case REMOVE_FRIEND:
      return [...state.filter((friend) => friend.uid !== action.friend.uid)];
    case SET_FRIENDS:
      return [...action.friends];
    default:
      return state;
  }
}

export default reducer;
