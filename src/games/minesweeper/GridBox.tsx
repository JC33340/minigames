import { Dispatch, SetStateAction } from 'react';
import { FaBomb } from 'react-icons/fa';

type GridBoxType = {
  state: {
    isBomb: boolean;
    number: number;
  };
  isFirstClick: boolean;
  firstClickSetter: Dispatch<SetStateAction<boolean>>;
  setFirstClickIndex: () => void;
};

const GridBox = ({
  state,
  firstClickSetter,
  isFirstClick,
  setFirstClickIndex,
}: GridBoxType) => {
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

  //handle clicking of this block
  const handleClick = () => {
    if (isFirstClick) {
      setFirstClickIndex();
      firstClickSetter(prev => !prev);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex relative items-center justify-center font-bold border-2 border-gray-400 h-8 w-8 cursor-pointer ${textColor}`}
    >
      <div className="h-8 w-8 absolute border-2 border-gray-400 bg-gray-200 z-20" />
      <p>
        {state.isBomb && <FaBomb />}
        {state.number != 0 && state.number}
      </p>
    </div>
  );
};

export default GridBox;
