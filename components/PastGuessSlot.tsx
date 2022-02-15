/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import styles from '../styles';
import { TPeg } from '../types/frontend';
import { TGuess } from '../types/shared';
import Peg from './Peg';
import Response from './Response';

export default function PastGuessSlot({
  numPegs,
  pastGuess,
  pegSize,
}: {
  numPegs: number;
  pastGuess: TGuess;
  pegSize: number;
}) {
  const emptyPeg: TPeg = {
    colorIndex: 0,
    empty: true,
    pegSize,
  };
  const pegsArray = new Array(numPegs).fill(emptyPeg);
  const { guess, response } = pastGuess;
  for (let i = 0; i < pegsArray.length; i += 1) {
    if (guess[i] !== undefined)
      pegsArray[i] = {
        colorIndex: guess[i],
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
        <Peg peg={peg} key={pegIx} />
      ))}
      <Response response={response} pegSize={pegSize} numPegs={numPegs} />
    </View>
  );
}
