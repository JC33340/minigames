type BoxType = {
  letter?: string;
  status: 'same' | 'includes' | 'not' | '';
  className?: string;
};

const Box: React.FC<BoxType> = ({ letter, status, className }) => {
  return (
    <div
      className={`${status === '' ? 'bg-[#59595A]' : status === 'same' ? 'bg-[#008000]' : status === 'not' ? 'bg-[#7C0A02]' : 'bg-[#C8AF55]'} rounded-3xl h-20 w-20 text-white flex justify-center items-center text-3xl font-bold ${className}`}
    >
      {letter}
    </div>
  );
};

export default Box;
