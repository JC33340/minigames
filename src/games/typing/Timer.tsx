import { useContext, useEffect, useState } from 'react';
import { typingContext } from './Typing';
import { FaCirclePause } from 'react-icons/fa6';
import { FaCirclePlay } from 'react-icons/fa6';

const Timer = () => {
  const context = useContext(typingContext);
  const [seconds, setSeconds] = useState(60);

  //a promise that increments the time every second
  const incrementTime = () => {
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(setSeconds(prev => prev - 1));
      }, 1000),
    );
  };

  //a function to start the countdown until the timer reaches 0
  //when it reaches 0 reset the timer start back to false
  const countDown = async () => {
    let localTime = seconds;
    while (localTime) {
      await incrementTime();
      localTime -= 1;
    }
    context.setGameState('end');
  };

  //setting the timer to start once the user inputs something
  useEffect(() => {
    if (context.userText.length && context.gameState === 'start') {
      context.setGameState('ongoing');
      countDown();
    }
  }, [context.userText]);

  return (
    <div className="flex flex-col gap-y-2 items-center justify-center">
      <div className="flex gap-x-4 items-center">
        <p className="text-xl font-semibold">{seconds}</p>
        {context.gameState === 'ongoing' ? (
          <FaCirclePlay fill="green" size={30} />
        ) : (
          <FaCirclePause fill="red" size={30} />
        )}
      </div>
      <p className="text-gray">The timer will start once you type !</p>
    </div>
  );
};

export default Timer;
