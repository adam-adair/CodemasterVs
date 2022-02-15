import { AnyAction } from 'redux';

// action types

const SET_PROFILE_LOADING = 'SET_PROFILE_LOADING';

// action creators

export const setProfileLoading = (profileLoading: boolean): AnyAction => {
  return {
    type: SET_PROFILE_LOADING,
    profileLoading,
  };
};

// reducer

const initialState = false;

function reducer(state = initialState, action: AnyAction): boolean {
  switch (action.type) {
    case SET_PROFILE_LOADING:
      return action.profileLoading;
    default:
      return state;
  }
}

export default reducer;
