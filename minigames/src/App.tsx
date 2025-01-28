import GameCard from './components/GameCard';
import { GiTicTacToe } from 'react-icons/gi';
import { TbSquareLetterW } from 'react-icons/tb';

function App() {
  return (
    <div className="grid grid-cols-3 gap-x-16 justify-items-center">
      <GameCard title="Tic Tac Toe" url="/tictactoe">
        <GiTicTacToe className="w-full h-full" />
      </GameCard>
      <GameCard title="Wordle" url="/wordle">
        <TbSquareLetterW className="h-full w-full" />
      </GameCard>
    </div>
  );
}

export default App;
