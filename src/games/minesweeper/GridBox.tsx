import { FaBomb } from 'react-icons/fa';
import type { gridTrackType } from './MinesweeperGrid';
import { TiFlag } from 'react-icons/ti';

type GridBoxType = {
  state: gridTrackType;
  handleClick: () => void;
};

const GridBox = ({ state, handleClick }: GridBoxType) => {
  let textColor;
  if (state.number === 1) {
    textColor = 'text-[#2228FF]';
  } else if (state.number === 2) {
    textColor = 'text-[#008000]';
  } else if (state.number === 3) {
    textColor = 'text-[#D70040]';
  } else if (state.number === 4) {
    textColor = 'text-[#CF9FFF]';
  } else if (state.number === 5) {
    textColor = 'text-[#FFEA00]';
  } else if (state.number === 6) {
    textColor = 'text-[#C04000]';
  }
  return (
    <div
      onClick={handleClick}
      className={`flex relative items-center justify-center font-bold h-3 text-xs w-3 lg:h-8 lg:w-8 md:h-6 md:w-6 md:text-md lg:text-lg border-2 border-gray-400 cursor-pointer ${textColor} ${state.isBomb ? 'bg-[#ED2939]' : ''}`}
    >
      <div
        className={`h-3 w-3 lg:h-8 lg:w-8 md:h-6 md:w-6 absolute border-2 border-gray-400 bg-gray-200 ${state.revealed ? 'opacity-0' : 'opacity-100'} flex items-center justify-center`}
      >
        {state.flagged && <TiFlag className="fill-red-500" />}
      </div>

      <p>
        {state.isBomb && <FaBomb />}
        {state.number != 0 && state.number}
      </p>
    </div>
  );
};

export default GridBox;
