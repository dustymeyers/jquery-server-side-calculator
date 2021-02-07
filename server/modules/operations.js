// store each operation made in in an array
const operationHistory = [
  /*  {
    firstOperand: 12,
    secondOperand: 4,
    operator: '-',
    solution: 8,
  },
  {
    firstOperand: 16,
    secondOperand: 3,
    operator: '*',
    solution: 45,
  },
  {
    firstOperand: 4,
    secondOperand: 1,
    operator: '+',
    solution: 5,
  },
  {
    firstOperand: 42,
    secondOperand: 2,
    operator: '/',
    solution: 21,
  },
  {
    firstOperand: 13,
    secondOperand: 8,
    operator: '+',
    solution: 21,
  }, */
];
// calculate data from object sent to server
// num1 = first operand
// num2 = second operand
// op = operator
function calculateOperation(num1, num2, op) {
  if (op === '+') {
    // do addition
    return num1 + num2;
  } else if (op === '-') {
    // do subtraction
    return num1 - num2;
  } else if (op === '*') {
    // do multiplication
    return num1 * num2;
  } else if (op === '/') {
    // do division
    return num1 / num2;
  }
}
module.exports = { operationHistory, calculateOperation };
