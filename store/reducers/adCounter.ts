import { AnyAction } from 'redux';
import { adFrequency } from '../../constants';

// action types

const INCREMENT_AD_COUNTER = 'INCREMENT_AD_COUNTER';

// action creators

export const incrementAdCounter = (): AnyAction => {
  return {
    type: INCREMENT_AD_COUNTER,
  };
};

// reducer

const initialState = 0;

function reducer(state = initialState, action: AnyAction): number {
  switch (action.type) {
    case INCREMENT_AD_COUNTER:
      return (state + 1) % adFrequency;
    default:
      return state;
  }
}

export default reducer;
