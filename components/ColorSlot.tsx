/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import styles from '../styles';
import { TPeg } from '../types/frontend';
import Peg from './Peg';

export default function ColorSlot({
  possibleColors,
  pegSize,
  addToGuess,
}: {
  possibleColors: number[];
  pegSize: number;
  addToGuess: (colorIndex: number) => void;
}) {
  const theme = useTheme();
  const themedStyles = styles(theme);
  return (
    <View
      style={[themedStyles.row, themedStyles.margin, themedStyles.roundBorder]}
    >
      {possibleColors.map((colorIndex, ix) => {
        const peg: TPeg = {
          pegSize,
          empty: false,
          colorIndex,
        };
        return (
          <Peg
            peg={peg}
            key={ix}
            onPress={() => {
              addToGuess(peg.colorIndex);
            }}
          />
        );
      })}
    </View>
  );
}
