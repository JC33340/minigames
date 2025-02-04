import { useState, useEffect, SetStateAction, Dispatch } from 'react';
import GridBox from './GridBox';
import type { currentButtonType } from './Minesweeper';

type MinesweeperGridType = {
  gridInfo: { height: number; width: number; cols: string; bombs: number };
  currentButton: currentButtonType;
  setRemainingBombs: Dispatch<SetStateAction<number>>;
  remainingBombs: number;
};

type gridTrackType = {
  isBomb: boolean;
  number: number;
  revealed: boolean;
  flagged: boolean;
};

const MinesweeperGrid = ({
  gridInfo,
  currentButton,
  setRemainingBombs,
  remainingBombs,
}: MinesweeperGridType) => {
  //determining if it is the first click
  const [isFirstClick, setFirstClick] = useState(true);

  //keep track of items in the grid
  const [gridTrack, setGridTrack] = useState<gridTrackType[]>([]);

  //helper function to get surrounding indices
  const getSurroundingIndices = (
    index: number,
    width: number,
    height: number,
  ) => {
    const left = index % width !== 0 ? index - 1 : null;
    const right = index % width !== width - 1 ? index + 1 : null;
    const top = index >= width ? index - width : null;
    const bottom = index < width * (height - 1) ? index + width : null;
    const topLeft = top !== null && left !== null ? top - 1 : null;
    const topRight = top !== null && right !== null ? top + 1 : null;
    const bottomLeft = bottom !== null && left !== null ? bottom - 1 : null;
    const bottomRight = bottom !== null && right !== null ? bottom + 1 : null;

    return [
      left,
      right,
      top,
      bottom,
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
    ].filter(i => i !== null) as number[];
  };

  //producing inital grid with no bombs
  useEffect(() => {
    if (gridInfo) {
      const arr = Array.from(
        { length: gridInfo.height * gridInfo.width },
        () => ({
          isBomb: false,
          number: 0,
          revealed: false,
          flagged: false,
        }),
      );
      setGridTrack(arr);
    }
  }, []);

  //helper function to reveal the index
  const revealTile = (index: number) => {
    setGridTrack(prev => {
      const newGridTrack = [...prev];
      newGridTrack[index].revealed = true;
      return newGridTrack;
    });
  };

  //helper function to reveal surrounding tiles
  const revealSurrounding = (index: number, info: gridTrackType[]) => {
    //queue is the indices that need to be checked
    let queue = [index];
    //revealed are the indices that have already been checked and revealed
    const revealed = new Set<number>();

    while (queue.length) {
      //.shift removes the first number in an array and returns it, also using a non-null assertion !
      const current = queue.shift()!;
      if (revealed.has(current) || gridTrack[current].flagged) continue;
      revealTile(current);
      //if the tile is a number then we are not adding it into the queue, only adding the the set which indicates all that have been revealed
      if (info[current].isBomb) {
        return alert('Game over');
      } else if (info[current].number) {
        revealed.add(current);
        continue;
      } else if (info[current].number === 0) {
        queue.push(current);
        revealed.add(current);
      }
      const surroundingIndices = getSurroundingIndices(
        current,
        gridInfo.width,
        gridInfo.height,
      );
      queue = queue.concat(surroundingIndices);
    }
  };

  //process to RNG bombs as well as add the corresponding indication numbers to tiles surrounding the bombs
  const generateGrid = (index: number) => {
    //random index generator
    const randInt = () => {
      return Math.floor(Math.random() * gridTrack.length);
    };

    //variable to keep track of current bomb indexes
    const currentBombIndex = new Set<number>();

    //determining bombs and adding them into the tracker
    for (let i = 0; i < gridInfo.bombs; i++) {
      let bombIndex = randInt();

      const surroundingFirstIndex = getSurroundingIndices(
        index,
        gridInfo.width,
        gridInfo.height,
      );
      while (
        currentBombIndex.has(bombIndex) ||
        surroundingFirstIndex.includes(bombIndex) ||
        index === bombIndex
      ) {
        bombIndex = randInt();
      }

      currentBombIndex.add(bombIndex);
    }

    const newGridTrack = [...gridTrack];
    currentBombIndex.forEach(index => {
      newGridTrack[index].isBomb = true;
    });

    //adding numbers into grid boxes to identify nearby bombs
    for (let i = 0; i < gridTrack.length; i++) {
      const squareIndexes = getSurroundingIndices(
        i,
        gridInfo.width,
        gridInfo.height,
      );

      //seeing if any boxes in the 9x9 grids contain bombs
      let bombs = 0;
      if (squareIndexes && newGridTrack[i].isBomb === false) {
        for (let j of squareIndexes) {
          if (newGridTrack[j].isBomb === true) {
            bombs += 1;
          }
        }
      }
      newGridTrack[i].number = bombs;
    }

    revealSurrounding(index, newGridTrack);

    setGridTrack(newGridTrack);
  };

  //function to handle whenever a box is clicked
  const handleClick = (index: number) => {
    //handle if the click is the initial click, in order to generate the grid
    if (isFirstClick && currentButton === 'sweep') {
      setFirstClick(prev => !prev);
      return generateGrid(index);
    }

    //basic logic handling for either sweeping or adding a flag to the block
    if (currentButton === 'sweep' && !gridTrack[index].flagged) {
      revealSurrounding(index, gridTrack);
    } else if (currentButton === 'flag' && !gridTrack[index].revealed) {
      //set remaining bombs, storing the bombs as another variable to keep track of it
      const bombs = remainingBombs;
      setRemainingBombs(prev => {
        const newBombCount = gridTrack[index].flagged ? bombs + 1 : bombs - 1;
        if (newBombCount < 0) return prev;
        return newBombCount;
      });
      //prevents flagging if tile is already swept
      setGridTrack(prev => {
        const newGridTrack = [...prev];
        //if bomb count is less than or equal to 0 and the item is not flagged
        if (bombs <= 0 && !newGridTrack[index].flagged) return prev;
        newGridTrack[index] = {
          ...newGridTrack[index],
          flagged: !newGridTrack[index].flagged,
        };
        return newGridTrack;
      });
    }
  };

  return (
    <div className={`grid ${gridInfo?.cols}`}>
      {gridTrack.map((item, i) => (
        <GridBox key={i} state={item} handleClick={() => handleClick(i)} />
      ))}
    </div>
  );
};

export default MinesweeperGrid;
export type { gridTrackType };
