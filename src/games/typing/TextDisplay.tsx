import Challenge from './Challenge';
import User from './User';

const TextDisplay = () => {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <Challenge />
      <User />
    </div>
  );
};

export default TextDisplay;
