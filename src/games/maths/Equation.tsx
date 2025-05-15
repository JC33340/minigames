import type { operatorType } from './GameDisplay';

type EquationType = {
  nums: [number, number, number];
  operator: operatorType | undefined;
};

const Equation = ({ nums, operator }: EquationType) => {
  return (
    <div className="text-5xl font-semibold">
      {nums[0]} {operator} {nums[1]}
    </div>
  );
};

export default Equation;
