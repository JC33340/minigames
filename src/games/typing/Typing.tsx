import Header from '../../components/Header';
import TextDisplay from './TextDisplay';
import { useEffect, useState, createContext } from 'react';
import Loading from '../../components/Loading';
import formatText from './utils/formatText';
import Result from './Result';

type gameStateType = 'start' | 'ongoing' | 'end';

const typingContext = createContext<{
  userText: string;
  challengeText: string[][];
  handleType: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gameState: gameStateType;
  setGameState: (
    value: gameStateType | ((prevState: gameStateType) => gameStateType),
  ) => void;
  setLoading: (value: boolean | ((prevState: boolean) => boolean)) => void;
  setUserText: (value: string | ((prevState: string) => string)) => void;
}>({
  userText: '',
  challengeText: [],
  handleType: () => {},
  gameState: 'start',
  setGameState: () => {},
  setLoading: () => {},
  setUserText: () => {},
});

const Typing = () => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState<string[][]>([]);
  const [userText, setUserText] = useState('');
  const [gameState, setGameState] = useState<gameStateType>('start');

  useEffect(() => {
    //getting text information from API
    const getText = async () => {
      const data = await fetch(
        'https://fakerapi.it/api/v2/texts?_quantity=20&_characters=500',
      );
      const dataParsed = await data.json();
      const formatted = formatText(dataParsed);
      setText(formatted);
      //delaying removing the loading screen to allow text to load
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    if (gameState === 'start') {
      getText();
    }
  }, [gameState]);

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
        value={{
          userText: userText,
          challengeText: text,
          handleType,
          gameState,
          setGameState,
          setLoading,
          setUserText,
        }}
      >
        {loading ? (
          <Loading />
        ) : gameState === 'end' ? (
          <Result />
        ) : (
          <TextDisplay />
        )}
      </typingContext.Provider>
    </div>
  );
};

export { typingContext };

export default Typing;
