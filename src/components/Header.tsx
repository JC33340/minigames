type HeaderType = {
  text: string;
};

const Header = ({ text }: HeaderType) => {
  return (
    <div>
      <p className="text-2xl text-blue font-semibold">{text}</p>
    </div>
  );
};

export default Header;
