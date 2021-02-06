$(document).ready(onReady);

function onReady() {
  console.log('I am so ready');

  // $(document).on('click', '#submit-calculation', onSubmit);
  $.ajax({
    url: '/answer',
    method: 'GET',
  }).then(function (operationHistory) {
    console.log('This is our response', operationHistory);
  });
}
// create a function that gets the data on submit
