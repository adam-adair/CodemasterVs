import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import styles from '../styles';

export default function WinMessage({
  pegSize,
  message,
}: {
  pegSize: number;
  message?: string;
}) {
  const theme = useTheme();
  const themedStyles = styles(theme);
  return (
    <View
      style={[
        themedStyles.row,
        themedStyles.margin,
        themedStyles.winBorder,
        {
          padding: 10,
          alignItems: 'center',
        },
      ]}
    >
      {message ? null : (
        <Ionicons name="trophy" size={pegSize} color={theme.colors.accent} />
      )}
      <Text>{message || 'Congratulations!'}</Text>
      {message ? null : (
        <Ionicons name="trophy" size={pegSize} color={theme.colors.accent} />
      )}
    </View>
  );
}

WinMessage.defaultProps = {
  message: null,
};
