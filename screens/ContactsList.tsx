import React from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { Button, Card, Text, TextInput, useTheme } from 'react-native-paper';
import * as MailComposer from 'expo-mail-composer';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Rule from '../components/Rule';
import { NavigationProp, RootState, TFriend } from '../types/frontend';
import { defaultInvitation } from '../constants';
import { addFriend } from '../store/reducers/friends';
import FriendCard from '../components/FriendCard';
import { findFriendByEmail } from '../firebase';

export default function ContactsList() {
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const themedStyles = styles(theme);

  const dispatch = useDispatch();
  const friends = useSelector((state: RootState) => state.friends);
  const profile = useSelector((state: RootState) => state.profile);

  const [requesting, setRequesting] = React.useState(false);
  const [searchedEmail, setSearchedEmail] = React.useState('');
  const [foundFriend, setFoundFriend] = React.useState<TFriend | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [notFound, setNotFound] = React.useState<string | null>(null);

  const searchProfiles = async () => {
    Keyboard.dismiss();
    setRequesting(true);
    setError(null);
    setFoundFriend(null);
    setNotFound(null);
    try {
      if (!searchedEmail.length || !searchedEmail.includes('@'))
        throw new Error('Invalid email');
      if (searchedEmail === profile.email)
        throw new Error("Can't befriend yourself!");
      const found = (await findFriendByEmail({ searchedEmail }))
        .data as TFriend | null;
      if (found) {
        setFoundFriend(found);
      } else setNotFound('No matching user found.');
    } catch (e) {
      console.log(e);
      if (e instanceof Error) setError(e.message);
    }
    setRequesting(false);
  };

  const composeMail = async () => {
    MailComposer.composeAsync({
      ...defaultInvitation,
      recipients: [searchedEmail],
    });
    setError(null);
  };

  const addFoundFriend = () => {
    if (foundFriend) {
      if (friends.map((f) => f.uid).includes(foundFriend.uid)) {
        Toast.show('Already a friend!', {
          position: Toast.positions.CENTER,
          duration: Toast.durations.SHORT,
        });
      } else {
        dispatch(addFriend(foundFriend));
        setFoundFriend(null);
      }
    }
  };

  if (!profile.isLoggedIn) {
    return (
      <View style={themedStyles.container}>
        <Text style={[themedStyles.margin, themedStyles.centerText]}>
          You must be logged in to send codes to contacts.
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('ProfileContainer');
          }}
        >
          Go To Profile
        </Button>
      </View>
    );
  }

  return (
    <View style={themedStyles.gameContainer}>
      <View style={[themedStyles.login, themedStyles.margin]}>
        <Rule text="Add Contact By Email" marginHorizontal={5} />
        <TextInput
          dense
          placeholder="Email"
          placeholderTextColor="#B1B1B1"
          returnKeyType="next"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={searchedEmail}
          onChangeText={(t) => setSearchedEmail(t)}
          style={themedStyles.margin}
        />
        <Button
          loading={requesting}
          icon="account-search"
          disabled={requesting}
          onPress={searchProfiles}
          mode="contained"
        >
          Search
        </Button>
        {foundFriend ? (
          <Card>
            <Card.Content>
              <Text>{foundFriend.userName}</Text>
              <Text>{foundFriend.email}</Text>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'space-evenly' }}>
              <Button onPress={addFoundFriend}>Add</Button>
              <Button onPress={() => setFoundFriend(null)}>Cancel</Button>
            </Card.Actions>
          </Card>
        ) : null}
        {error ? (
          <Card>
            <Card.Content>
              <Text>{error}</Text>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'space-evenly' }}>
              <Button onPress={() => setError(null)}>Cancel</Button>
            </Card.Actions>
          </Card>
        ) : null}
        {notFound ? (
          <Card>
            <Card.Content>
              <Text>{notFound}</Text>
              <Text>Send them an email invitation?</Text>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'space-evenly' }}>
              <Button onPress={composeMail}>Send Email</Button>
              <Button onPress={() => setNotFound(null)}>Cancel</Button>
            </Card.Actions>
          </Card>
        ) : null}
        {friends.length ? (
          <View
            style={{
              marginTop: 10,
              height: '75%',
            }}
          >
            <Rule text="Contacts" />
            <ScrollView persistentScrollbar>
              {friends.map((friend) => (
                <FriendCard friend={friend} key={friend.email} />
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
    </View>
  );
}
