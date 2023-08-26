const currentScreen = document.getElementById('user-input');
const resultScreen = document.getElementById('result');
const buttons = document.querySelectorAll('.numpad button');
const allClear = document.getElementById('all-clear');
const deleteNumber = document.getElementById('delete-num');

const numbers = document.querySelectorAll('.data-num')
const operators = document.querySelectorAll('.data-op');
const point = document.querySelector('.data-point')
const equals = document.querySelector('.data-equals')

let firstOperand = '';
let secondOperand = '';
let operator = null

let shouldResetScreen = false;

numbers.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operators.forEach(op => {
    op.addEventListener('click', () => setOperation(op.textContent))
})

point.addEventListener('click', appendPeriod)

equals.addEventListener('click', check)

allClear.addEventListener('click', clearCalculator)
deleteNumber.addEventListener('click', deleteLast)

document.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(e) {

    if(e.key >= 0 || e.key <= 9) {
        appendNumber(e.key)
    }
    
    if(e.key === '+' || e.key == '-' || e.key == '*' || e.key == '/' || e.key == '%') {
        setOperation(e.key)
    }

    if(e.key === '.') {
        appendPeriod()
    }

    if (e.key === '=' || e.key === 'Enter') check()

    if(e.key == 'Backspace') deleteLast()

    if(e.key == 'Escape') clearCalculator()
}

function appendNumber(number) {
    if(currentScreen.textContent == '0' || shouldResetScreen) {
        resetScreen()
    }
    currentScreen.textContent += number
}

function resetScreen() {
    currentScreen.textContent = ''
    shouldResetScreen = false
}


function appendPeriod() {
    if(shouldResetScreen) resetScreen()
    if(currentScreen.textContent == ''){
        currentScreen.textContent = '0'
    }
    if(currentScreen.textContent.includes('.')) return
    currentScreen.textContent += '.'
}

function setOperation(symbol) {
    if(operator !== null || shouldResetScreen) check()
    operator = symbol;
    firstOperand = currentScreen.textContent;
    resultScreen.textContent = `${firstOperand } ${operator}`

    shouldResetScreen = true;
}

function check() {
    if (operator === null || shouldResetScreen) return
    secondOperand = currentScreen.textContent;

    currentScreen.textContent = roundAnswer(operate(operator, firstOperand, secondOperand))

    resultScreen.textContent = `${firstOperand} ${operator} ${secondOperand} =`
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)

    switch(operator) {
        case '+':
            return add(a,b)
        case '-':
            return minus(a,b)
        case '*':
            return multiply(a,b)
        case '/': 
            return divide(a,b);
        case '%': 
            return modulos(a,b);
        default:
            return null
    }
}

function deleteLast() {
    currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1)
}

function clearCalculator() {
    currentScreen.textContent = '0'
    resultScreen.textContent = ''
    firstOperand = '';
    secondOperand = '';
    operator = null
}

function add(a,b) {
    return a + b;
}

function minus(a,b) {
    return a - b;
}
function multiply(a,b) {
    return a * b;
}
function divide(a,b) {
    return a / b;
}

function modulos(a,b) {
    return a % b;
}

function roundAnswer(result) {
    return Math.round(result * 100) / 100
}

