/* eslint-disable import/prefer-default-export */
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { addToken, removeToken } from './firebase';

export const requestToken = async () => {
  let token = null;
  try {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus === 'granted') {
        token = (
          await Notifications.getExpoPushTokenAsync({
            experienceId: '@aar2222/CodemasterVs',
          })
        ).data;
      }
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  } catch (e) {
    console.log(e);
  }

  return token;
};

export const writeTokenToDB = async () => {
  try {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus === 'granted') {
        Notifications.getExpoPushTokenAsync({
          experienceId: '@aar2222/CodemasterVs',
        }).then((res) => {
          if (res.data) addToken({ expoToken: res.data });
        });
      }
    }
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const removeTokenFromDB = async () => {
  removeToken();
};
