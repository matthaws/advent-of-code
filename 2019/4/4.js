const isViablePassword = num => {
  let double = false;

  const stringNum = String(num);
  const ascendingCheck = stringNum.split("").map((digit, idx) => {
    if (
      stringNum[idx + 1] != null &&
      digit === stringNum[idx + 1] &&
      stringNum.split("").filter(num => num === digit).length === 2
    )
      double = true;
    if (
      stringNum[idx + 1] != null &&
      Number(digit) > Number(stringNum[idx + 1])
    ) {
      return false;
    }
    return true;
  });
  return ascendingCheck.every(Boolean) && double;
};

const numViablePasswords = (start, end) => {
  let count = 0;
  for (let i = start; i <= end; i++) {
    if (isViablePassword(i)) count++;
  }

  return count;
};

console.log(numViablePasswords(265275, 781584));
