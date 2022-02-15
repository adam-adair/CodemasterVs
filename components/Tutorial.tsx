/* eslint-disable global-require */
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Image } from 'react-native';
import {
  IconButton,
  Button,
  Headline,
  Subheading,
  Text,
  useTheme,
  TextInput,
} from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setTutorialVisible } from '../store/reducers/tutorialVisible';
import ColorSlot from './ColorSlot';
import { pegSize } from '../constants';
import SolutionSlot from './SolutionSlot';
import PastGuessSlot from './PastGuessSlot';
import GuessSlot from './GuessSlot';

export default function Tutorial() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [step, setStep] = React.useState(0);

  const markFinished = () => {
    AsyncStorage.setItem('@tutorial', JSON.stringify({ finished: true }));
    dispatch(setTutorialVisible(false));
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  const previousStep = () => {
    setStep(step - 1);
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 15,
      }}
    >
      {step === 0 ? (
        <>
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 50, height: 50 }}
          />
          <Headline style={{ textAlign: 'center' }}>
            Welcome to CodemasterVs!
          </Headline>
          <Subheading>Guess The Code Colors</Subheading>
          <Subheading>Play Solo or with Friends</Subheading>
          <Text>Press button to continue tutorial</Text>
        </>
      ) : null}
      {step === 1 ? (
        <>
          <Subheading>Each code is a series of colors:</Subheading>
          <ColorSlot
            possibleColors={[0, 3, 1, 6]}
            pegSize={pegSize}
            addToGuess={() => null}
          />
          <Subheading>There can be 3 to 6 colors in a code.</Subheading>
          <Subheading>And colors can be repeated:</Subheading>
          <ColorSlot
            possibleColors={[4, 4, 2, 5, 2]}
            pegSize={pegSize}
            addToGuess={() => null}
          />
        </>
      ) : null}
      {step === 2 ? (
        <>
          <Subheading>Your job is to guess the code.</Subheading>
          <Subheading>The number shows how many guesses are left.</Subheading>
          <SolutionSlot
            solution={[0, 3, 1, 6]}
            pegSize={pegSize}
            isSolved={false}
            remaining={7}
          />
          <Subheading>
            You will add colors to your guess and press the green button to
            submit
          </Subheading>
          <GuessSlot
            numPegs={4}
            currentGuess={[1, 3, 2, 0]}
            pegSize={pegSize}
            removeFromGuess={() => null}
            submitGuess={() => null}
          />
          <Subheading>
            If you change your mind, you can touch a color to remove it from
            your guess.
          </Subheading>
          {/* <Subheading>
            After a guess, black and white pegs are awarded.
          </Subheading>
          <PastGuessSlot
            numPegs={4}
            pastGuess={{ guess: [1, 3, 2, 0], response: [1, 2] }}
            pegSize={pegSize} 
          /> */}
        </>
      ) : null}
      {step === 3 ? (
        <>
          <Subheading>
            After a guess, black and white pegs are awarded.
          </Subheading>
          <Subheading>
            <Text style={{ fontWeight: 'bold' }}>Black Pegs</Text> mean you
            guessed the <Text style={{ fontWeight: 'bold' }}>right</Text> color
            in the <Text style={{ fontWeight: 'bold' }}>right</Text> position.
          </Subheading>
          <View style={{ alignItems: 'center' }}>
            <Subheading>For example:</Subheading>
            <Text>(Secret Code)</Text>
            <SolutionSlot
              solution={[0, 3, 1, 6]}
              pegSize={pegSize}
              isSolved
              remaining={7}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text>(Guess)</Text>
            <PastGuessSlot
              numPegs={4}
              pastGuess={{ guess: [2, 3, 1, 5], response: [2, 0] }}
              pegSize={pegSize}
            />
          </View>
          <Subheading>
            Green and Orange are in the code and in the right position.
          </Subheading>
        </>
      ) : null}
      {step === 4 ? (
        <>
          <Subheading>
            <Text style={{ fontWeight: 'bold' }}>White Pegs</Text> mean you
            guessed the <Text style={{ fontWeight: 'bold' }}>right</Text> color
            but in the <Text style={{ fontWeight: 'bold' }}>wrong</Text>{' '}
            position.
          </Subheading>
          <View style={{ alignItems: 'center' }}>
            <Subheading>For example:</Subheading>
            <Text>(Secret Code)</Text>
            <SolutionSlot
              solution={[0, 3, 1, 6]}
              pegSize={pegSize}
              isSolved
              remaining={7}
            />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text>(Guess)</Text>
            <PastGuessSlot
              numPegs={4}
              pastGuess={{ guess: [3, 1, 5, 4], response: [0, 2] }}
              pegSize={pegSize}
            />
          </View>
          <Subheading>
            Green and Orange are in the code but in the wrong position.
          </Subheading>
        </>
      ) : null}
      {step === 5 ? (
        <>
          <Subheading>
            See if you can deduce the code before your guesses run out!
          </Subheading>
          <SolutionSlot
            solution={[0, 3, 1, 6]}
            pegSize={pegSize}
            isSolved
            remaining={7}
          />
          <PastGuessSlot
            numPegs={4}
            pastGuess={{ guess: [0, 3, 1, 6], response: [4, 0] }}
            pegSize={pegSize}
          />
          <PastGuessSlot
            numPegs={4}
            pastGuess={{ guess: [0, 3, 6, 1], response: [2, 2] }}
            pegSize={pegSize}
          />
          <PastGuessSlot
            numPegs={4}
            pastGuess={{ guess: [1, 1, 6, 6], response: [1, 1] }}
            pegSize={pegSize}
          />
          <PastGuessSlot
            numPegs={4}
            pastGuess={{ guess: [0, 0, 3, 3], response: [1, 1] }}
            pegSize={pegSize}
          />
        </>
      ) : null}
      {step === 6 ? (
        <>
          <Subheading>
            You can play <Text style={{ fontWeight: 'bold' }}>Solo</Text> and
            try to guess randomly generated codes.
          </Subheading>
          <SolutionSlot
            solution={[0, 3, 1, 6]}
            pegSize={pegSize}
            isSolved={false}
            remaining={5}
          />
          <Subheading>
            Or add <Text style={{ fontWeight: 'bold' }}>Contacts</Text> and send
            them your own codes.
          </Subheading>
          <SolutionSlot
            solution={[3, 5, 3, 5, 1]}
            pegSize={pegSize}
            isSolved
            remaining={5}
          />
          <Subheading>
            Include an optional{' '}
            <Text style={{ fontWeight: 'bold' }}>Secret Message</Text> to be
            revealed when your friend solves.
          </Subheading>
          <View
            style={{
              width: '80%',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <IconButton icon="send" color={theme.colors.primary} />
            <TextInput
              disabled
              mode="outlined"
              value="Nice work, sleuth!"
              style={{ flexGrow: 1 }}
            />
          </View>
        </>
      ) : null}
      {step === 7 ? (
        <>
          <Subheading>
            Create a Profile to add Contacts and start sending and receiving
            codes!
          </Subheading>
          <Subheading>
            Thanks for playing! You can view this Tutorial at any time from the
            Solo screen.
          </Subheading>
          <Headline style={{ textAlign: 'center' }}>CodemasterVs</Headline>
          <Image
            source={require('../assets/icon.png')}
            style={{ width: 50, height: 50 }}
          />
        </>
      ) : null}
      <View>
        <View style={{ flexDirection: 'row', width: '80%' }}>
          <IconButton
            icon="arrow-left"
            disabled={step === 0}
            onPress={previousStep}
            color="white"
            style={{
              margin: 2,
              width: '50%',
              backgroundColor: theme.colors.primary,
              borderRadius: theme.roundness,
            }}
          />
          <IconButton
            icon="arrow-right"
            disabled={step === 7}
            onPress={nextStep}
            color="white"
            style={{
              margin: 2,
              width: '50%',
              backgroundColor: theme.colors.primary,
              borderRadius: theme.roundness,
            }}
          />
        </View>
        {step === 0 || step === 7 ? (
          <Button mode="contained" onPress={markFinished} style={{ margin: 2 }}>
            {step === 7 ? 'Finish Tutorial' : 'Skip Tutorial'}
          </Button>
        ) : null}
      </View>
    </View>
  );
}
