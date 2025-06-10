import separateWords from './separateWords';

type apiDataType = {
  data: { content: string }[];
};

//formatting the text into one big paragraph
const formatText = (apiData: apiDataType) => {
  let newText = '';
  for (let item of apiData.data) {
    newText += item.content;
  }
  //separate into 9 word arr
  const separate = separateWords(newText);
  const returnArr: string[][] = [];
  let temp: string[] = [];
  for (let i = 0; i < separate.length; i++) {
    temp.push(separate[i]);
    if (temp.length === 10) {
      returnArr.push(temp);
      temp = [];
    }
  }
  returnArr.push(temp);
  return returnArr;
};

export default formatText;
