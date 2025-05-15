import Timer from './Timer';
import { createContext, useState } from 'react';
import GameDisplay from './GameDisplay';

type gameStateType = 'start' | 'ongoing' | 'end';

type MathsGameContextType = {
  gameState: gameStateType;
  startGame: () => void;
  endGame: () => void;
  score: number;
  increaseScore: () => void;
  resetScore: () => void;
};

const MathsGameContext = createContext<MathsGameContextType>({
  gameState: 'start',
  startGame: () => {},
  endGame: () => {},
  score: 0,
  increaseScore: () => {},
  resetScore: () => {},
});

const Maths = () => {
  const [gameState, setGameState] = useState<gameStateType>('start');
  const [score, setScore] = useState<number>(0);

  //action for starting game
  const startGame = () => {
    setGameState('ongoing');
  };

  //action for ending game
  const endGame = () => {
    setGameState('end');
  };

  //increasing score
  const increaseScore = () => {
    setScore(prev => prev + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  return (
    <MathsGameContext.Provider
      value={{
        gameState,
        startGame,
        endGame,
        score,
        increaseScore,
        resetScore,
      }}
    >
      <div className="flex flex-col gap-y-4 items-center">
        <Timer />
        <GameDisplay />
      </div>
    </MathsGameContext.Provider>
  );
};

export default Maths;

export { MathsGameContext };
