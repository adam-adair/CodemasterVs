/* eslint-disable no-plusplus */
import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../../types/frontend';
import {
  getGamesFromDB,
  removeGameFromDB,
  updateGameInDB,
} from '../../firebase';
import { TGame } from '../../types/shared';

// action types

const REMOVE_GAME = 'REMOVE_GAME';
const SET_GAMES = 'SET_GAMES';

// action creators

const removeGameAction = (game: TGame): AnyAction => {
  return {
    type: REMOVE_GAME,
    game,
  };
};

const setGamesAction = (games: TGame[]): AnyAction => {
  return {
    type: SET_GAMES,
    games,
  };
};

// thunks with firebase and asyncstorage calls

export const getGames = () => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      // get games from db
      const games = (await getGamesFromDB()).data as TGame[];
      // save games to disk
      AsyncStorage.setItem('@games', JSON.stringify([...games]));

      dispatch(setGamesAction(games));
    } catch (e) {
      console.log(e);
    }
  };
};

export const removeGame = (game: TGame) => {
  return async (
    dispatch: (arg0: AnyAction) => void,
    getState: () => RootState
  ) => {
    try {
      const { games } = getState();
      // save games to disk
      AsyncStorage.setItem(
        '@games',
        JSON.stringify([...games.filter((f) => f.uid !== game.uid)])
      );

      // remove game on FB
      removeGameFromDB({ game });

      dispatch(removeGameAction(game));
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateGame = (game: TGame) => {
  return async (
    dispatch: (arg0: AnyAction) => void,
    getState: () => RootState
  ) => {
    try {
      const { games } = getState();
      const updatedGames: TGame[] = [];

      for (let i = 0; i < games.length; i++) {
        const curGame = games[i];
        if (curGame.uid === game.uid) updatedGames.push({ ...game });
        else updatedGames.push({ ...curGame });
      }
      // save games to disk
      AsyncStorage.setItem('@games', JSON.stringify(updatedGames));

      // remove game on FB
      updateGameInDB({ game });

      dispatch(setGamesAction(updatedGames));
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearGames = () => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      // save games to disk
      AsyncStorage.removeItem('@games');

      dispatch(setGamesAction([]));
    } catch (e) {
      console.log(e);
    }
  };
};

export const loadLocalGames = () => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@games');
      const games: TGame[] = jsonValue ? JSON.parse(jsonValue) : [];
      dispatch(setGamesAction(games));
    } catch (e) {
      console.log(e);
    }
  };
};

// reducer

const initialState: TGame[] = [];

function reducer(state = initialState, action: AnyAction): TGame[] {
  switch (action.type) {
    case REMOVE_GAME:
      return [...state.filter((game) => game.uid !== action.game.uid)];
    case SET_GAMES:
      return [...action.games];
    default:
      return state;
  }
}

export default reducer;
