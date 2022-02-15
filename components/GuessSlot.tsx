/* eslint-disable react/no-array-index-key */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import styles from '../styles';
import { TPeg } from '../types/frontend';
import Peg from './Peg';

export default function GuessSlot({
  numPegs,
  currentGuess,
  pegSize,
  removeFromGuess,
  submitGuess,
}: {
  numPegs: number;
  currentGuess: number[];
  pegSize: number;
  removeFromGuess: (guessIndex: number) => void;
  submitGuess: () => void;
}) {
  const emptyPeg: TPeg = {
    colorIndex: 0,
    empty: true,
    pegSize,
  };
  const pegsArray = new Array(numPegs).fill(emptyPeg);
  for (let i = 0; i < pegsArray.length; i += 1) {
    if (currentGuess[i] !== undefined)
      pegsArray[i] = {
        colorIndex: currentGuess[i],
        empty: false,
        pegSize,
      };
  }

  const theme = useTheme();
  const themedStyles = styles(theme);
  return (
    <View
      style={[themedStyles.row, themedStyles.margin, themedStyles.roundBorder]}
    >
      {pegsArray.map((peg, pegIx) => (
        <Peg peg={peg} key={pegIx} onPress={() => removeFromGuess(pegIx)} />
      ))}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: pegSize,
          flexGrow: 1,
        }}
      >
        {currentGuess.length === numPegs ? (
          <Ionicons
            name="checkmark-circle"
            size={pegSize}
            color={theme.colors.accent}
            onPress={submitGuess}
          />
        ) : null}
      </View>
    </View>
  );
}
