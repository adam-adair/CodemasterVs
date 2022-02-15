/* eslint-disable react/no-array-index-key */
import React from 'react';
import { View } from 'react-native';

export default function Response({
  response,
  pegSize,
  numPegs,
}: {
  response: number[];
  pegSize: number;
  numPegs: number;
}) {
  const numBlackDots = response[0];
  const numWhiteDots = response[1];
  const blackDots = new Array(numBlackDots).fill(0);
  const whiteDots = new Array(numWhiteDots).fill(0);

  const responsePegSize = (1.3 * pegSize) / numPegs;
  const pegStyle = {
    borderColor: 'grey',
    width: responsePegSize,
    height: responsePegSize,
    borderRadius: responsePegSize,
    borderWidth: 1,
    margin: 1,
  };
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
        width: pegSize,
        borderRadius: 3,
        flexGrow: 1,
      }}
    >
      <View
        style={{
          height: pegSize,
          flexWrap: 'wrap',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 1,
        }}
      >
        {blackDots.map((_, ix) => {
          return (
            <View
              key={ix}
              style={{
                backgroundColor: 'black',
                ...pegStyle,
              }}
            />
          );
        })}
        {whiteDots.map((_, ix) => {
          return (
            <View
              key={ix}
              style={{
                backgroundColor: 'white',
                ...pegStyle,
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
