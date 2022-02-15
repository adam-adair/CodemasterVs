import React from 'react';
import { SoloGameProps } from '../types/frontend';
import Game from '../components/Game';
import { TGame } from '../types/shared';

export default function SoloGame({ route }: SoloGameProps) {
  const [game, setGame] = React.useState<TGame>(route.params.game);

  const onSolve = () => {
    // @todo something w solo results?
    console.log('Solo Win');
  };

  return <Game game={game} onSolve={onSolve} setGame={setGame} />;
}
