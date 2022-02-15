import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from '../styles';

export default function LoseMessage({ pegSize }: { pegSize: number }) {
  const theme = useTheme();
  const themedStyles = styles(theme);
  return (
    <View
      style={[
        themedStyles.row,
        themedStyles.margin,
        themedStyles.loseBorder,
        {
          padding: 10,
          alignItems: 'center',
        },
      ]}
    >
      <Ionicons name="sad" size={pegSize} color={theme.colors.error} />
      <Text>Sorry! Try again!</Text>
      <Ionicons name="sad" size={pegSize} color={theme.colors.error} />
    </View>
  );
}
