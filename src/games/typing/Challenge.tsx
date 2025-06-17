import { useContext, useRef } from 'react';
import { typingContext } from './Typing';
import separateWords from './utils/separateWords';
import { motion, useAnimate } from 'motion/react';

const Challenge = () => {
  const { userText, challengeText } = useContext(typingContext);
  const user = separateWords(userText);

  //references for the div
  const containerRef = useRef<HTMLDivElement>(null);
  //storing the previous line
  const previous = useRef<number>(0);
  //storing height values
  const totalHeight = useRef(0);
  //more in depth animation control
  const [scope, animate] = useAnimate();
  //calculating the current line
  const group = Math.floor((user.length - 1) / 10);
  //animating the div to scroll if we have moved on from the current line.
  if (group !== previous.current) {
    const div = containerRef.current;
    const prevDiv = group - 1 < 0 ? 0 : group - 1;
    const height = div?.querySelectorAll('p')[prevDiv].offsetHeight;
    if (group > previous.current) {
      totalHeight.current += height || 0;
    } else {
      totalHeight.current -= height || 0;
    }
    animate(
      scope.current,
      { translateY: -totalHeight.current },
      { duration: 0.5 },
    );
    previous.current = group;
  }
  return (
    <div className="border-2 w-full border-gray rounded-lg h-60 px-4 py-2 overflow-hidden">
      <motion.div
        className="whitespace-pre-wrap text-2xl/10 font-semibold tracking-wider text-justify"
        ref={containerRef}
      >
        <motion.div ref={scope}>
          {challengeText.map((item, i) => {
            return (
              <p
                key={i}
                className='after:content-[""] after:inline-block after:w-full'
              >
                {item.map((word, j) => {
                  const index = i * 10 + j;
                  return (
                    <span
                      key={j}
                      className={`${user[index] ? (user[index] === word ? 'text-green' : 'text-red') : 'opacity-30'}`}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </p>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Challenge;
