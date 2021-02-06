$(document).ready(onReady);

function onReady() {
  console.log('I am so ready');

  // $(document).on('click', '#submit-calculation', onSubmit);
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
// create a function that gets the data on submit
