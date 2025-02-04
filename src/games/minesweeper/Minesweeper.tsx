import { useState } from 'react';
import SelectDifficulty from './SelectDifficulty';
import MinesweeperGrid from './MinesweeperGrid';
import { TiFlag } from 'react-icons/ti';
import { TbShovel } from 'react-icons/tb';

type currentButtonType = 'flag' | 'sweep';

const MineSweeper = () => {
  //determining if this is the first load
  const [firstLoad, setFirstLoad] = useState(true);

  //grid dimmensions and information
  const [gridInfo, setGridInfo] = useState<{
    height: number;
    width: number;
    cols: string;
    bombs: number;
  }>({ height: 0, width: 0, cols: '', bombs: 0 });

  //const keeping track of flags being put down
  const [remainingBombs, setRemainingBombs] = useState<number>(0);

  //keeping track of the current button
  const [currentButton, setCurrentButton] =
    useState<currentButtonType>('sweep');

  //function to change the buttons
  const handleButtonChange = (action: currentButtonType) => {
    setCurrentButton(action);
  };

  return (
    <div>
      {firstLoad && (
        <SelectDifficulty
          firstLoadSetter={setFirstLoad}
          setGridInfo={setGridInfo}
          setRemainingBombs={setRemainingBombs}
        />
      )}
      {!firstLoad && (
        <div className="flex flex-col items-center gap-y-4">
          <div className="flex gap-x-8">
            <button
              onClick={() => handleButtonChange('flag')}
              className={`border-black border-2 ${currentButton === 'flag' ? '' : 'bg-gray-300'} rounded-md p-2 hover:translate-x-[-5px] hover:translate-y-[-5px] transition-all ease-in-out hover:shadow-[5px_5px_#9aa1ad]`}
            >
              <TiFlag className="h-6 w-6 fill-red-500" />
            </button>
            <div className="bg-black border-2 border-gray-400 px-4 py-2 rounded-lg font-mono">
              <span className="text-red-500">{remainingBombs}</span>
            </div>
            <button
              onClick={() => handleButtonChange('sweep')}
              className={`border-black border-2 ${currentButton === 'sweep' ? '' : 'bg-gray-300'} rounded-md p-2 hover:translate-x-[-5px] hover:translate-y-[-5px] transition-all ease-in-out hover:shadow-[5px_5px_#9aa1ad]`}
            >
              <TbShovel className="h-6 w-6" />
            </button>
          </div>
          <MinesweeperGrid
            gridInfo={gridInfo}
            currentButton={currentButton}
            remainingBombs={remainingBombs}
            setRemainingBombs={setRemainingBombs}
          />
        </div>
      )}
    </div>
  );
};

export default MineSweeper;
export { type currentButtonType };
