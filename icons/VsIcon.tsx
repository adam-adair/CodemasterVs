import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

export default function VsIcon({
  focused,
  size,
}: {
  focused: boolean;
  size: number;
}) {
  const { colors } = useTheme();
  return (
    <Ionicons
      name="people"
      size={size}
      color={focused ? colors.primary : colors.disabled}
    />
  );
}
