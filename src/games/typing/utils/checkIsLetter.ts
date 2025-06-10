const checkIsLetter = (letter: string): boolean => {
  if (letter.length > 1) return false;
  const stringReg = /^[A-Za-z ().,:;'"!*\?-]+$/;
  return stringReg.test(letter);
};

export default checkIsLetter;
