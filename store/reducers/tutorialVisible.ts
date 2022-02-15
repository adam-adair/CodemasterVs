import { AnyAction } from 'redux';

// action types

const SET_VISIBILITIY = 'SET_VISIBILITIY';

// action creators

export const setTutorialVisible = (tutorialVisibile: boolean): AnyAction => {
  return {
    type: SET_VISIBILITIY,
    tutorialVisibile,
  };
};

// reducer

const initialState = false;

function reducer(state = initialState, action: AnyAction): boolean {
  switch (action.type) {
    case SET_VISIBILITIY:
      return action.tutorialVisibile;
    default:
      return state;
  }
}

export default reducer;
