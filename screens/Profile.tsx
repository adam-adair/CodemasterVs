/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { Platform, View } from 'react-native';
import {
  Text,
  Button,
  TextInput,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { signInCredential } from '../firebase';
import {
  getOrCreateProfile,
  logOutProfile,
  updateProfile,
} from '../store/reducers/profile';
import { ProfileProps, RootState } from '../types/frontend';
import Rule from '../components/Rule';
import styles from '../styles';
import { clearFriends, getFriends } from '../store/reducers/friends';
import { clearGames, getGames } from '../store/reducers/games';
import { setProfileLoading } from '../store/reducers/profileLoading';
import { expoClientId, iosClientId, androidClientId } from '../constants';

WebBrowser.maybeCompleteAuthSession();

export default function Profile({ navigation }: ProfileProps) {
  const profile = useSelector((state: RootState) => state.profile);
  const profileLoading = useSelector(
    (state: RootState) => state.profileLoading
  );

  const dispatch = useDispatch();
  const theme = useTheme();
  const themedStyles = styles(theme);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userName, setUserName] = React.useState(profile.userName || '');
  const [errors, setErrors] = React.useState('');
  const [hasChanged, setHasChanged] = React.useState(false);

  const googleRequest = Google.useIdTokenAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
  });
  const [, response, promptAsync] = googleRequest;

  const signOut = () => {
    dispatch(logOutProfile());
    dispatch(clearFriends());
    dispatch(clearGames());
  };

  React.useEffect(() => {
    if (profile.isLoggedIn && profile.userName) setUserName(profile.userName);
  }, [profile]);

  const signIn = (userCred: UserCredential) => {
    setErrors('');
    try {
      const { displayName, email: credEmail } = userCred.user;
      dispatch(
        getOrCreateProfile({
          displayName,
          email: credEmail,
        })
      );
      dispatch(getFriends());
      dispatch(getGames());
    } catch (e) {
      // @todo nicer errors
      console.log(e);
      if (e instanceof Error) setErrors(e.message);
    }
    setEmail('');
    setPassword('');
  };

  const signInEmail = async () => {
    try {
      if (!email.length || !email.includes('@'))
        throw new Error('Valid email required');
      if (password.length < 6) throw new Error('Password too short');
      const credential = EmailAuthProvider.credential(email, password);
      dispatch(setProfileLoading(true));
      const userCred = await signInCredential(credential);
      signIn(userCred);
    } catch (e) {
      // @todo nicer errors
      console.log(e);
      if (e instanceof Error) setErrors(e.message);
      dispatch(setProfileLoading(false));
    }
  };

  const signInGoogle = async () => {
    try {
      if (response?.type === 'error') throw new Error('Something went wrong');
      if (response?.type === 'success') {
        dispatch(setProfileLoading(true));
        const { id_token: token } = response.params;
        const credential = GoogleAuthProvider.credential(token);
        const userCred = await signInCredential(credential);
        signIn(userCred);
      }
    } catch (e) {
      // @todo nicer errors
      console.log(e);
      if (e instanceof Error) setErrors(e.message);
      dispatch(setProfileLoading(false));
    }
  };

  React.useEffect(() => {
    signInGoogle();
  }, [response]);

  const saveChanges = async () => {
    setErrors('');
    try {
      if (userName.length < 1 || userName.length > 70)
        throw new Error('Invalid name, too short or long');
      // @todo add other profile options
      dispatch(updateProfile({ ...profile, userName }));
    } catch (e) {
      // @todo nicer errors
      console.log(e);
      if (e instanceof Error) setErrors(e.message);
    }
    setHasChanged(false);
  };

  return (
    <View style={themedStyles.container}>
      {profileLoading ? (
        <View
          style={{
            position: 'absolute',
            top: '2.5%',
            left: '2.5%',
            elevation: 5,
            width: '95%',
            height: '95%',
            opacity: 0.5,
            borderRadius: theme.roundness,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : null}
      {profile.isLoggedIn ? (
        <View style={themedStyles.login}>
          <Rule text="Name" />
          <TextInput
            placeholder="Name"
            placeholderTextColor="#B1B1B1"
            keyboardType="default"
            textContentType="name"
            value={userName}
            onChangeText={(t) => {
              setUserName(t);
              setHasChanged(true);
            }}
            style={themedStyles.margin}
          />
          <Button
            disabled={profileLoading || !hasChanged}
            onPress={saveChanges}
            icon="check"
            mode="contained"
            style={themedStyles.margin}
          >
            Save Changes
          </Button>
          <Button
            disabled={profileLoading}
            onPress={() => {
              dispatch(
                updateProfile({
                  ...profile,
                  darkTheme: !profile.darkTheme,
                })
              );
            }}
            icon="white-balance-sunny"
            mode="contained"
            style={themedStyles.margin}
          >
            {profile.darkTheme ? 'Light Mode' : 'Dark Mode'}
          </Button>
          <Button
            disabled={profileLoading}
            onPress={signOut}
            icon="logout"
            mode="contained"
            style={themedStyles.margin}
          >
            Log Out
          </Button>
        </View>
      ) : (
        <View style={themedStyles.login}>
          {Platform.OS === 'ios' || Platform.OS === 'macos' ? null : (
            <>
              <Button
                icon="google"
                disabled={profileLoading}
                onPress={() => {
                  promptAsync();
                }}
                mode="contained"
                style={themedStyles.margin}
              >
                Sign in with Google
              </Button>
              <Rule text="or" marginHorizontal={5} />
            </>
          )}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#B1B1B1"
            returnKeyType="next"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={(t) => setEmail(t)}
            style={themedStyles.margin}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#B1B1B1"
            returnKeyType="done"
            textContentType="newPassword"
            secureTextEntry
            value={password}
            onChangeText={(t) => setPassword(t)}
            style={themedStyles.margin}
          />
          <Button
            icon="email"
            disabled={profileLoading}
            onPress={signInEmail}
            mode="contained"
            style={themedStyles.margin}
          >
            Sign in with Email
          </Button>
          <Text
            style={themedStyles.forgotLink}
            onPress={() => navigation.navigate('ProfileForgot')}
          >
            Forgot Password
          </Text>
          <View>
            <Text style={themedStyles.error}>{errors}</Text>
          </View>
          <Rule text="or" marginHorizontal={5} />
          <Button
            icon="email"
            disabled={profileLoading}
            onPress={() => navigation.navigate('ProfileRegister')}
            mode="outlined"
            style={themedStyles.margin}
          >
            Register
          </Button>
        </View>
      )}
    </View>
  );
}
