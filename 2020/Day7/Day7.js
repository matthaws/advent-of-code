const fs = require('fs');
const text = fs.readFileSync('./input.txt', 'utf-8');
const inputLines = text.split('\n');

const createRulebook = () =>
  inputLines.filter(Boolean).reduce((rules, line) => {
    const [ruleColor, containColors] = line.split(' bags contain ');
    const contain = containColors.split(',').map(containRule => {
      const ruleParts = containRule.split(' ').filter(Boolean).slice(0, 3);
      const num = ruleParts[0] === 'no' ? 0 : Number(ruleParts[0]);
      const color = ruleParts.slice(1).join(' ');
      return [color, num];
    });
    rules[ruleColor] = contain;
    return rules;
  }, {});

const numBagsRequired = (color, rules) => {
  const colorRules = rules[color];
  if (!colorRules) return 0;
  return colorRules
    .map(rule => {
      const [ruleColor, num] = rule;
      if (num === 0) return 0;
      const numContaining = numBagsRequired(ruleColor, rules) * num;
      return numContaining + num;
    })
    .reduce((sum, num) => sum + num, 0);
};

const findNumBagsRequired = () => {
  const rules = createRulebook();
  console.log(rules);
  return numBagsRequired('shiny gold', rules);
};

console.log(findNumBagsRequired());
