let operator;
let num1 = '';
let num2 = '';
const digit = document.querySelectorAll('.digit');
digit.forEach(digitListener => digitListener.addEventListener('click', addDigit));
const operateSelect = document.querySelectorAll('.operator');
operateSelect.forEach(operatorListener => operatorListener.addEventListener('click', setOperator));
const equals = document.querySelector('.equals');
equals.addEventListener('click', displayNumber);
const resultText = document.querySelector('.result-text');
const clear = document.querySelector('.clear');
clear.addEventListener('click', clearInput);
let result = '';

function add(a, b){
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, num1, num2) {
    if(operator == '+') {
        return add(num1, num2);
    } else if(operator == '-') {
        return subtract(num1, num2);
    } else if(operator == 'x') {
        return multiply(num1, num2);
    } else if(operator == '/') {
        return divide(num1, num2);
    }
}

function addDigit() {
    let previousText = `${num1} ${operator}`
    if(!operator) {
        num1 += this.id;
        resultText.textContent = num1;
        return num1;
    } else if(operator) {
        num2 += this.id;
        let newText = ` ${num2}`;
        resultText.textContent = previousText + newText;
        return num2;
    }
}

function setOperator() {
    if(!operator) {
        operator = this.id;
        resultText.textContent = `${num1} ${operator}`;
    } else if(operator && num1 && num2) {
        operator = this.id;
        resultText.textContent = `${result} ${operator}`;
        displayNumber()
    } else {
        operator = this.id
        resultText.textContent = `${result} ${operator}`
    }
}

function displayNumber() {
    if(operator && num1 && num2) {
        num1 = Number.parseInt(num1);
        num2 = Number.parseInt(num2);
        result = operate(operator, num1, num2);
        resultText.textContent = result;
        num1 = result;
        num2 = '';
    }
}

function clearInput() {
    resultText.textContent = '0';
    num1 = '';
    num2 = ''
    result = ''
    operator = ''
}