import { Dispatch, SetStateAction } from 'react';
import DifficultyButton from './DifficultyButton';

type SelectDifficultyType = {
  firstLoadSetter: Dispatch<SetStateAction<boolean>>;
  setGridInfo: Dispatch<
    SetStateAction<{
      height: number;
      width: number;
      cols: string;
      bombs: number;
    }>
  >;
  setRemainingBombs: Dispatch<SetStateAction<number>>;
};

const SelectDifficulty = ({
  firstLoadSetter,
  setGridInfo,
  setRemainingBombs,
}: SelectDifficultyType) => {
  const windowInnerWidth = window.innerWidth;
  console.log(windowInnerWidth);
  //function to set difficulty
  const chooseDifficulty = (input: string) => {
    firstLoadSetter(false);
    if (input === 'beginner') {
      setGridInfo({ height: 9, width: 9, cols: 'grid-cols-9', bombs: 10 });
      setRemainingBombs(10);
    } else if (input === 'intermediate') {
      setGridInfo({
        height: 16,
        width: windowInnerWidth < 768 ? 9 : 16,
        cols: windowInnerWidth < 768 ? 'grid-cols-9' : 'grid-cols-16',
        bombs: windowInnerWidth < 768 ? 25 : 40,
      });
      setRemainingBombs(windowInnerWidth < 768 ? 25 : 40);
    } else {
      setGridInfo({
        height:
          windowInnerWidth < 1024 ? (windowInnerWidth < 768 ? 20 : 30) : 16,
        width: windowInnerWidth < 1024 ? (windowInnerWidth < 768 ? 9 : 20) : 30,
        cols:
          windowInnerWidth < 1024
            ? windowInnerWidth < 768
              ? 'grid-cols-9'
              : 'grid-cols-20'
            : 'grid-cols-30',
        bombs:
          windowInnerWidth < 1024 ? (windowInnerWidth < 768 ? 33 : 75) : 99,
      });
      setRemainingBombs(
        windowInnerWidth < 1024 ? (windowInnerWidth < 768 ? 33 : 75) : 99,
      );
    }
  };

  return (
    <div className="flex flex-col gap-y-6 items-center">
      <p className="font-bold text-2xl">Select difficulty:</p>
      <DifficultyButton
        text="Beginner"
        hexcode="#568203"
        handleClick={() => chooseDifficulty('beginner')}
      />
      <DifficultyButton
        text="Intermediate"
        hexcode="#FCD12A"
        handleClick={() => chooseDifficulty('intermediate')}
      />
      <DifficultyButton
        text="Expert"
        hexcode="#C21807"
        handleClick={() => chooseDifficulty('expert')}
      />
    </div>
  );
};

export default SelectDifficulty;
