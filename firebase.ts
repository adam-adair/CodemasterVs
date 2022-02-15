import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithCredential,
  signOut,
  AuthCredential,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from 'firebase/functions';
import Constants from 'expo-constants';
import firebaseConfig from './firebaseConfig';

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
if (
  Constants.manifest &&
  Constants.manifest.extra &&
  Constants.manifest.extra.FUNC &&
  Constants.manifest.debuggerHost
) {
  const host = `${Constants.manifest.debuggerHost.split(':')[0]}`;
  const port = 5001;
  console.log(
    '\x1b[34m%s\x1b[0m',
    `using functions emulator on ${host}:${port}`
  );
  connectFunctionsEmulator(functions, host, port);
}

const auth = getAuth();

const addToken = httpsCallable(functions, 'addToken');
const removeToken = httpsCallable(functions, 'removeToken');
const addOrUpdateProfile = httpsCallable(functions, 'addOrUpdateProfile');
const getProfile = httpsCallable(functions, 'getProfile');
const findFriendByEmail = httpsCallable(functions, 'findFriendByEmail');
const removeFriendFromDB = httpsCallable(functions, 'removeFriendFromDB');
const addFriendToDB = httpsCallable(functions, 'addFriendToDB');
const getFriendsFromDB = httpsCallable(functions, 'getFriendsFromDB');
const addGameToDB = httpsCallable(functions, 'addGameToDB');
const removeGameFromDB = httpsCallable(functions, 'removeGameFromDB');
const getGamesFromDB = httpsCallable(functions, 'getGamesFromDB');
const updateGameInDB = httpsCallable(functions, 'updateGameInDB');

const signInCredential = async (credential: AuthCredential) => {
  const userCred = await signInWithCredential(auth, credential);
  return userCred;
};

const signOutCredential = () => {
  signOut(auth);
};

const signUpCredential = async (email: string, password: string) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return userCred;
};

const sendResetEmail = (email: string) => {
  return sendPasswordResetEmail(auth, email)
    .then((success) => {
      return success;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export {
  signInCredential,
  signOutCredential,
  signUpCredential,
  sendResetEmail,
  addToken,
  removeToken,
  addOrUpdateProfile,
  getProfile,
  findFriendByEmail,
  removeFriendFromDB,
  addFriendToDB,
  getFriendsFromDB,
  addGameToDB,
  removeGameFromDB,
  getGamesFromDB,
  updateGameInDB,
};
