import Button from '../../components/Button';
import { useContext, useEffect, useState } from 'react';
import { typingContext } from './Typing';
import calculateResult from './utils/calculateResult';
import ListItem from './ListItem';

type resultItemType = {
  totalWords: number;
  date: string;
  correctWords: number;
};

const Result = () => {
  const { setGameState, userText, setLoading, setUserText, challengeText } =
    useContext(typingContext);
  const [display, setDisplay] = useState<resultItemType[]>([]);

  const handleClick = () => {
    setLoading(true);
    setUserText('');
    setGameState('start');
  };

  //getting previois information from local storage
  const getLocal = async (item: resultItemType[]) => {
    const prevRes = localStorage.getItem('typingChallengeResults');
    let arr: resultItemType[] = [];
    console.log(prevRes);
    if (prevRes) {
      arr = await JSON.parse(prevRes);
      arr = item.concat(arr);
    }
    setDisplay(arr);
    localStorage.setItem('typingChallengeResults', JSON.stringify(arr));
  };

  useEffect(() => {
    let formatArr = challengeText[0];
    for (let i = 1; i < challengeText.length; i++) {
      formatArr = formatArr.concat(challengeText[i]);
    }
    const result = calculateResult(userText, formatArr);
    //getting information from local storage
    getLocal([result]);
  }, []);

  return (
    <div className="flex flex-col gap-y-4 w-full items-center ">
      <p className="font-bold text-2xl text-blue ">Result</p>
      <div className=" w-full text-sm md:text-lg h-70 border-2 border-blue rounded-lg overflow-y-scroll ">
        <ul className="grid grid-cols-4 font-semibold border-b-2">
          <ListItem className="border-r-2">Correct Words</ListItem>
          <ListItem className="border-r-2">Total Words</ListItem>
          <ListItem className="border-r-2">Accuracy</ListItem>
          <ListItem>Date</ListItem>
        </ul>

        {display.map((item, i) => {
          return (
            <ul
              key={i}
              className={`font-semibold grid grid-cols-4 ${i % 2 === 0 ? 'bg-blue text-white' : 'text-blue'}`}
            >
              <ListItem className="border-r-2">{item.correctWords}</ListItem>
              <ListItem className="border-r-2">{item.totalWords}</ListItem>
              <ListItem className="border-r-2">
                {Math.round((item.correctWords / item.totalWords) * 10000) /
                  100}
                %
              </ListItem>
              <ListItem>{item.date}</ListItem>
            </ul>
          );
        })}
      </div>
      <Button text="Restart" handleClick={handleClick} />
    </div>
  );
};

export default Result;
export type { resultItemType };
