$(document).ready(onReady);

function onReady() {
  console.log('I am so ready');

  $(document).on('click', '#submit-calculation', onSubmit);
}

// create a function that gets the data on submit
