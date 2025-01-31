import { RxCross2 } from 'react-icons/rx';
import { FaRegCircle } from 'react-icons/fa';

type BoxType = {
  id: number;
  boxSetter: React.Dispatch<React.SetStateAction<('' | 'p1' | 'p2')[]>>;
  turnSetter: React.Dispatch<React.SetStateAction<'p1' | 'p2'>>;
  boxState: ('' | 'p1' | 'p2')[];
  turnState: 'p1' | 'p2';
  winner: { winner: '' | 'p1' | 'p2'; winArr: number[] | undefined };
};

const Box: React.FC<BoxType> = ({
  id,
  boxSetter,
  turnSetter,
  boxState,
  turnState,
  winner,
}) => {
  const topRow = [0, 1, 2];
  const midRow = [3, 4, 5];
  const midCol = [1, 4, 7];

  var border: string = '';

  if (topRow.includes(id) || midRow.includes(id)) {
    border = 'border-b-8';
  }
  if (midCol.includes(id)) {
    border = border + ' ' + 'border-r-8 border-l-8';
  }

  const clickHandler = () => {
    if (boxState[id] != '') {
      return;
    } else {
      boxSetter(prev => {
        let newArr = [...prev];
        newArr[id] = turnState;
        return newArr;
      });
      turnSetter(prevState => {
        return prevState === 'p1' ? 'p2' : 'p1';
      });
    }
  };

  return (
    <div
      key={id}
      className={`${border} ${winner.winArr?.includes(id) ? (winner.winner === 'p1' ? 'bg-[#FF4500]' : winner.winner === 'p2' ? 'bg-[#19B5FE]' : '') : ''} border-black flex items-center justify-center`}
      onClick={clickHandler}
    >
      {boxState[id] === '' ? (
        ''
      ) : boxState[id] === 'p1' ? (
        <FaRegCircle className="h-15 w-15 lg:h-20 lg:w-20" />
      ) : (
        <RxCross2 className="h-15 w-15 lg:h-20 lg:w-20" />
      )}
    </div>
  );
};

export default Box;
