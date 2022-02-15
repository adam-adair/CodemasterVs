/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import styles from '../styles';
import { TPeg } from '../types/frontend';
import Peg from './Peg';

export default function SolutionSlot({
  solution,
  isSolved,
  pegSize,
  remaining,
}: {
  solution: number[];
  isSolved: boolean;
  pegSize: number;
  remaining: number;
}) {
  const theme = useTheme();
  const themedStyles = styles(theme);
  return (
    <View
      style={[themedStyles.row, themedStyles.margin, themedStyles.roundBorder]}
    >
      {solution.map((colorIndex, solutionIx) => {
        const peg: TPeg = {
          pegSize,
          empty: !isSolved && remaining !== 0,
          colorIndex,
        };
        return <Peg peg={peg} key={solutionIx} />;
      })}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: pegSize,
          flexGrow: 1,
        }}
      >
        {isSolved ? (
          <Ionicons
            name="checkmark-circle"
            size={pegSize}
            color={theme.colors.accent}
          />
        ) : remaining === 0 ? (
          <Ionicons
            name="md-close-circle"
            size={pegSize}
            color={theme.colors.error}
          />
        ) : (
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{remaining}</Text>
        )}
      </View>
    </View>
  );
}
