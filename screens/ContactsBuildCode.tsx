import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { Keyboard } from 'react-native';
import { AdMobInterstitial } from 'expo-ads-admob';
import { useDispatch, useSelector } from 'react-redux';
import {
  ContactsBuildCodeProps,
  NavigationProp,
  RootState,
} from '../types/frontend';
import GameBuilder from '../components/GameBuilder';
import { addGameToDB } from '../firebase';
import { adFrequency, adUnitInterstitialID } from '../constants';
import { incrementAdCounter } from '../store/reducers/adCounter';
import { TGame } from '../types/shared';

AdMobInterstitial.setAdUnitID(adUnitInterstitialID);

export default function ContactsBuildCode({ route }: ContactsBuildCodeProps) {
  const adCounter = useSelector((state: RootState) => state.adCounter);
  const profile = useSelector((state: RootState) => state.profile);
  const navigation = useNavigation<NavigationProp>();
  const { friend } = route.params;
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

  const setGame = async (game: TGame) => {
    Keyboard.dismiss();
    try {
      await showAd();

      dispatch(incrementAdCounter());

      await addGameToDB({ friend, game });
      // send the game to the DB, do whatever locally
      Toast.show(`Your code has been sent to ${friend.userName}!`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
    } catch (e) {
      console.log(e);
      // alert of error
      Toast.show(`Sorry, something went wrong`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
    }

    // go back to the VS screen
    navigation.goBack();
  };

  return <GameBuilder setGame={setGame} solo={false} />;
}
