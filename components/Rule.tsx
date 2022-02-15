import React from 'react';
import { Text, useTheme } from 'react-native-paper';
import { View } from 'react-native';

type RuleProps = {
  text: string;
  marginHorizontal?: number;
};

function Rule({ text, marginHorizontal = 10 }: RuleProps) {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View
        style={{ flex: 1, height: 1, backgroundColor: theme.colors.text }}
      />
      <View>
        <Text style={{ marginHorizontal, textAlign: 'center' }}>{text}</Text>
      </View>
      <View
        style={{ flex: 1, height: 1, backgroundColor: theme.colors.text }}
      />
    </View>
  );
}

Rule.defaultProps = {
  marginHorizontal: 10,
};

export default Rule;
