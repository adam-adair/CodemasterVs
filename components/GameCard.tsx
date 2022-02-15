/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-unstable-nested-components */
import moment from 'moment';
import React from 'react';
import { View } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AdMobInterstitial } from 'expo-ads-admob';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import { NavigationProp, RootState } from '../types/frontend';
import { removeGame } from '../store/reducers/games';
import { adFrequency, adUnitInterstitialID } from '../constants';
import { incrementAdCounter } from '../store/reducers/adCounter';
import { TGame } from '../types/shared';

const size = 24;
AdMobInterstitial.setAdUnitID(adUnitInterstitialID);

export default function GameCard({ game }: { game: TGame }) {
  const adCounter = useSelector((state: RootState) => state.adCounter);
  const profile = useSelector((state: RootState) => state.profile);
  const navigation = useNavigation<NavigationProp>();
  const theme = useTheme();
  const themedStyles = styles(theme);
  const dispatch = useDispatch();

  const showAd = async () => {
    if (profile.noInterstitials) {
      console.log('no interstitials');
      return;
    }
    if (adCounter === adFrequency - 1) {
      try {
        AdMobInterstitial.addEventListener('interstitialDidClose', () => {
          AdMobInterstitial.removeAllListeners();
        });
        AdMobInterstitial.addEventListener('interstitialDidFailToLoad', () => {
          AdMobInterstitial.removeAllListeners();
        });
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
        await AdMobInterstitial.showAdAsync();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onPress = async () => {
    await showAd();
    dispatch(incrementAdCounter());
    navigation.navigate('ReceivedGame', { game });
  };

  const winBorder = { borderColor: theme.colors.accent, borderWidth: 2 };
  const loseBorder = { borderColor: theme.colors.error, borderWidth: 2 };
  const isLost = game.guessesAllowed === game.guessHistory.length;
  const borderStyle = game.isSolved ? winBorder : isLost ? loseBorder : null;

  return (
    <Card style={[themedStyles.margin, borderStyle]} onPress={onPress}>
      <Card.Content
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}
      >
        <View>
          <Text style={{ color: theme.colors.text }}>
            {game.sender?.userName}
          </Text>
          <Text style={{ color: theme.colors.disabled }}>
            {game.sender?.email}
          </Text>
          <Text style={{ color: theme.colors.disabled }}>
            {game.sentDate ? moment(game.sentDate).calendar() : ''}
          </Text>
        </View>
        <Ionicons
          name="md-close-circle"
          size={size}
          style={{
            marginHorizontal: 7,
          }}
          onPress={() => dispatch(removeGame(game))}
          color={theme.colors.error}
        />
      </Card.Content>
    </Card>
  );
}
