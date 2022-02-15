/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { pegSize } from '../constants';
import styles from '../styles';
import { TGame } from '../types/shared';
import ColorSlot from './ColorSlot';
import GuessSlot from './GuessSlot';
import LoseMessage from './LoseMessage';
import PastGuessSlot from './PastGuessSlot';
import SolutionSlot from './SolutionSlot';
import WinMessage from './WinMessage';

export default function Game({
  game,
  onSolve,
  setGame,
}: {
  game: TGame;
  onSolve: () => void;
  setGame: (game: TGame) => void;
}) {
  const {
    numPegs,
    guessesAllowed,
    possibleColors,
    isSolved,
    guessHistory,
    solution,
  } = game;
  // use fixed size instead of screen dimension based for now
  // const [boardSize, setBoardSize] = React.useState({ height: 0, width: 0 });
  const theme = useTheme();
  const themedStyles = styles(theme);

  const [currentGuess, setCurrentGuess] = React.useState<number[]>([]);

  const evaluateGuess = (guess: number[], code: number[]) => {
    const response = [0, 0];

    const evaluatedCode: { [key: number]: boolean } = {};
    const evaluatedGuess: { [key: number]: boolean } = {};

    for (let i = 0; i < guess.length; i++) {
      const guessColor = guess[i];
      const codeColor = code[i];
      if (guessColor === codeColor) {
        response[0]++;
        evaluatedCode[i] = true;
        evaluatedGuess[i] = true;
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (!evaluatedGuess[i]) {
        const guessColor = guess[i];
        let foundColor = false;
        for (let j = 0; j < code.length; j++) {
          const codeColor = code[j];
          if (!foundColor && !evaluatedCode[j] && guessColor === codeColor) {
            response[1]++;
            evaluatedCode[j] = true;
            foundColor = true;
          }
        }
      }
    }

    return response;
  };

  const addToGuess = (colorIndex: number) => {
    if (currentGuess.length < numPegs)
      setCurrentGuess([...currentGuess, colorIndex]);
  };

  const removeFromGuess = (guessIndex: number) => {
    if (currentGuess[guessIndex] !== undefined)
      setCurrentGuess([...currentGuess.filter((_, ix) => ix !== guessIndex)]);
  };

  const submitGuess = () => {
    const response = evaluateGuess(currentGuess, solution);

    setGame({
      ...game,
      guessHistory: [...guessHistory, { guess: [...currentGuess], response }],
    });
    setCurrentGuess([]);
    if (response[0] === solution.length) {
      setGame({
        ...game,
        isSolved: true,
      });
      onSolve();
    }
  };

  return (
    <View style={[themedStyles.gameContainer, themedStyles.margin]}>
      <View style={{ flex: 1 }}>
        <SolutionSlot
          isSolved={isSolved}
          solution={solution}
          pegSize={pegSize}
          remaining={guessesAllowed - guessHistory.length}
        />
        {isSolved || guessHistory.length === guessesAllowed ? null : (
          <GuessSlot
            numPegs={numPegs}
            currentGuess={currentGuess}
            pegSize={pegSize}
            removeFromGuess={removeFromGuess}
            submitGuess={submitGuess}
          />
        )}
        <ScrollView
          persistentScrollbar
          contentContainerStyle={[
            themedStyles.margin,
            themedStyles.scrolGuessContainer,
          ]}
        >
          {guessHistory.map((pastGuess, guessIx) => (
            <PastGuessSlot
              key={guessIx}
              numPegs={numPegs}
              pastGuess={pastGuess}
              pegSize={pegSize}
            />
          ))}
        </ScrollView>
      </View>
      {isSolved || guessHistory.length === guessesAllowed ? null : (
        <ColorSlot
          possibleColors={possibleColors}
          pegSize={pegSize}
          addToGuess={addToGuess}
        />
      )}
      {isSolved ? (
        <WinMessage pegSize={pegSize} message={game.message} />
      ) : null}
      {!isSolved && guessHistory.length === guessesAllowed ? (
        <LoseMessage pegSize={pegSize} />
      ) : null}
    </View>
  );
}
