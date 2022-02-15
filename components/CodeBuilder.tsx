/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import styles from '../styles';
import { TPeg } from '../types/frontend';
import Peg from './Peg';

export default function CodeBuilder({
  numPegs,
  solution,
  pegSize,
  onCodePress,
}: {
  numPegs: number;
  solution: number[];
  pegSize: number;
  onCodePress: (ix: number) => void;
}) {
  const theme = useTheme();
  const themedStyles = styles(theme);
  const arr = new Array(numPegs).fill(null);
  for (let i = 0; i < numPegs; i++) {
    if (solution[i] >= 0) arr[i] = solution[i];
  }

  return (
    <View
      style={[
        themedStyles.row,
        themedStyles.margin,
        themedStyles.roundBorder,
        { marginLeft: 0 },
      ]}
    >
      {arr.map((colorIndex, solutionIx) => {
        const peg: TPeg = {
          pegSize,
          empty: colorIndex === null,
          colorIndex,
        };
        return (
          <Peg
            peg={peg}
            key={solutionIx}
            onPress={() => onCodePress(solutionIx)}
          />
        );
      })}
    </View>
  );
}
