let operator;
let num1 = '';
let num2 = '';
const digit = document.querySelectorAll('.digit');
digit.forEach(digitListener => digitListener.addEventListener('click', addDigit));
const operateSelect = document.querySelectorAll('.operator');
operateSelect.forEach(operatorListener => operatorListener.addEventListener('click', setOperator));
const equals = document.querySelector('.equals');
equals.addEventListener('click', displayNumber);

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
    const resultText = document.querySelector('.result-text');
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
        const resultText = document.querySelector('.result-text');
        resultText.textContent = `${num1} ${operator}`;
    }
}

function displayNumber() {
    num1 = Number.parseInt(num1);
    num2 = Number.parseInt(num2);
    let result = operate(operator, num1, num2);
    alert(result);
}