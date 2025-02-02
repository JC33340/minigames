import { useState, useEffect } from 'react';
import SelectDifficulty from './SelectDifficulty';
import MinesweeperGrid from './MinesweeperGrid';

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

  return (
    <div>
      {firstLoad && (
        <SelectDifficulty
          firstLoadSetter={setFirstLoad}
          setGridInfo={setGridInfo}
        />
      )}
      {!firstLoad && <MinesweeperGrid gridInfo={gridInfo} />}
    </div>
  );
};

export default MineSweeper;
