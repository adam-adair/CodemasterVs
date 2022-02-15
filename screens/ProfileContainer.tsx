/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Profile from './Profile';
import ProfileRegister from './ProfileRegister';
import ProfileForgot from './ProfileForgot';
import { RootTabParamList } from '../types/frontend';
import Header from '../components/Header';

const Stack = createNativeStackNavigator<RootTabParamList>();

export default function ProfileContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                navigation={navigation}
                title="Profile"
                enableBack={false}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ProfileRegister"
        component={ProfileRegister}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                navigation={navigation}
                title="Create Account"
                enableBack
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ProfileForgot"
        component={ProfileForgot}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                navigation={navigation}
                title="Forgot Password"
                enableBack
              />
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
