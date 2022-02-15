import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { TProfile } from '../../types/shared';

admin.initializeApp();

const db = admin.firestore();

export const addToken = functions.https.onCall((data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'user not authenticated'
      );
    }
    db.collection('expoTokens')
      .doc(context.auth.uid)
      .set({ ...data });
  } catch (e) {
    console.log(e);
  }
});

export const removeToken = functions.https.onCall((data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'user not authenticated'
      );
    }
    db.collection('expoTokens').doc(context.auth.uid).delete();
  } catch (e) {
    console.log(e);
  }
});

export const addOrUpdateProfile = functions.https.onCall((data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'user not authenticated'
      );
    }

    const { profile }: { profile: TProfile } = data;
    db.collection('profiles')
      .doc(context.auth.uid)
      .set({ ...data.profile, email: profile.email?.toLowerCase() });
  } catch (e) {
    console.log(e);
  }
});

export const getProfile = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'user not authenticated'
      );
    }
    const profile = await db.collection('profiles').doc(context.auth.uid).get();
    if (profile.exists) {
      return profile.data();
    }
  } catch (e) {
    console.log(e);
  }
  return null;
});

export const getFriendsFromDB = functions.https.onCall(
  async (data, context) => {
    try {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'user not authenticated'
        );
      }
      const foundFriends = await db
        .collection('profiles')
        .doc(context.auth.uid)
        .collection('friends')
        .get();
      if (!foundFriends.empty) {
        const friendData = foundFriends.docs.map((doc) => doc.data());
        return friendData;
      } else return [];
    } catch (e) {
      console.log(e);
    }
    return null;
  }
);

export const findFriendByEmail = functions.https.onCall(
  async (data, context) => {
    try {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'user not authenticated'
        );
      }
      const { searchedEmail }: { searchedEmail: string } = data;
      const foundFriends = await db
        .collection('profiles')
        .where('email', '==', searchedEmail.toLowerCase())
        .get();
      if (!foundFriends.empty) {
        const friendData = foundFriends.docs[0].data();
        const foundFriend = {
          uid: foundFriends.docs[0].id,
          userName: friendData.userName,
          email: friendData.email,
        };
        return foundFriend;
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  }
);

export const addFriendToDB = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'user not authenticated'
      );
    }
    await db
      .collection('profiles')
      .doc(context.auth.uid)
      .collection('friends')
      .doc(data.friend.uid)
      .set({ ...data.friend });
  } catch (e) {
    console.log(e);
  }
});

export const removeFriendFromDB = functions.https.onCall(
  async (data, context) => {
    try {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'user not authenticated'
        );
      }
      // remove friend from your list
      db.collection('profiles')
        .doc(context.auth.uid)
        .collection('friends')
        .doc(data.uid)
        .delete();
    } catch (e) {
      console.log(e);
    }
  }
);

export const addGameToDB = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'user not authenticated'
      );
    }
    // add game to database
    const { friend, game } = data;
    game.sentDate = new Date().toISOString();
    db.collection('games').doc(friend.uid).collection('codes').doc().set(game);

    // @todo notify the recipient
    const recipient = await db.collection('expoTokens').doc(friend.uid).get();
    if (recipient.exists) {
      const recipientData = recipient.data();
      if (recipientData && recipientData.expoToken) {
        const url = 'https://exp.host/--/api/v2/push/send';
        const data = {
          to: recipientData.expoToken,
          sound: 'default',
          title: 'You received a new code',
          body: `Check your received codes!`,
        };
        const headers = {
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };

        axios
          .post(url, data, { headers })
          .then((res) => {
            console.log(`statusCode: ${res.status}`);
            console.log(res.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  } catch (e) {
    console.log(e);
  }
});

export const removeGameFromDB = functions.https.onCall(
  async (data, context) => {
    try {
      if (!context.auth) {
        throw new functions.https.HttpsError(
          'permission-denied',
          'user not authenticated'
        );
      }
      // remove game to database
      const { game } = data;
      db.collection('games')
        .doc(context.auth.uid)
        .collection('codes')
        .doc(game.uid)
        .delete();
    } catch (e) {
      console.log(e);
    }
  }
);

export const getGamesFromDB = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'user not authenticated'
      );
    }
    const gamesSnap = await db
      .collection('games')
      .doc(context.auth.uid)
      .collection('codes')
      .get();
    if (!gamesSnap.empty) {
      const games = gamesSnap.docs.map((doc) => {
        const game = doc.data();
        game.uid = doc.id;
        return game;
      });
      return games;
    } else return [];
  } catch (e) {
    console.log(e);
  }
  return null;
});

export const updateGameInDB = functions.https.onCall(async (data, context) => {
  try {
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'permission-denied',
        'user not authenticated'
      );
    }
    // update game in database
    const { game } = data;
    db.collection('games')
      .doc(context.auth.uid)
      .collection('codes')
      .doc(game.uid)
      .set(game);
  } catch (e) {
    console.log(e);
  }
});
