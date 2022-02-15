import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { pegColors } from '../constants';
import { TPeg } from '../types/frontend';

function Peg({ peg, onPress }: { peg: TPeg; onPress?: () => void }) {
  const { pegSize, colorIndex, empty } = peg;
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      style={{
        padding: 10,
        flexGrow: 1,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: pegSize,
          height: pegSize,
          borderRadius: pegSize / 2,
          backgroundColor: empty
            ? theme.colors.disabled
            : pegColors[colorIndex],
        }}
      >
        <View
          style={{
            opacity: 0.5,
            width: pegSize * 0.9,
            height: pegSize * 0.9,
            borderRadius: pegSize / 2.2,
            backgroundColor: empty ? theme.colors.disabled : 'white',
          }}
        >
          <View
            style={{
              opacity: 1,
              width: pegSize * 0.825,
              height: pegSize * 0.825,
              borderRadius: pegSize / 2.2,
              backgroundColor: empty
                ? theme.colors.disabled
                : pegColors[colorIndex],
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

Peg.defaultProps = {
  onPress: null,
};

export default Peg;
