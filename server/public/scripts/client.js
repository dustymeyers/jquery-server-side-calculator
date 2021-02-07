$(document).ready(onReady);
const postObject = {};
// stores our chosen operator in the string
let currentOperator = '';
// stores our current Operand value in the string
let firstOperand = '';
let secondOperand = '';
let displayOperation = '';
function onReady() {
  console.log('I am so ready');
  // fetchOperations('');
  // click event to choose operator
  $(document).on('click', '.operation-button', operationSelector);
  // click event to submit
  $(document).on('click', '#submit-calculation', onSubmit);
  // click event to clear out inputs
  $(document).on('click', '#clear-user-input', clearInputs);
  // click event for inputting numbers
  $(document).on('click', '.number-button', newOperandConstructor);
}

function clearInputs() {
  $('#first-operand-input').val('');
  $('#second-operand-input').val('');
  currentOperator = '';
}

function fetchOperations() {
  $.ajax({
    url: '/answer',
    method: 'GET',
  }).then(function (operationHistory) {
    console.log('This is our response', operationHistory);
    let lastIndex = operationHistory.length - 1;
    // loop through the operationHistory array
    $('#operation-history-output').empty();
    for (let operation of operationHistory) {
      // append each operation as a <li>
      $('#operation-history-output').append(`
        <li>${operation.firstOperand} ${operation.operator} ${operation.secondOperand} = ${operation.solution}</li>
      `);
    }
    // we also need to append the most recent operation answer to the DOM
    let lastSolution = operationHistory[lastIndex].solution;
    $('#answer-output').empty();
    $('#answer-output').append(lastSolution);
  });
}

function newOperandConstructor() {
  console.log($(this).data().value);
  let buttonPressed = $(this).data().value;
  // TODO - Come up with a way to check if a decimal has already been place in side of currentOperand
  if (currentOperator !== '') {
    secondOperand += buttonPressed;
    displayOperation += buttonPressed;
    $('#calculator-input').val(displayOperation);
  } else {
    firstOperand += buttonPressed;
    $('#calculator-input').val(firstOperand);
  }
  console.log('currentOperator is now,', firstOperand);
}

function onSubmit() {
  // define our object that we are clicking
  let newOperation = {
    firstOperand: $('#first-operand-input').val(),
    secondOperand: $('#second-operand-input').val(),
    operator: currentOperator,
  };
  $.ajax({
    data: { operation_to_add: newOperation },
    method: 'POST',
    url: '/answer',
  }).then(function (response) {
    fetchOperations();
  });

  console.log('newOperation is', newOperation);
}

function operationSelector(evt) {
  evt.preventDefault();
  // console.log($(this).data().operation);
  const operatorChosen = $(this).data().operation;
  if (operatorChosen === 'addition') {
    currentOperator = '+';
  } else if (operatorChosen === 'subtraction') {
    currentOperator = '-';
  } else if (operatorChosen === 'multiplication') {
    currentOperator = '*';
  } else if (operatorChosen === 'division') {
    currentOperator = '/';
  }
  displayOperation = firstOperand + currentOperator;
  $('#calculator-input').val(displayOperation);
  console.log(currentOperator);
}
