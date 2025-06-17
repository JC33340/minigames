import Challenge from './Challenge';
import User from './User';
import Timer from './Timer';

const TextDisplay = () => {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <Timer />
      <Challenge />
      <User />
    </div>
  );
};

export default TextDisplay;
