// Basic arithmetic operations
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Perform arithmetic operation based on operator
const operate = (operator, a, b) => {
  const operations = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '÷': divide,
  };
  const operationFunc = operations[operator];
  return operationFunc(a, b);
};

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand += number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
  }

  compute() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    let computation = operate(this.operation, prev, current);
    if (!isFinite(computation)) {
      alert('Division by zero is not allowed.');
      this.currentOperand = '';
      return [this.previousOperand, this.currentOperand, this.operation];
    } else {
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
      return [this.previousOperand, this.currentOperand, this.operation];
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay = isNaN(integerDigits) ? '' : integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    return decimalDigits != null ? `${integerDisplay}.${decimalDigits}` : integerDisplay;
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    this.operation != null ?
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` :
      this.previousOperandTextElement.innerText = '';
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

// Event Listeners for Buttons
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

// Keyboard Support
document.addEventListener('keydown', event => {
  if (event.key >= 0 && event.key <= 9) {
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
    calculator.chooseOperation(event.key)
    calculator.updateDisplay()
  } else if (event.key === 'Enter' || event.key === '=') {
    calculator.compute()
    calculator.updateDisplay()
  } else if (event.key === 'Backspace') {
    calculator.delete()
    calculator.updateDisplay()
  } else if (event.key === 'Escape') {
    calculator.clear()
    calculator.updateDisplay()
  }
})

document.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    event.preventDefault()
    calculator.compute()
    calculator.updateDisplay()
  }
})