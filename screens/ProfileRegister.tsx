import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Rule from '../components/Rule';
import { signUpCredential } from '../firebase';
import { createEmailProfile } from '../store/reducers/profile';
import { ProfileRegisterProps, RootState } from '../types/frontend';
import styles from '../styles';

export default function ProfileRegister({ navigation }: ProfileRegisterProps) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [requesting, setRequesting] = React.useState(false);

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const theme = useTheme();
  const themedStyles = styles(theme);

  const attemptRegister = async () => {
    setRequesting(true);
    setErrors('');
    try {
      if (!userName.length) throw new Error('Display name required');
      if (!email.length || !email.includes('@'))
        throw new Error('Valid email required');
      if (password.length < 6) throw new Error('Password too short');
      const userCred = await signUpCredential(email, password);
      if (userCred) {
        dispatch(
          createEmailProfile({
            ...profile,
            userName,
            email,
            isLoggedIn: true,
          })
        );
      }
    } catch (e) {
      // @todo nicer errors
      console.log(e);
      if (e instanceof Error) setErrors(e.message);
    }
    setRequesting(false);
  };

  useEffect(() => {
    if (profile.isLoggedIn) {
      navigation.goBack();
    }
  }, [navigation, profile]);

  return (
    <View style={themedStyles.container}>
      <View style={themedStyles.login}>
        <Rule text="Display Name" marginHorizontal={5} />
        <TextInput
          placeholder="Name"
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          keyboardType="default"
          textContentType="givenName"
          value={userName}
          onChangeText={(t) => setUserName(t)}
          style={themedStyles.margin}
        />
        <Rule text="Account" marginHorizontal={5} />
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
          disabled={requesting}
          onPress={attemptRegister}
          mode="contained"
          style={themedStyles.margin}
        >
          Create Account
        </Button>
        <View>
          <Text style={themedStyles.error}>{errors}</Text>
        </View>
      </View>
    </View>
  );
}
