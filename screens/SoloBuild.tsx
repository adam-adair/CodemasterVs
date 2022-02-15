import React from 'react';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { SoloBuildProps } from '../types/frontend';
import GameBuilder from '../components/GameBuilder';
import { setTutorialVisible } from '../store/reducers/tutorialVisible';
import { TGame } from '../types/shared';

export default function SoloBuild({ navigation }: SoloBuildProps) {
  const dispatch = useDispatch();
  const setGame = (game: TGame) => {
    navigation.navigate('SoloGame', { game });
  };
  return (
    <View
      style={{
        flexGrow: 1,
        marginTop: 24,
        justifyContent: 'space-evenly',
      }}
    >
      <GameBuilder setGame={setGame} solo />
      <Button
        onPress={() => dispatch(setTutorialVisible(true))}
        style={{ marginBottom: 24 }}
      >
        View Tutorial
      </Button>
    </View>
  );
}
