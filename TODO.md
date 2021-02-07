# TODO LIST

## Client Side

- [x] 2 separate inputs for number values
- [x] inputs, selectors or buttons for each math operator
  - +, -, /, \*,
- [x] submit button (=)
  - [x] bundle up data, including "method" for math
  - [x] send it server side - POST
- [x] clear button to clear out the input fields (C)

### HTML

- [x] Form, 2 inputs for numbers
- [x] buttons for math operators
- [x] button to submit, but not clear,
  - [x] Area to render answer below
  - [x] render operand the history under the current answer
- [x] clear button to clear out inputs

## Server Side

- [x] Handle addition, subtraction, division, and multiplication
  - [x] different functions, assign a way to signify what kind of math
- [x] Get request to send calculations
- [x] History of calculations
  - [x] Send history back to DOM - GET

### GET /answer

Returns a new answer, every time you hit it.

Like so:

```json
{
  "firstOperand": "12",
  "secondOperand": "4",
  "operator": "-",
  "solution": "8"
}
```

### POST /answer

Create a new operation, like

```json
{
  "operation_to_add": {
    "firstOperand": "12",
    "secondOperand": "4",
    "operator": "-"
  }
}
```
