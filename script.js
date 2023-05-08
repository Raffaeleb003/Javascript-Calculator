let displayValue = '0';
let firstNumber = null;
let operator = null;
let clearDisplay = false;

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return 'ERROR: Cannot divide by zero';
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    default:
      return 'ERROR: Invalid operator';
  }
}

function updateDisplay() {
  const display = document.querySelector('#display');
  display.textContent = displayValue;
}

function handleNumberInput(number) {
  if (clearDisplay) {
    displayValue = '0';
    clearDisplay = false;
  }
  if (displayValue === '0') {
    displayValue = number;
  } else {
    displayValue += number;
  }
  updateDisplay();
}

function handleOperatorInput(selectedOperator) {
  if (firstNumber === null) {
    firstNumber = parseFloat(displayValue);
  } else {
    const secondNumber = parseFloat(displayValue);
    const result = operate(operator, firstNumber, secondNumber);
    displayValue = result.toString().slice(0, 12);
    updateDisplay();
    firstNumber = result;
  }
  operator = selectedOperator;
  clearDisplay = true;
}

function handleEqualInput() {
  if (firstNumber !== null && operator !== null) {
    const secondNumber = parseFloat(displayValue);
    const result = operate(operator, firstNumber, secondNumber);
    displayValue = result.toString().slice(0, 12);
    updateDisplay();
    firstNumber = result;
    operator = null;
    clearDisplay = true;
  }
}

function handleClearInput() {
  displayValue = '0';
  firstNumber = null;
  operator = null;
  clearDisplay = false;
  updateDisplay();
}

function handleDecimalInput() {
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

function init() {
  const numberButtons = document.querySelectorAll('.number');
  const operatorButtons = document.querySelectorAll('.operator');
  const decimalButton = document.querySelector('.decimal');
  const clearButton = document.querySelector('.clear');
  const equalButton = document.querySelector('.equal');

  numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      handleNumberInput(button.textContent);
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      handleOperatorInput(button.textContent);
    });
  });

  decimalButton.addEventListener('click', handleDecimalInput);
  clearButton.addEventListener('click', handleClearInput);
  equalButton.addEventListener('click', handleEqualInput);
}

init();