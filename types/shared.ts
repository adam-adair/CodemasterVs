export type TProfile = {
  userName: string | null;
  isLoggedIn: boolean;
  darkTheme: boolean;
  email: string | null;
  noInterstitials?: boolean;
};

export type TSenderInfo = {
  userName: string;
  email: string;
};

export type TGame = {
  numPegs: number;
  possibleColors: number[];
  guessesAllowed: number;
  solution: number[];
  guessHistory: TGuess[];
  isSolved: boolean;
  sender?: TSenderInfo;
  message?: string;
  uid?: string;
  sentDate?: string;
};

export type TGuess = {
  guess: number[];
  response: number[];
};
