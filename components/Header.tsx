/* eslint-disable react/no-unstable-nested-components */
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Header, HeaderBackButton } from '@react-navigation/elements';

export default function BackHeader({
  navigation,
  title,
  enableBack,
}: {
  navigation: NativeStackNavigationProp<ParamListBase, string>;
  title: string;
  enableBack: boolean;
}) {
  return (
    <Header
      title={title}
      headerLeft={() =>
        enableBack ? <HeaderBackButton onPress={navigation.goBack} /> : null
      }
    />
  );
}
