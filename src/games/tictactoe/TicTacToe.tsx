import { ReactElement } from 'react';
import Box from './Box';
import { useState, useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { FaRegCircle } from 'react-icons/fa';

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
  //state for recording if game state is a draw
  const [isDraw, setIsDraw] = useState(false);

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

  //win check
  useEffect(() => {
    let winnerFound = false;
    for (let i = 0; i < winCon.length; i++) {
      const [a, b, c] = winCon[i];
      if (
        boxState[a] &&
        boxState[a] === boxState[b] &&
        boxState[a] === boxState[c]
      ) {
        setWinner({ winner: boxState[a], winArr: winCon[i] });
        if (boxState[a] === 'p1') {
          setScore(prev => ({
            ...prev,
            p1: prev.p1 + 1,
          }));
        } else {
          setScore(prev => ({
            ...prev,
            p2: prev.p2 + 1,
          }));
        }
        winnerFound = true;
        break;
      }
    }

    //dealing with draw
    if (!winnerFound && !boxState.includes('')) {
      setIsDraw(true);
    } else {
      setIsDraw(false);
    }
  }, [boxState]);

  function restart() {
    setWinner({ winner: '', winArr: undefined });
    changeBoxState(prev => {
      let newArr: ('' | 'p1' | 'p2')[] = prev.map(_item => '');
      return newArr;
    });
    setIsDraw(false);
  }

  return (
    <div className="flex items-center gap-y-8">
      <div className="flex flex-col lg:flex-row gap-y-4 gap-x-4 items-center">
        <div className="font-bold text-2xl flex flex-row lg:flex-col gap-x-4 gap-y-8">
          <div className="flex items-center gap-x-2">
            <div
              className={`${turn === 'p1' ? '' : 'opacity-20'} p-4 lg:p-8 rounded-xl bg-[#FF4500]`}
            >
              <p>
                <FaRegCircle />
              </p>
            </div>
            <div className="p-4 lg:p-8 rounded-xl bg-[#FF4500] opacity-20">
              <p>{score.p1}</p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <div
              className={`${turn === 'p2' ? '' : 'opacity-20'} p-4 lg:p-8 rounded-xl bg-[#19B5FE]`}
            >
              <p>
                <RxCross2 />
              </p>
            </div>
            <div className="p-4 lg:p-8 rounded-xl bg-[#19B5FE] opacity-20">
              <p>{score.p2}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-3 rounded-2xl overflow-hidden h-[15rem] w-[15rem] lg:h-[20rem] lg:w-[20rem] relative">
          <div
            className={`w-full h-full absolute ${winner.winner != '' || isDraw ? 'block' : 'hidden'}  backdrop-blur-sm flex flex-col gap-y-3 justify-center items-center`}
          >
            <div
              className={`bg-white py-3 px-4 rounded-xl ${isDraw ? 'text-black' : winner.winner === 'p1' ? 'text-[#FF4500]' : 'text-[#19B5FE]'}`}
            >
              <p>
                {isDraw
                  ? 'Draw'
                  : `${winner.winner === 'p1' ? 'O' : 'X'} Wins !`}
              </p>
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
