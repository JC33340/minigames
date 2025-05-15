import { MathsGameContext } from './Maths';
import { useContext, useEffect, useState } from 'react';
import Equation from './Equation';

type operatorType = '+' | '-' | '*' | '/';

const GameDisplay = () => {
  const gameContext = useContext(MathsGameContext);
  const [operator, setOperator] = useState<operatorType>();
  const [nums, setNums] = useState<[number, number, number]>([0, 0, 0]);
  const [userInput, setUserInput] = useState<string>('');
  const [incorrect, setIncorrect] = useState(false);

  //function to generate random number
  const randomNum = (max: number) => {
    return Math.floor(Math.random() * max);
  };

  //randomly generate a sign
  const operatorArr: operatorType[] = ['-', '+', '*', '/'];
  const pickOperator = () => operatorArr[randomNum(4)];

  const generateEquation = () => {
    const o = pickOperator();
    let num1;
    let num2;
    let ans;
    if (o === '+' || o === '-') {
      num1 = randomNum(100);
      num2 = randomNum(100);
      if (o === '+') {
        ans = num1 + num2;
      } else {
        //ensuring that the answer is a positive number
        while (num1 < num2) {
          num1 = randomNum(100);
          num2 = randomNum(100);
        }
        ans = num1 - num2;
      }
      setNums([num1, num2, ans]);
    } else {
      num1 = randomNum(13);
      num2 = randomNum(13);
      ans = num1 * num2;
      if (o === '/') {
        const temp = num1;
        num1 = ans;
        ans = temp;
      }
    }
    setNums([num1, num2, ans]);
    setOperator(o);
  };

  //generate an equation whenever the game state is ongoing and the numbers array is clear
  useEffect(() => {
    if (gameContext.gameState === 'ongoing' && nums[2] == 0) {
      generateEquation();
    }
  }, [gameContext.gameState, nums]);

  //detect enter button pressed
  const keyup = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      checkAnswer();
    }
  };

  //handling input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //only change the input if the value is a number
    if (!isNaN(Number(e.target.value))) {
      setUserInput(e.target.value);
    }
  };

  //function for checking user input against answer
  const checkAnswer = () => {
    if (Number(userInput) === nums[2]) {
      generateEquation();
      setUserInput('');
      gameContext.increaseScore();
      setIncorrect(false);
    } else {
      setIncorrect(true);
    }
  };

  return (
    <div>
      {gameContext.gameState === 'start' ? (
        <div className="flex flex-col gap-y-2 items-center text-center">
          <p className="text-3xl font-semibold">Press play to start</p>
          <p>Answer as many of the questions as possible within 60 seconds</p>
          <p>The operations are limited to +, -, * and /</p>
          <p>Good Luck !</p>
        </div>
      ) : gameContext.gameState === 'ongoing' ? (
        <div className="flex flex-col gap-y-4 items-center justify-center">
          <Equation nums={nums} operator={operator} />
          <input
            onChange={handleChange}
            autoFocus
            onKeyUp={keyup}
            placeholder="Answer"
            className="border-2 rounded-md text-2xl"
            value={userInput}
          ></input>
          {incorrect && (
            <p className="text-red font-bold text-3xl ">Incorrect answer</p>
          )}
        </div>
      ) : (
        <div>Your score was {gameContext.score}</div>
      )}
    </div>
  );
};

export default GameDisplay;

export type { operatorType };
