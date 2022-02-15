import React from 'react';
import { View } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import Rule from '../components/Rule';
import { sendResetEmail } from '../firebase';
import styles from '../styles';

export default function ProfileForgot() {
  const [email, setEmail] = React.useState('');
  const [errors, setErrors] = React.useState('');
  const [requesting, setRequesting] = React.useState(false);
  const [alreadyRequested, setAlreadyRequested] = React.useState(false);

  const resetPassword = async () => {
    setRequesting(true);
    setErrors('');
    try {
      await sendResetEmail(email);
      setAlreadyRequested(true);
    } catch (e) {
      // @todo nicer errors
      if (e instanceof Error) setErrors(e.message);
    }
    setRequesting(false);
  };
  const theme = useTheme();
  const themedStyles = styles(theme);

  return (
    <View style={themedStyles.container}>
      <View style={themedStyles.login}>
        <Rule text="Enter Email" marginHorizontal={5} />
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
        {alreadyRequested ? (
          <Text>Password reset email sent.</Text>
        ) : (
          <Button
            icon="email"
            disabled={requesting}
            onPress={resetPassword}
            mode="contained"
            style={themedStyles.margin}
          >
            Request Password Reset
          </Button>
        )}
        <View>
          <Text style={themedStyles.error}>{errors}</Text>
        </View>
      </View>
    </View>
  );
}
