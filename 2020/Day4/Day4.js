const fs = require('fs');
const text = fs.readFileSync('./input.txt', 'utf-8');
const inputLines = text.split('\n');

const allowedEyeColor = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const lettersAndNumbers = /^[0-9a-f]+$/;
const numbers = /^\d+$/;

const validateYear = (min, max, numToCheck) => numToCheck >= min && numToCheck <= max;

const requiredFieldValidations = {
  byr: value => validateYear(1920, 2002, Number(value)),
  iyr: value => validateYear(2010, 2020, Number(value)),
  eyr: value => validateYear(2020, 2030, Number(value)),
  ecl: value => allowedEyeColor.includes(value),
  pid: value => value.length === 9 && numbers.test(value),
  hcl: value => value[0] === '#' && value.length === 7 && lettersAndNumbers.test(value.slice(1)),
  hgt: value => {
    if (value.includes('cm')) {
      const num = Number(value.split('cm')[0]);
      return num >= 150 && num <= 193;
    }
    if (value.includes('in')) {
      const num = Number(value.split('in')[0]);
      return num >= 59 && num <= 76;
    }

    return false;
  },
};

const validatePassport = passportObj => {
  const validations = Object.keys(requiredFieldValidations).map(key => {
    if (!passportObj[key]) {
      return false;
    }
    return requiredFieldValidations[key](passportObj[key]);
  });

  return validations.every(val => val);
};

const processPassports = () => {
  let obj = {};
  let count = 0;

  inputLines.forEach(line => {
    if (line === '') {
      const result = validatePassport(obj);
      if (result) count++;
      obj = {};
    } else {
      const pairs = line.split(' ');
      pairs.forEach(pair => {
        const [key, value] = pair.split(':');
        obj[key] = value;
      });
    }
  });
  const result = validatePassport(obj);
  if (result) count++;
  return count;
};

console.log(processPassports());
