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
/*
Define variables for:
-First number of calculation
-Second number of calculation
-Operator to be used for calculation
-Result of calculation
Also adds event listeners for the digits (numbers, backspace and .), equals,
and clear buttons
*/

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

//Note that num1 and num2 are the numbers used in each calculation
//e.g. 1 + 2 would be num1 + num2
//num1 and num2 are handled as strings to allow decimals, backspacing and larger numbers
function addDigit() { //Handles all result text & rules for using calculator
    let previousText = `${num1} ${operator}` //For preserving text before 2nd number
    if(!operator) { //If no operator, deals with num1
        if(this.id == 'backspace' && num1) { //Ensures if 'backspace' was hit, 1st number has content in it
            num1 = num1.slice(0, num1.length - 1);
        } else if(this.id != 'backspace') {
            if(this.id == '.' && !num1.includes('.')){ //Ensures you can only add 1 period
                num1 += this.id;
            } else if(this.id != '.') {
                num1 += this.id;
            }
        }
        //Prevents result text from disappearing if num1 is backspaced to empty string
        if(num1) {
            resultText.textContent = num1;
        } else {
            resultText.textContent = '0';
        }
    } else if(operator) { //Deals with num2
        if(this.id == 'backspace' && num2) { //Backspaces from num2 string
            num2 = num2.slice(0, num2.length - 1);
        } else if(this.id == 'backspace'){ //If there is no num2, removes the operator
            operator = '';
            previousText = `${num1} ${operator}`
        } else {
            if(this.id == '.' && !num2.includes('.')) { //Ensures you can only add 1 period
                num2 += this.id;
            } else if(this.id != '.') {
                num2 += this.id;
            }
        }
    //These 2 lines add continuous adding to num2 while preserving the text before the operator
    let newText = ` ${num2}`;
    resultText.textContent = previousText + newText;
    }
}

function setOperator() {
    if(num1 && num1 != '-' && num2 != '-') { //Prevents adding two negative signs to num1 and num2
        if(!operator) { //If no calculation has been done yet
            operator = this.id;
            resultText.textContent = `${num1} ${operator}`;
        } else if(operator && num1 && num2) { //Checks if calculation written out with multiple operators
            displayNumber() //Calculates current operation before adding new operator
            operator = this.id;
            resultText.textContent = `${result} ${operator}`;
        } else if(operator && num1 && !num2 && this.id == '-') { //Checks if num2 can accept a negative sign
            num2 += this.id;
            resultText.textContent = `${num1} ${operator} ${num2}`;
        }
    } else if(!num1 && this.id == '-') { //If no number input has been entered and '-' is hit, make it a negative number
        num1 += this.id;
        resultText.textContent = `${num1}`;
    }
}

function displayNumber() {
    if(operator && num1 && num2) { //Makes sure there is input to use = button
        if(operator == '/' && num2 == '0') { //Prevents division by zero
            resultText.textContent = 'Nice try :)';
            num1 = ''
            num2 = ''
            operator = '';
        } else {
            num1 = Number.parseFloat(num1);
            num2 = Number.parseFloat(num2);
            //nums stored as strings so convert to floating point to allow operation
            result = operate(operator, num1, num2);
            resultText.textContent = result;
            num1 = `${result}`; //Sets num1 to string of result to allow further operation
            num2 = '';
            operator = '';
        }
    }
}

function clearInput() {
    resultText.textContent = '0';
    num1 = '';
    num2 = ''
    result = ''
    operator = ''
}