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
  operation.solution = operations.calculateOperation(
    firstOperand,
    secondOperand,
    operation.operator
  );
  operations.operationHistory.push(operation);
  console.log('operation', operation);
  res.sendStatus(200);
});
