let operator;
let num1 = '';
let num2 = '';
let result = '';
const digit = document.querySelectorAll('.digit');
digit.forEach(digitListener => digitListener.addEventListener('click', addDigit));
const operateSelect = document.querySelectorAll('.operator');
operateSelect.forEach(operatorListener => operatorListener.addEventListener('click', setOperator));
const equals = document.querySelector('.equals');
equals.addEventListener('click', displayNumber);
const resultText = document.querySelector('.result-text');
const clear = document.querySelector('.clear');
clear.addEventListener('click', clearInput);

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
        if(this.id == 'backspace' && num1) {
            num1 = num1.slice(0, num1.length - 1);
        } else {
            if(this.id == '.' && !num1.includes('.')){
                num1 += this.id;
            } else if(this.id != '.' && this.id != 'backspace') {
                num1 += this.id;
            }
    }
    if(num1) {
        resultText.textContent = num1;
    } else {
        resultText.textContent = '0';
    }
    } else if(operator) {
        if(this.id == 'backspace' && num2) {
            num2 = num2.slice(0, num2.length - 1);
        } else if(this.id == 'backspace'){
            operator = '';
            previousText = `${num1} ${operator}`
        } else {
            if(this.id == '.' && !num2.includes('.')) {
                num2 += this.id;
            } else if(this.id != '.') {
                num2 += this.id;
            }
        }
    let newText = ` ${num2}`;
    resultText.textContent = previousText + newText;
    }
}

function setOperator() {
    if(num1 && num1 != '-') {
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
    } else if(!num1 && this.id == '-') {
        num1 += this.id;
        resultText.textContent = `${num1}`;
    }
}

function displayNumber() {
    if(operator && num1 && num2) {
        num1 = Number.parseFloat(num1);
        num2 = Number.parseFloat(num2);
        result = operate(operator, num1, num2);
        resultText.textContent = result;
        num1 = `${result}`;
        num2 = '';
        operator = '';
    }
}

function clearInput() {
    resultText.textContent = '0';
    num1 = '';
    num2 = ''
    result = ''
    operator = ''
}