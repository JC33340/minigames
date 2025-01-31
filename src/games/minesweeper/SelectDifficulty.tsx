import React from 'react';

type SelectDifficultyType = {
  onClick: () => void;
};

const SelectDifficulty = ({ onClick }: SelectDifficultyType) => {
  return (
    <div>
      <div>
        <p>Beginner</p>
      </div>
      <div>
        <p>Intermediate</p>
      </div>
      <div>
        <p>Expert</p>
      </div>
    </div>
  );
};

export default SelectDifficulty;
