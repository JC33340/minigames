import { useState, useContext } from 'react';
import HoverAnimation from '../../components/HoverAnimation';
import { FaPlay } from 'react-icons/fa6';
import { MathsGameContext } from './Maths';

const Timer = () => {
  // variables for storing time, if timer is started and interval id
  const [time, setTime] = useState(60);
  const [timerStart, setTimerStart] = useState(false);
  const [intervalId, setIntervalId] = useState<number | undefined>();

  const context = useContext(MathsGameContext);

  //function for counting down
  const countDown = () => {
    setTime(prev => {
      const newTime = prev - 1;
      if (newTime === -1) {
        stopTimer();
        //end game state
        context.endGame();
        //reset timer state
        setTimerStart(false);
        return 60;
      }
      return newTime;
    });
  };

  //setting an interval when the timer is started
  const startTimer = () => {
    //change timer display
    setTimerStart(true);
    // check if an interval has already been set up
    if (!intervalId) {
      context.resetScore();
      context.startGame();
      const tempStore = setInterval(countDown, 1000);
      setIntervalId(tempStore);
    }
  };

  //clearing the interval and stopping the countdown
  const stopTimer = () => {
    //clearing the interval id and resetting it back to undefined
    clearInterval(intervalId);
    setIntervalId(prev => {
      clearInterval(prev);
      return undefined;
    });
  };

  return (
    <div className="flex gap-x-4">
      <div className="bg-gray p-2 rounded-md border-2 border-black flex items-center justify-center w-30">
        <p className="font-orbitron font-semibold text-2xl"> {time}</p>
      </div>
      <HoverAnimation
        bgColor={timerStart ? 'bg-gray' : 'bg-green'}
        borderColor={timerStart ? 'border-gray' : 'border-green'}
        textColor="text-white"
        shadow="shadow-[5px_5px_#9aa1ad]"
      >
        <button disabled={timerStart ? true : false} onClick={startTimer}>
          <FaPlay size={30} />
        </button>
      </HoverAnimation>
    </div>
  );
};

export default Timer;
