import { useState, useEffect } from 'react';
import GridBox from './GridBox';

type MinesweeperGridType = {
  gridInfo: { height: number; width: number; cols: string; bombs: number };
};

type gridTrackType = {
  isBomb: boolean;
  number: number;
};

const MinesweeperGrid = ({ gridInfo }: MinesweeperGridType) => {
  //determining if it is the first click
  const [isFirstClick, setFirstClick] = useState(true);

  //determining index of first click to prevent bombs from generating at that point
  const [firstClickIndex, setFirstClickIndex] = useState<number>();

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
    const arr = [];
    if (gridInfo) {
      for (let i = 0; i < gridInfo.height * gridInfo.width; i++) {
        arr.push({ isBomb: false, number: 0 });
      }
    }
    setGridTrack(arr);
  }, []);

  //process to RNG bombs onto the grid within a useEffect to only generate after the first click
  useEffect(() => {
    if (!isFirstClick) {
      //random index generator
      const randInt = () => {
        return Math.floor(Math.random() * gridTrack.length);
      };

      //variable to keep track of current bomb indexes
      const currentBombIndex = new Set<number>();

      //determining bombs and adding them into the tracker
      for (let i = 0; i < gridInfo.bombs; i++) {
        let bombIndex = randInt();
        if (firstClickIndex) {
          const surroundingFirstIndex = getSurroundingIndices(
            firstClickIndex,
            gridInfo.width,
            gridInfo.height,
          );
          while (
            currentBombIndex.has(bombIndex) ||
            surroundingFirstIndex.includes(bombIndex)
          ) {
            bombIndex = randInt();
          }
        }
        currentBombIndex.add(bombIndex);
      }

      const newGridTrack = [...gridTrack];
      currentBombIndex.forEach(index => {
        newGridTrack[index].isBomb = true;
      });
      setGridTrack(newGridTrack);
    }
  }, [isFirstClick]);

  //use effect for setting the numbers which indicate surrounding bombs
  useEffect(() => {
    if (!isFirstClick) {
      const newGridTrack = [...gridTrack];
      //adding numbers into grid boxes
      for (let i = 0; i < gridTrack.length; i++) {
        const squareIndexes = getSurroundingIndices(
          i,
          gridInfo.width,
          gridInfo.height,
        );

        //seeing if any boxes in the 9x9 grids contain bombs
        let bombs = 0;
        if (squareIndexes && gridTrack[i].isBomb === false) {
          for (let j of squareIndexes) {
            if (gridTrack[j].isBomb === true) {
              bombs += 1;
            }
          }
        }

        newGridTrack[i].number = bombs;
      }
      setGridTrack(newGridTrack);
    }
  }, [gridTrack]);

  //creating grid display
  const display = [];

  //pushing items onto the grid
  for (let i = 0; i < gridTrack.length; i++) {
    display.push(
      <GridBox
        key={i}
        state={gridTrack[i]}
        firstClickSetter={setFirstClick}
        isFirstClick={isFirstClick}
        setFirstClickIndex={() => setFirstClickIndex(i)}
      />,
    );
  }
  return <div className={`grid ${gridInfo?.cols}`}>{display}</div>;
};

export default MinesweeperGrid;
