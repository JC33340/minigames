import { useEffect, useState, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import WordleDisplay from './WodleDisplay';
import AlphabetDisplay from './AlphabetDisplay';

type alphabetType = {
  alphabet: string;
  status: 'same' | 'includes' | 'not' | '';
}[];

const Wordle = () => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentGuess, setCurrentGuess] = useState<{
    guess: number;
    word: string;
  }>({ guess: 1, word: '' });
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [winStatus, setWinStatus] = useState<'win' | 'lose' | 'pending'>(
    'pending',
  );
  //storing the current state of the guessed letters in the alphabet
  const [alphabet, setAlphabet] = useState<alphabetType>([]);

  //reference to refocus onto input element after each guess
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  //getting the word using an API
  useEffect(() => {
    const getWord = async () => {
      const word = await axios
        .get('https://random-word-api.vercel.app/api?words=1&length=5')

        .catch(function (error) {
          console.log(error);
          alert('Sorry, Something went wrong');
          navigate('/');
        });
      if (word) {
        setCurrentWord(word.data[0]);
      }
    };
    getWord();

    const alphabetArr = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const alpabetObj: alphabetType = alphabetArr.map(item => {
      return { alphabet: item, status: '' };
    });
    setAlphabet(alpabetObj);
  }, []);

  //getting input value and storing it into state
  function handleKeyUp(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentGuess(prev => {
      return {
        ...prev,
        word: e.target.value,
      };
    });
  }

  //handling user guess submission to change state
  const submitGuess = async () => {
    let regex = /^[a-zA-Z]+$/;
    let currentGuessLower = currentGuess.word.toLowerCase();
    if (regex.test(currentGuess.word) && currentGuess.word.length === 5) {
      try {
        //changing guess words array to contain new guessed word
        setGuessedWords(prev => {
          const newArr = [...prev];
          newArr[currentGuess.guess - 1] = currentGuessLower;
          return newArr;
        });
        //checking if the user has won
        if (currentGuessLower === currentWord) {
          setWinStatus('win');
          return;
        }
        //moving the pointer for the current guess to next item
        setCurrentGuess(prev => {
          return {
            guess: prev.guess + 1,
            word: '',
          };
        });
        //updating alphabet with new information
        for (let i = 0; i < currentGuess.word.length; i++) {
          const guessLetter = currentGuess.word[i];
          const wordLetter = currentWord[i];
          const index = alphabet.findIndex(
            element => element.alphabet === guessLetter,
          );
          if (guessLetter === wordLetter) {
            setAlphabet(prev => {
              const newArr = [...prev];
              newArr[index].status = 'same';
              return newArr;
            });
          } else if (currentWord.includes(guessLetter)) {
            setAlphabet(prev => {
              const newArr = [...prev];
              newArr[index].status = 'includes';
              return newArr;
            });
          } else {
            setAlphabet(prev => {
              const newArr = [...prev];
              newArr[index].status = 'not';
              return newArr;
            });
          }
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          alert('Not an actual word');
          console.log(error.response?.status);
        }
      }
    } else {
      return alert('Enter valid guess');
    }
    inputRef.current?.focus();
  };

  //reloads the window, basically restarting the game
  const restartGame = () => {
    window.location.reload();
  };

  //checking if user has lost
  useEffect(() => {
    if (guessedWords.length === 5 && winStatus === 'pending') {
      setWinStatus('lose');
    }
  }, [guessedWords]);

  return (
    <div className="flex flex-col-reverse lg:flex-row flex lg:items-start items-center justify-center gap-y-4 gap-x-8">
      <div className="flex flex-col gap-y-2 items-center">
        <div className="flex gap-x-2">
          <input
            ref={inputRef}
            disabled={winStatus != 'pending' ? true : false}
            placeholder="Guess"
            maxLength={5}
            value={currentGuess.word}
            className="px-2 py-4 rounded-3xl border-2 border-[#59595A] text-2xl"
            onChange={handleKeyUp}
          ></input>
          <button
            disabled={winStatus != 'pending' ? true : false}
            onClick={submitGuess}
            className="h-fill bg-blue border-2 border-blue text-white relative font-bold px-4 rounded-2xl hover:bg-white hover:text-blue transition-all ease-in-out "
          >
            Guess
          </button>
        </div>
        <div
          className={`${winStatus != 'pending' ? 'opacity-100' : 'opacity-0'} flex gap-x-2 items-center`}
        >
          <p
            className={`${winStatus === 'win' ? 'text-[#008000]' : 'text-[#FF0800]'} text-2xl font-bold`}
          >
            {winStatus === 'win' ? 'You Win!' : `The word was ${currentWord}`}
          </p>
          <button
            onClick={restartGame}
            disabled={winStatus != 'pending' ? false : true}
            className="bg-black rounded-2xl text-white p-4"
          >
            Restart
          </button>
        </div>
        <AlphabetDisplay alphabet={alphabet} />
      </div>
      <WordleDisplay
        currentGuess={currentGuess}
        guessedWords={guessedWords}
        unknownWord={currentWord}
      />
    </div>
  );
};

export default Wordle;

export type { alphabetType };
