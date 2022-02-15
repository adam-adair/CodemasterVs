/* eslint-disable react/no-unstable-nested-components */
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SoloBuild from './SoloBuild';
import SoloGame from './SoloGame';
import { RootTabParamList } from '../types/frontend';
import Header from '../components/Header';

const Stack = createNativeStackNavigator<RootTabParamList>();

export default function SoloContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SoloBuild"
        component={SoloBuild}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                navigation={navigation}
                title="Play Solo"
                enableBack={false}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="SoloGame"
        component={SoloGame}
        options={{
          header: ({ navigation }) => {
            return <Header navigation={navigation} title="Back" enableBack />;
          },
        }}
      />
    </Stack.Navigator>
  );
}
