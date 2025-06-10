import { typingContext } from './Typing';
import { useContext } from 'react';

const User = () => {
  const context = useContext(typingContext);
  return (
    <div>
      <input
        autoFocus
        value={context.userText}
        onChange={context.handleType}
        className="border-b-4 h-10 border-gray w-full focus:outline-none text-xl tracking-wider font-semibold opacity-50"
      ></input>
    </div>
  );
};

export default User;
