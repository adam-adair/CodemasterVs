/* eslint-disable prefer-destructuring */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import { useSelector } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootState } from '../types/frontend';
import styles from '../styles';
import { defaultColorIndexes, messageLimit, pegSize } from '../constants';
import Rule from '../components/Rule';
import AvailableColors from '../components/AvailableColors';
import CodeBuilder from './CodeBuilder';
import { TGame } from '../types/shared';

export default function GameBuilder({
  setGame,
  solo,
}: {
  setGame: (game: TGame) => void;
  solo: boolean;
}) {
  const theme = useTheme();
  const themedStyles = styles(theme);
  const profile = useSelector((state: RootState) => state.profile);

  const [guessesAllowed, setGuessesAllowed] = React.useState(8);
  const [numPegs, setNumPegs] = React.useState(4);
  const [possibleColors, setPossibleColors] =
    React.useState(defaultColorIndexes);
  const [message, setMessage] = React.useState('');
  const [solution, setSolution] = React.useState<number[]>([]);

  const onPressCodeLength = (direction: 'up' | 'down') => {
    if (numPegs < 6 && direction === 'up') setNumPegs(numPegs + 1);
    if (numPegs > 3 && direction === 'down') {
      setNumPegs(numPegs - 1);
      setSolution(solution.slice(0, numPegs - 1));
    }
  };

  const onPressGuessesAllowed = (direction: 'up' | 'down') => {
    if (guessesAllowed < 12 && direction === 'up')
      setGuessesAllowed(guessesAllowed + 1);
    if (guessesAllowed > 1 && direction === 'down')
      setGuessesAllowed(guessesAllowed - 1);
  };

  const generateRandomGame = () => {
    const randomSolution: number[] = [];
    for (let i = 0; i < numPegs; i++) {
      const randIx = Math.floor(Math.random() * possibleColors.length);
      randomSolution[i] = possibleColors[randIx];
    }
    const newGame: TGame = {
      numPegs,
      possibleColors,
      guessesAllowed,
      solution: randomSolution,
      guessHistory: [],
      isSolved: false,
    };
    setGame(newGame);
  };

  const generateGame = () => {
    let validSolution = true;
    for (let i = 0; i < numPegs; i++) {
      if (!possibleColors.includes(solution[i])) validSolution = false;
    }
    if (!validSolution) {
      Toast.show("Code can't be empty and must use available colors", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
      return;
    }
    const newGame: TGame = {
      numPegs,
      possibleColors,
      guessesAllowed,
      solution,
      guessHistory: [],
      isSolved: false,
      sender: {
        userName: profile.userName || 'None',
        email: profile.email || 'None',
      },
    };
    if (message.length) newGame.message = message;
    setGame(newGame);
  };

  const onColorPress = (colorIndex: number) => {
    if (solution.includes(colorIndex)) {
      Toast.show("Can't remove color used in code", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      });
      return;
    }
    if (!possibleColors.includes(colorIndex) || possibleColors.length !== 1) {
      let newPossible: number[];
      if (possibleColors.includes(colorIndex))
        newPossible = [
          ...possibleColors.filter((colorIx) => colorIx !== colorIndex),
        ];
      else newPossible = [...possibleColors, colorIndex];
      newPossible.sort();
      setPossibleColors(newPossible);
    }
  };

  const onCodePress = (ix: number) => {
    if (solution[ix] >= 0) {
      const possibleColorIndex = possibleColors.indexOf(solution[ix]);
      if (possibleColorIndex === possibleColors.length - 1)
        solution[ix] = possibleColors[0];
      else solution[ix] = possibleColors[possibleColorIndex + 1];
    } else solution[ix] = possibleColors[0];
    setSolution([...solution]);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={120}
    >
      <ScrollView contentContainerStyle={[themedStyles.scrollBuildContainer]}>
        <View
          style={[
            themedStyles.row,
            themedStyles.margin,
            themedStyles.roundBorder,
            { padding: 10 },
          ]}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Code Length</Text>
          <Ionicons
            name="remove-circle"
            size={pegSize}
            color={theme.colors.accent}
            onPress={() => onPressCodeLength('down')}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{numPegs}</Text>
          <Ionicons
            name="add-circle"
            size={pegSize}
            color={theme.colors.accent}
            onPress={() => onPressCodeLength('up')}
          />
        </View>
        <View
          style={[
            themedStyles.row,
            themedStyles.margin,
            themedStyles.roundBorder,
            { padding: 10 },
          ]}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Guesses Allowed
          </Text>
          <Ionicons
            name="remove-circle"
            size={pegSize}
            color={theme.colors.accent}
            onPress={() => onPressGuessesAllowed('down')}
          />
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            {guessesAllowed}
          </Text>
          <Ionicons
            name="add-circle"
            size={pegSize}
            color={theme.colors.accent}
            onPress={() => onPressGuessesAllowed('up')}
          />
        </View>
        <Rule text="Available Colors" marginHorizontal={5} />
        <Text>Touch a color to enable/disable in code</Text>
        <AvailableColors
          possibleColors={possibleColors}
          pegSize={pegSize}
          onPress={onColorPress}
        />
        {solo ? (
          <Button
            icon="check"
            mode="contained"
            style={[themedStyles.margin, { width: '100%' }]}
            onPress={generateRandomGame}
          >
            Play!
          </Button>
        ) : (
          <View style={{ width: '100%' }}>
            <Rule text="Code" marginHorizontal={5} />
            <Text style={{ textAlign: 'center' }}>
              Touch a peg to change color in code
            </Text>
            <CodeBuilder
              numPegs={numPegs}
              solution={solution}
              pegSize={pegSize}
              onCodePress={onCodePress}
            />
            <TextInput
              maxLength={messageLimit}
              mode="outlined"
              placeholder="Solve Message (optional)"
              placeholderTextColor="#B1B1B1"
              keyboardType="default"
              value={message}
              onChangeText={setMessage}
            />
            <Text style={{ fontSize: 10 }}>
              {message.length}/{messageLimit}
            </Text>
            <Button
              icon="send"
              mode="contained"
              style={[themedStyles.margin]}
              onPress={generateGame}
            >
              Send!
            </Button>
          </View>
        )}
      </ScrollView>
    </KeyboardAwareScrollView>
  );
}
