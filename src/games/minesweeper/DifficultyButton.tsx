type difficultyButtonType = {
  text: string;
  handleClick: () => void;
  hexcode: string;
};

const DifficultyButton = ({
  text,
  handleClick,
  hexcode,
}: difficultyButtonType) => {
  let background;
  if (hexcode === '#568203') {
    background = `bg-[#568203]`;
  } else if (hexcode === '#FCD12A') {
    background = `bg-[#FCD12A]`;
  } else {
    background = 'bg-[#C21807]';
  }

  return (
    <button
      onClick={handleClick}
      className={`w-full text-2xl text-white font-bold ${background} p-5 rounded-lg transition-all hover:shadow-[10px_10px] hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-black ease-in-out`}
    >
      <p>{text}</p>
    </button>
  );
};

export default DifficultyButton;
