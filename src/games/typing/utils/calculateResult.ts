import separateWords from './separateWords';
import type { resultItemType } from '../Result';

const calculateResult = (text: string, challenge: string[]): resultItemType => {
  const arr = separateWords(text).filter(item => item != '');
  const date = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  let correct = 0;
  //find correct words
  for (let i = 0; i < arr.length; i++) {
    if (challenge[i] === arr[i]) {
      correct += 1;
    }
  }

  return { totalWords: arr.length, correctWords: correct, date: date };
};

export default calculateResult;
