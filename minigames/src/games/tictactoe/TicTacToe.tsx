import { ReactElement } from 'react';
import Box from './Box';
import { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [winner, setWinner] = useState<{
    winner: '' | 'p1' | 'p2';
    winArr: number[] | undefined;
  }>({ winner: '', winArr: undefined });
  const [turn, setTurn] = useState<'p1' | 'p2'>('p1');
  const [boxState, changeBoxState] = useState<('' | 'p1' | 'p2')[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [score, setScore] = useState({ p1: 0, p2: 0 });
  var boxDisplay: ReactElement[] = [];

  const winCon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < 9; i++) {
    boxDisplay.push(
      <Box
        key={i}
        id={i}
        boxState={boxState}
        turnState={turn}
        boxSetter={changeBoxState}
        turnSetter={setTurn}
        winner={winner}
      />,
    );
  }

  useEffect(() => {
    for (let i = 0; i < winCon.length; i++) {
      let winCheck: ('' | 'p1' | 'p2')[] = [];
      for (let j = 0; j < winCon[i].length; j++) {
        winCheck.push(boxState[winCon[i][j]]);
      }
      if (winCheck.every((val, _i, arr) => val === arr[0])) {
        if (winCheck[0] === '') {
          continue;
        } else if (winCheck[0] === 'p1') {
          setWinner({ winner: 'p1', winArr: winCon[i] });
          setScore(prev => {
            return {
              ...prev,
              p1: prev.p1++,
            };
          });
        } else {
          setWinner({ winner: 'p2', winArr: winCon[i] });
          setScore(prev => {
            return {
              ...prev,
              p2: prev.p2++,
            };
          });
        }
      }
    }
  }, [boxState]);

  function restart() {
    setWinner({ winner: '', winArr: undefined });
    changeBoxState(prev => {
      let newArr: ('' | 'p1' | 'p2')[] = prev.map(item => (item = ''));
      return newArr;
    });
  }

  return (
    <div className="flex flex-col items-center gap-y-8">
      <div className="flex gap-x-4 items-center">
        <div className="font-bold text-2xl flex flex-col gap-y-8">
          <div className="flex items-center gap-x-2">
            <div
              className={`${turn === 'p1' ? '' : 'opacity-20'} p-8 rounded-xl bg-[#FF4500]`}
            >
              <p>P1</p>
            </div>
            <div className="p-8 rounded-xl bg-[#FF4500] opacity-20">
              <p>{score.p1}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <div
              className={`${turn === 'p2' ? '' : 'opacity-20'} p-8 rounded-xl bg-[#19B5FE]`}
            >
              <p>P2</p>
            </div>
            <div className="p-8 rounded-xl bg-[#19B5FE] opacity-20">
              <p>{score.p2}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 rounded-2xl overflow-hidden h-[60vh] w-[60vh] relative">
          <div
            className={`w-full h-full absolute ${winner.winner != '' ? 'block' : 'hidden'}  backdrop-blur flex flex-col gap-y-3 justify-center items-center`}
          >
            <div
              className={`bg-white py-3 px-4 rounded-xl ${winner.winner === 'p1' ? 'text-[#FF4500]' : 'text-[#19B5FE]'}`}
            >
              <p>{winner.winner.toLocaleUpperCase()} Wins !</p>
            </div>
            <button
              className="bg-black text-white py-2 px-3 rounded-xl"
              onClick={restart}
            >
              Restart
            </button>
          </div>
          {boxDisplay}
        </div>
      </div>
    </div>
  );
};

export default TicTacToe;
