# TODO LIST

## Client Side

- [ ] 2 separate inputs for number values
- [ ] inputs, selectors or buttons for each math operator
  - +, -, /, \*,
- [ ] submit button (=)
  - [ ] bundle up data, including "method" for math
  - [ ] send it server side - POST
- [ ] clear button to clear out the input fields (C)

### HTML

- [x] Form, 2 inputs for numbers
- [x] buttons for math operators
- [x] button to submit, but not clear,
  - [ ] Area to render answer below
  - [ ] render operand the history under the current answer
- [x] clear button to clear out inputs

## Server Side

- [x] Handle addition, subtraction, division, and multiplication
  - [x] different functions, assign a way to signify what kind of math
- [ ] Get request to send calculations
- [ ] History of calculations
  - [ ] Send history back to DOM - GET

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
