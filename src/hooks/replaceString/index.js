import { split } from 'lodash';

export const replaceString = (oldS, newS, fullS, n) => {
  let count = 0;
  for (let i = 0; i < fullS.length; ++i) {
    if (fullS.substring(i, i + oldS.length) == oldS) {
      count += 1;
      if (count == n) {
        fullS =
          fullS.substring(0, i) +
          newS +
          fullS.substring(i + oldS.length, fullS.length);
      }
    }
  }
  return fullS;
};
