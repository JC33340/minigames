type BoxType = {
  letter?: string;
  status: 'same' | 'includes' | 'not' | '';
  className?: string;
  size?: 'lg' | 'sm';
};

const Box: React.FC<BoxType> = ({ letter, status, size = 'lg', className }) => {
  const sizeString = size === 'lg' ? 'h-14 w-14 lg:h-14 lg:w-14' : 'h-8 w-8';
  return (
    <div
      className={`${status === '' ? 'bg-[#59595A]' : status === 'same' ? 'bg-[#008000]' : status === 'not' ? 'bg-[#7C0A02]' : 'bg-[#C8AF55]'} rounded-lg lg:rounded-xl ${sizeString} text-white flex justify-center items-center text-3xl font-bold ${className}`}
    >
      {letter}
    </div>
  );
};

export default Box;
