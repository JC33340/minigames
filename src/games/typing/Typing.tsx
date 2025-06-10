import Header from '../../components/Header';
import TextDisplay from './TextDisplay';
import { useEffect, useState, createContext } from 'react';
import Loading from '../../components/Loading';
import formatText from './utils/formatText';

const typingContext = createContext<{
  userText: string;
  challengeText: string[][];
  handleType: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>({ userText: '', challengeText: [], handleType: () => {} });

const Typing = () => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState<string[][]>([]);
  const [userText, setUserText] = useState('');

  useEffect(() => {
    //getting text information from API
    const getText = async () => {
      const data = await fetch(
        'https://fakerapi.it/api/v2/texts?_quantity=20&_characters=500',
      );
      const dataParsed = await data.json();
      const formattedText = formatText(dataParsed);
      setText(formattedText);
      setLoading(false);
    };
    getText();
  }, []);

  //handling input changes for user
  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    if (key[key.length - 2] === ' ' && key[key.length - 1] === ' ') return;
    setUserText(key);
  };

  return (
    <div className="flex flex-col items-center w-full h-full gap-y-4">
      <Header text="Typing challenge" />
      <typingContext.Provider
        value={{ userText: userText, challengeText: text, handleType }}
      >
        {loading ? <Loading /> : <TextDisplay />}
      </typingContext.Provider>
    </div>
  );
};

export { typingContext };

export default Typing;
