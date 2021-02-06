$(document).ready(onReady);

function onReady() {
  console.log('I am so ready');

  // $(document).on('click', '#submit-calculation', onSubmit);
  $.ajax({
    url: '/answer',
    method: 'GET',
  }).then(function (operationHistory) {
    console.log('This is our response', operationHistory);
    // loop through the operationHistory array
    $('#operation-history-output').empty();
    for (let operation of operationHistory) {
      // append each operation as a <li>
      $('#operation-history-output').append(`
        <li>${operation.firstOperand} ${operation.operator} ${operation.secondOperand} = ${operation.solution}</li>
      `);
    }
  });
}
// create a function that gets the data on submit
