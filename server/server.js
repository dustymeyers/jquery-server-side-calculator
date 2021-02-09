const express = require('express');

const operations = require('./modules/operations');

const app = express();

const port = 5000;

app.use(express.static('server/public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.listen(port, function () {
  // When the server is ready, call this function
  console.log(`I'm listening...`, port);
});

/*
 *  GET - Endpoints
 */
app.get('/answer', function (req, res) {
  console.log('GET /answer');

  // send back the array with past history
  res.send(operations.operationHistory);
});

/*
 *  POST - Endpoints
 */
app.post('/answer', function (req, res) {
  console.log(operations.operationHistory.length);

  // check that operation_to_add was received
  if (req.body.operation_to_add === undefined) {
    console.log('Oops, missing operation_to_add');

    // 400 === You're missing something
    res.sendStatus(400);

    return;
  }

  // store data object from client in operation
  let operation = req.body.operation_to_add;

  // check that all inputs were valid
  if (
    operation.firstOperand === '' ||
    operation.secondOperand === '' ||
    operation.operator === ''
  ) {
    console.log('Oops, missing part of the operation');

    // 400 === You're missing something
    res.sendStatus(400);

    return;
  } else {
    console.log('server received:', operation);

    // store the user's first number input data
    let firstOperand = Number(operation.firstOperand);

    // store the user's second number input data
    let secondOperand = Number(operation.secondOperand);

    // create a solution key/value pair for operation
    // make the value = the solution to the math problem entered by user
    operation.solution = operations.calculateOperation(
      firstOperand,
      secondOperand,
      operation.operator
    );

    // send to the array
    operations.operationHistory.push(operation);

    console.log('operation', operation);

    // OK
    res.sendStatus(200);
  }
});
