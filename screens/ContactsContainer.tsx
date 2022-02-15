/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ContactsList from './ContactsList';
import ContactsBuildCode from './ContactsBuildCode';
import { RootTabParamList } from '../types/frontend';
import Header from '../components/Header';

const Stack = createNativeStackNavigator<RootTabParamList>();

export default function ContactsContainer() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactsList"
        component={ContactsList}
        options={{
          header: ({ navigation }) => {
            return (
              <Header
                navigation={navigation}
                title="Contacts"
                enableBack={false}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="ContactsBuildCode"
        component={ContactsBuildCode}
        options={{
          header: ({ navigation }) => {
            return <Header navigation={navigation} title="Back" enableBack />;
          },
        }}
      />
    </Stack.Navigator>
  );
}
