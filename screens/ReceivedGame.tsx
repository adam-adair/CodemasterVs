import React from 'react';
import { useDispatch } from 'react-redux';
import { ReceivedGameProps } from '../types/frontend';
import Game from '../components/Game';
import { updateGame } from '../store/reducers/games';
import { TGame } from '../types/shared';

export default function ReceivedGame({ route }: ReceivedGameProps) {
  const [game, setGame] = React.useState<TGame>(route.params.game);

  const dispatch = useDispatch();

  const onSolve = () => {
    dispatch(updateGame({ ...game, isSolved: true }));
  };

  return <Game game={game} onSolve={onSolve} setGame={setGame} />;
}
