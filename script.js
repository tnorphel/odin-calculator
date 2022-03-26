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
    if (b == 0) {
        return "ERROR: Cannot Divide by Zero!"
    } else {
        return a / b;
    }
}

function operate(a, b, operator) {
    let result = null;
    switch(operator) {
        case '+' :
            result = add(a, b);
            break;
        case '−':
            result = subtract(a, b);
            break;
        case '×':
            result = multiply(a, b);
            break;
        case '÷' :
            result = divide(a, b);
            break;
    }
    return result;
}

let operand1 = '';
let operand2 = '';
let operator = '';
let result = '';

const previousDisplay = document.querySelector('.previous');
const currentDisplay = document.querySelector('.current');

const digits = document.querySelectorAll('.digit');
digits.forEach(digit => {
    digit.addEventListener('click', appendDigits);
});

function appendDigits(e) {
    if (currentDisplay.textContent == '0') {
        currentDisplay.textContent = '';
    }
    currentDisplay.textContent += e.target.textContent;
}

const decimal = document.getElementById('decimal');
decimal.addEventListener('click', appendDecimal);

function appendDecimal(e) {
    if (currentDisplay.textContent.includes('.')) {
        return;
    } else {
        currentDisplay.textContent += e.target.textContent;
    }
}

const operators = document.querySelectorAll('.operator');
operators.forEach(operator => {
    operator.addEventListener('click', appendOperatorOrOperate);
});

function appendOperatorOrOperate(e) {
    if ((previousDisplay.textContent+currentDisplay.textContent).slice(-1) === '+' || (previousDisplay.textContent+currentDisplay.textContent).slice(-1) === '−' || (previousDisplay.textContent+currentDisplay.textContent).slice(-1) === '×' || (previousDisplay.textContent+currentDisplay.textContent).slice(-1) === '÷') {
        return;
    }
    let currentExpression = previousDisplay.textContent + currentDisplay.textContent;
    if (currentExpression.includes('+') || currentExpression.includes('−') || currentExpression.includes('×') || currentExpression.includes('÷')) {
        for (let i = 0; i < currentExpression.length; i++) {
            if (currentExpression[i] == '+' || currentExpression[i] == '−' || currentExpression[i] == '×' || currentExpression[i] == '÷') {
                operand1 = currentExpression.slice(0, i);
                operator = currentExpression[i];
                operand2 = currentExpression.slice(i + 1);
            }
        }
        result = operate(Number(operand1), Number(operand2), operator);
        previousDisplay.textContent = String(result) + e.target.textContent;
        currentDisplay.textContent = '';
    } else {
        previousDisplay.textContent += currentDisplay.textContent + e.target.textContent;
        currentDisplay.textContent = '';
    }
}

const equal = document.getElementById('equals');
equal.addEventListener('click', evaluate);

function evaluate(e) {
    if ((previousDisplay.textContent+currentDisplay.textContent).slice(-1) === '+' || (previousDisplay.textContent+currentDisplay.textContent).slice(-1) === '−' || (previousDisplay.textContent+currentDisplay.textContent).slice(-1) === '×' || (previousDisplay.textContent+currentDisplay.textContent).slice(-1) === '÷') {
        alert('Enter a number after an operator before evaluating!');
    } else {
        let finalExpression = previousDisplay.textContent + currentDisplay.textContent;
        for (let i = 0; i < finalExpression.length; i++) {
            if (finalExpression[i] == '+' || finalExpression[i] == '−' || finalExpression[i] == '×' || finalExpression[i] == '÷') {
                operand1 = finalExpression.slice(0, i);
                operator = finalExpression[i];
                operand2 = finalExpression.slice(i + 1);
            }
        }
        result = operate(Number(operand1), Number(operand2), operator);
        previousDisplay.textContent = '';
        currentDisplay.textContent = result;
    }
}

const clearAll = document.getElementById('clear');
clearAll.addEventListener('click', clearEverything);

function clearEverything() {
    previousDisplay.textContent = '';
    currentDisplay.textContent = '0';
    operand1 = '';
    operand2 = '';
    operator = '';
    result = '';
}

const backspace = document.getElementById('backspace');
backspace.addEventListener('click', deleteLastEntry);

function deleteLastEntry() {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
}