import { type alphabetType } from './Wordle';
import Box from './Box';

const AlphabetDisplay = ({
  alphabet,
}: {
  alphabet: alphabetType | undefined;
}) => {
  //creating grid for alphabet display
  const alphabetGrid = [];
  if (alphabet) {
    for (let i of alphabet) {
      alphabetGrid.push(
        <Box
          key={i.alphabet}
          status={i.status}
          letter={i.alphabet.toUpperCase()}
          className="text-sm rounded-md lg:rounded-md"
          size="sm"
        />,
      );
    }
  }

  return (
    <div className="flex flex-col items-center gap-y-4">
      <h2 className="text-lg font-bold">Guessed letters</h2>
      <div className="grid grid-cols-6 gap-4">{alphabetGrid}</div>
    </div>
  );
};

export default AlphabetDisplay;
