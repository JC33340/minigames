import Box from './Box';
import { ReactElement } from 'react';

type WordleDisplayType = {
  currentGuess: { guess: number; word: string };
  guessedWords: string[];
  unknownWord: string;
};

const WordleDisplay: React.FC<WordleDisplayType> = ({
  currentGuess,
  guessedWords,
  unknownWord,
}) => {
  var display: ReactElement[] = [];

  for (let i = 0; i < 25; i++) {
    const currentWord = currentGuess.word;
    const start = (currentGuess.guess - 1) * 5;
    //checking that guess contains the word
    if (i < guessedWords.length * 5) {
      const index = Math.floor(i / 5);
      var status: 'same' | 'includes' | '' = '';
      if (guessedWords[index]?.[i % 5] === unknownWord[i % 5]) {
        status = 'same';
        display.push(
          <Box
            key={i}
            letter={guessedWords[index]?.[i % 5].toLocaleUpperCase()}
            status={status}
          />,
        );
      } else if (unknownWord.includes(guessedWords[index]?.[i % 5])) {
        status = 'includes';
        display.push(
          <Box
            key={i}
            letter={guessedWords[index]?.[i % 5].toLocaleUpperCase()}
            status={status}
          />,
        );
      } else {
        display.push(
          <Box
            key={i}
            letter={guessedWords[index]?.[i % 5].toLocaleUpperCase()}
            status={status}
          />,
        );
      }
    } else if (i >= start && i < start + 5) {
      display.push(
        <Box letter={currentWord[i % 5]?.toLocaleUpperCase()} status={''} />,
      );
    } else {
      display.push(<Box status={''} />);
    }
  }

  return (
    <div className="grid grid-cols-5 w-fit gap-x-2 gap-y-4">{display}</div>
  );
};

export default WordleDisplay;
