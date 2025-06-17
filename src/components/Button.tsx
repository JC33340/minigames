type buttonType = {
  text: string;
  handleClick: () => void;
};

const Button = ({ text, handleClick }: buttonType) => {
  return (
    <button
      onClick={handleClick}
      className="py-2 px-3 border-blue w-fit border-2 rounded-lg bg-blue text-white font-semibold hover:shadow-black hover:shadow-[10px_10px] hover:translate-x-[-5px] hover:translate-y-[-5px] transition-all ease-in-out"
    >
      {text}
    </button>
  );
};

export default Button;
