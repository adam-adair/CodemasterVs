import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { defaultColorIndexes } from '../constants';
import styles from '../styles';
import { TPeg } from '../types/frontend';
import Peg from './Peg';

export default function AvailableColors({
  possibleColors,
  pegSize,
  onPress,
}: {
  possibleColors: number[];
  pegSize: number;
  onPress: (colorIndex: number) => void;
}) {
  const theme = useTheme();
  const themedStyles = styles(theme);
  return (
    <View
      style={[themedStyles.row, themedStyles.margin, themedStyles.roundBorder]}
    >
      {defaultColorIndexes.map((colorIndex) => {
        const peg: TPeg = {
          pegSize,
          empty: !possibleColors.includes(colorIndex),
          colorIndex,
        };
        return (
          <Peg peg={peg} key={colorIndex} onPress={() => onPress(colorIndex)} />
        );
      })}
    </View>
  );
}
