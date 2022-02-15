/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ReceivedList from './ReceivedList';
import ReceivedGame from './ReceivedGame';
import { RootTabParamList } from '../types/frontend';
import Header from '../components/Header';

const Stack = createNativeStackNavigator<RootTabParamList>();

export default function ReceivedContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ReceivedList"
        component={ReceivedList}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                navigation={navigation}
                title="Received Codes"
                enableBack={false}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ReceivedGame"
        component={ReceivedGame}
        options={{
          header: ({ navigation }) => {
            return <Header navigation={navigation} title="Back" enableBack />;
          },
        }}
      />
    </Stack.Navigator>
  );
}
