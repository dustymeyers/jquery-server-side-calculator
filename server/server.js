const express = require('express');

const app = express();
const port = 5000;
app.use(express.static('server/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, function () {
  // When the server is ready, call this function
  console.log(`I'm listening...`, port);
});

// store each operation made in in an array
const operationHistory = [
  {
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
  },
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
/*
 *  GET - Endpoints
 */
app.get('/answer', function (req, res) {
  console.log('GET /answer');
  // send back the array with past history
  res.send(operationHistory);
});
/*
 *  POST - Endpoints
 */
app.post('/answer', function (req, res) {
  console.log(operationHistory.length);
  if (req.body.operation_to_add === undefined) {
    console.log('Oops, missing operation_to_add');
    // 400 === You're missing something
    res.sendStatus(400);
    return;
  }
  let operation = req.body.operation_to_add;
  if (
    operation.firstOperand === '' ||
    operation.secondOperand === '' ||
    operation.operator === ''
  ) {
    console.log('Oops, missing part of the operation');
    // 400 === You're missing something
    res.sendStatus(400);
    return;
  }
  console.log('server received:', operation);
  let firstOperand = Number(operation.firstOperand);
  let secondOperand = Number(operation.secondOperand);
  operation.solution = calculateOperation(
    firstOperand,
    secondOperand,
    operation.operator
  );
  operationHistory.push(operation);
  console.log('operation', operation);
  res.sendStatus(200);
});
