import { Link } from 'react-router-dom';

interface gameCardType {
  title: string;
  children: React.ReactNode;
  url: string;
}

const GameCard = ({ title, children, url }: gameCardType) => {
  return (
    <Link to={url}>
      <div className="border-4 hover:shadow-[10px_10px] hover:translate-x-[-5px] hover:translate-y-[-5px] hover:shadow-black transition-all opacity-100 overflow-hidden justifty-self-end  w-fit border-black rounded-3xl flex items-center flex-col gap-y-4 pb-4">
        <div className="w-52 h-auto">{children}</div>
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default GameCard;
