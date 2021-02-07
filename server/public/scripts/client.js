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
  // basemode
  // $('#first-operand-input').val('');
  // $('#second-operand-input').val('');
  currentOperator = '';
  firstOperand = '';
  secondOperand = '';
  displayOperation = '';
  $('#calculator-input').val('');
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
  console.log(Number(firstOperand + buttonPressed));
  // Check both operands to make sure they only have one decimal point
  if (
    buttonPressed === '.' &&
    !Number(firstOperand + buttonPressed) &&
    currentOperator === '' &&
    Number(firstOperand)
  ) {
    console.log('too many decimals in firstOperand');
    return;
  } else if (
    buttonPressed === '.' &&
    !Number(secondOperand + buttonPressed) &&
    currentOperator !== '' &&
    Number(secondOperand)
  ) {
    console.log('too many decimals in secondOperand');
    return;
  }
  // Check if the operator has been chosen or not
  // Signifies which operand to construct
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
    firstOperand: firstOperand,
    secondOperand: secondOperand,
    operator: currentOperator,
  };
  // be sure all data has been packed for server properly
  if (
    newOperation.firstOperand === '' ||
    newOperation.secondOperand === '' ||
    newOperation.currentOperator === ''
  ) {
    return alert('Please input proper values.');
  } else {
    $.ajax({
      data: { operation_to_add: newOperation },
      method: 'POST',
      url: '/answer',
    }).then(function (response) {
      fetchOperations();
    });
    currentOperator = '';
    firstOperand = '';
    secondOperand = '';
    displayOperation = '';
    console.log('newOperation is', newOperation);
  }
}

function operationSelector() {
  // console.log($(this).data().operation);
  const operatorChosen = $(this).data().operation;
  if (currentOperator !== '' || firstOperand === '') {
    return;
  }
  // check which data value assigned to operatorChosen
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
