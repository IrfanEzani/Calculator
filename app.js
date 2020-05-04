class Calculator {
  constructor(previousElement, currentElement) {
    this.previousElement = previousElement;
    this.currentElement = currentElement;
    this.clear();
  }
  clear() {
    this.current = '';
    this.previous = '';
    this.operation = undefined;
  }

  delete() {
    this.current = this.current.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.current.includes('.')) return;
    this.current = this.current.toString() + number.toString();
  }

  operationChosen(operation) {

    if (this.current === '')return

    if (this.previous !== "") {
      this.compute()
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = "";
  }

  compute() {
    let computation ;
    const prev = parseFloat(this.previous)
    const current = parseFloat(this.current) //change to number (parseFloat)
    if (isNaN(prev) || isNaN(current)) return ;

    switch (this.operation) {
      case '+':
        computation = prev + current
        break;
      case '-' :
      computation = prev - current
        break;
        case '÷' :
        computation = prev / current
          break;

          case '*' :
          computation = prev * current
            break;

          default:
          return ;
    }
    this.current = computation
    this.operation = undefined;
    this.previous = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]

    let integerDisplay
    if(isNaN(integerDigits)) {
      integerDisplay = '' //if n integer digit
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0})
    }
    if (decimalDigits != null) { //if decimal digit exist
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentElement.innerText =
      this.getDisplayNumber(this.current);
    if (this.operation != null) { //if operation exists
      this.previousElement.innerText =
        `${this.getDisplayNumber(this.previous)} ${this.operation}`
    } else {
      this.previousElement.innerText = ''
    }
  }
}

const numberBtn = document.querySelectorAll('[data-number]')
const operationBtn = document.querySelectorAll('[data-operation]')
const equalBtn = document.querySelector('[data-equal]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-all-clear]')
const previousElement = document.querySelector('[data-previous]')
const currentElement = document.querySelector('[data-current]')

const calculator = new Calculator(previousElement, currentElement)

numberBtn.forEach(button => {
  button.addEventListener('click', ()=> {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
});

operationBtn.forEach(button => {
  button.addEventListener('click', ()=> {
    calculator.operationChosen(button.innerText)
    calculator.updateDisplay()
  })
});

equalBtn.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearBtn.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
