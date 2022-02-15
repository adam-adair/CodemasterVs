/* eslint-disable no-nested-ternary */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { ActivityIndicator, Button, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, ReceivedListProps } from '../types/frontend';
import styles from '../styles';
import { getGames } from '../store/reducers/games';
import GameCard from '../components/GameCard';

export default function ReceivedList({ navigation }: ReceivedListProps) {
  const theme = useTheme();
  const themedStyles = styles(theme);

  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const games = useSelector((state: RootState) => state.games);

  const [requesting, setRequesting] = React.useState(false);

  React.useEffect(() => {
    if (profile.isLoggedIn) {
      dispatch(getGames());
    }
  }, [dispatch, profile.isLoggedIn]);

  if (!profile.isLoggedIn) {
    return (
      <View style={themedStyles.container}>
        <Text style={[themedStyles.margin, themedStyles.centerText]}>
          You must be logged in to receive codes from contacts.
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
      <View
        style={[
          themedStyles.margin,
          themedStyles.centerText,
          { width: '100%' },
        ]}
      >
        {requesting ? (
          <ActivityIndicator size="large" />
        ) : games.length ? (
          <ScrollView persistentScrollbar>
            {games.map((game) => (
              <GameCard game={game} key={game.uid} />
            ))}
          </ScrollView>
        ) : (
          <View style={{ height: '50%', justifyContent: 'space-around' }}>
            <Text>Sorry, you don&apos;t have any received codes!</Text>
            <Text>Try sending a code to one of your contacts</Text>
            <Button
              mode="contained"
              onPress={() => {
                navigation.navigate('ContactsContainer');
              }}
            >
              Go To Contacts
            </Button>
          </View>
        )}
      </View>
      <Button
        icon="refresh"
        mode="contained"
        onPress={async () => {
          // reload
          setRequesting(true);
          await dispatch(getGames());
          setRequesting(false);
        }}
        style={{ marginBottom: 10 }}
      >
        Check For Codes
      </Button>
    </View>
  );
}
