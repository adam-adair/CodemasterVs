import { AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addOrUpdateProfile,
  signOutCredential,
  getProfile,
} from '../../firebase';
import { defaultProfile } from '../../constants';
import { removeTokenFromDB, writeTokenToDB } from '../../tokenUtils';
import { setProfileLoading } from './profileLoading';
import { TProfile } from '../../types/shared';

// action types

const SET_PROFILE = 'SET_PROFILE';

// action creators

const setProfile = (profile: TProfile): AnyAction => {
  return {
    type: SET_PROFILE,
    profile,
  };
};

// thunks with firebase and asyncstorage calls

export const createEmailProfile = (profile: TProfile) => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      const newProfile: TProfile = { ...profile };
      // create DB profile

      addOrUpdateProfile({ profile: newProfile });

      // put expo notification token in DB
      writeTokenToDB();

      // save profile to disk
      AsyncStorage.setItem('@profile', JSON.stringify(newProfile));

      dispatch(setProfile(newProfile));
    } catch (e) {
      console.log(e);
    }
  };
};

export const loadLocalProfile = () => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@profile');
      const profile: TProfile = jsonValue
        ? JSON.parse(jsonValue)
        : {
            ...defaultProfile,
          };
      dispatch(setProfile(profile));
    } catch (e) {
      console.log(e);
    }
  };
};

export const getOrCreateProfile = ({
  displayName,
  email,
}: {
  displayName: string | null;
  email: string | null;
}) => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      // attempt to get profile from DB
      let profile: TProfile;
      const retrievedProfile = (await getProfile()).data as TProfile | null;
      // if profile exists in DB, load that profile and any friends
      if (retrievedProfile) {
        profile = {
          ...retrievedProfile,
          isLoggedIn: true,
        };
      } else {
        // if profile not found in DB, eg first Google login, create in DB
        profile = {
          userName: displayName,
          email,
          isLoggedIn: true,
          darkTheme: false,
        };
        addOrUpdateProfile({ profile });
      }

      // // put expo notification token in DB
      writeTokenToDB();

      // save profile to disk
      AsyncStorage.setItem('@profile', JSON.stringify(profile));

      dispatch(setProfile(profile));
    } catch (e) {
      console.log(e);
    }
    dispatch(setProfileLoading(false));
  };
};

export const logOutProfile = () => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      // remove profile on disk
      AsyncStorage.removeItem('@profile');

      // remove expo notification token in DB
      removeTokenFromDB();

      // sign out of FB
      signOutCredential();

      dispatch(
        setProfile({
          ...defaultProfile,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
};

export const updateProfile = (profile: TProfile) => {
  return async (dispatch: (arg0: AnyAction) => void) => {
    try {
      // save profile to disk
      AsyncStorage.setItem('@profile', JSON.stringify(profile));

      // update profile on FB
      dispatch(setProfile(profile));

      addOrUpdateProfile({ profile });
    } catch (e) {
      console.log(e);
    }
  };
};

// reducer

const initialState: TProfile = {
  ...defaultProfile,
};

function reducer(state = initialState, action: AnyAction): TProfile {
  switch (action.type) {
    case SET_PROFILE:
      return action.profile;
    default:
      return state;
  }
}

export default reducer;
