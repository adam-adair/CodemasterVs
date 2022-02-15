import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'react-native-paper';

export default function SoloIcon({
  focused,
  size,
}: {
  focused: boolean;
  size: number;
}) {
  const { colors } = useTheme();
  return (
    <Ionicons
      name="md-grid"
      size={size}
      color={focused ? colors.primary : colors.disabled}
    />
  );
}
