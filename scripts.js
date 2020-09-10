const elementsNodeList = document.querySelectorAll(".scripted");
const elementsArray = Array.from(elementsNodeList);
const displayValue = document.querySelector('#display-value');
const equationLogElement = document.querySelector('#equation-log');
const currentTotalElement = document.querySelector('#current-total');

const calculator = elementsArray[0];
const display = elementsArray[1];
const functions = elementsArray[2];
const numpad = elementsArray[3];
const operators = elementsArray[4];

const numpadBtns = [];
const operatorBtns = [];
const functionBtns = [];
const equationLog = [];

let lastInput;
let operand1 = '';
let operand2 = '';
let operator = '';
let displayString = ''; 
let currentTotal = '';
let perentheses = false;

updateLog = () => {
    const newEq = document.createElement("li");
    newEq.textContent = (`${operand1}  ` + `  ${operator}  ` + 
    `  ${operand2}  ` + '  =  ' + `  ${currentTotal}`);
    if (equationLog.length >= 3) {

    }
    equationLogElement.append(newEq);
    equationLog.push(newEq);
};

calculate = () => {
    let btnString = lastInput.textContent;
    let btnID = lastInput.id;
    switch (operator) {
        case '+':
            return (+operand1) + (+operand2);
        case '-':
            return +operand1 - +operand2;
        case '*':
            return +operand1 * +operand2;
        case '/':
            return +operand1 / +operand2;
        case '%':
            return (operand1 / 100)
        case decodeURI('%C2%B2'):
            return operand1 * operand1;
        default:
            break;
    }
};

buttonFunction = (input) => {
    let btnString = input.textContent;
    let btnID = input.id;
    if (operator && operand1 && operand2) {
        currentTotal = calculate();
        currentTotalElement.textContent = currentTotal;
        switch (btnID) {
            case 'eql-btn':
                updateLog();
                operand1 = undefined;
                operand2 = '';
                operator = '';
                displayValue.textContent = '';
                break;
            case 'add-btn':
                operand1 = currentTotal;
                operator = '+';
                operand2 = '';
                break;
            case 'min-btn':
                operand1 = currentTotal;
                operator = '-';
                operand2 = '';
                break;
            case 'times-btn':
                operand1 = currentTotal;
                operator = '*';
                operand2 = '';
                break;
            case 'divide-btn':
                operator1 = currentTotal;
                operator = '/';
                operand2 = '';
                break;
            default:
                break;
        }
    } else if (operand1) {
        switch (btnID) {
            case 'add-btn':
                operator = '+';
                break;
            case 'minus-btn':
                operator = '-';
                break;
            case 'times-btn':
                operator = '*';
                break;
            case 'divide-btn':
                operator = '/';
                break;
            case 'pc-btn':
                operator = ')';
                break;
            case 'percent-btn':
                operator = '%';
                break;
            case 'square-btn':
                operator = decodeURI('%C2%B2');
                break;
            default:
                break;
        }
        displayValue.textContent += `  ${btnString}  `;
    }
};

updateDisplay = (input) => {
    console.log(input)
    console.log(currentTotal);
    lastInput = input;
    let btnString = input.textContent;
    if (!operand2 && !operator) {
        if (btnString.match(/[0-9]/)) {
            displayValue.textContent += btnString;
            operand1 += btnString;
        } else if (btnString === '(') {
            displayValue.textContent += btnString;
            perentheses = true;
        } else {
            buttonFunction(input);
        }        
    } else if (operator) {
        if (btnString.match(/[0-9]/)) {
            displayValue.textContent += btnString;
            operand2 += btnString;
        } else if (btnString === '(') {
            displayValue.textContent += btnString;
            perentheses = true;
        } else {
            buttonFunction(input);
        }
        currentTotalElement.textContent = calculate()
    }

};


createButtons = () => {
    for (let i = 0; i < 11; i++) {
        const newBtn = document.createElement("button");
        if ( i === 0) {
            newBtn.textContent = '.';
            newBtn.id = 'dot-btn';
            newBtn.style.gridArea = 'dotbtn';
        } else {
            newBtn.textContent = i - 1;
            newBtn.id = 'numpad' +  `${i - 1}`;
            newBtn.style.gridArea = `num${i - 1}`
        }
        newBtn.classList.add('square_btn');
        numpadBtns.push(newBtn);
        numpad.append(newBtn);
        newBtn.addEventListener('click', () => {
            updateDisplay(newBtn);
        });
    } //num buttons
    for (let i = 0; i < 7; i++) {
        const newBtn = document.createElement("button");
        newBtn.classList.add('square_btn');
        switch (i) {
            case 0:
                newBtn.id = 'divide-btn';
                newBtn.textContent = '/';
                newBtn.style.gridArea = 'divbtn'; 
                break;
            case 1:
                newBtn.id = 'times-btn';
                newBtn.textContent = '*';
                newBtn.style.gridArea = 'multbtn'; 
                break;
            case 2:
                newBtn.id = 'minus-btn';
                newBtn.textContent = '-';
                newBtn.style.gridArea = 'minbtn'; 
                break;
            case 3:
                newBtn.id = 'add-btn';
                newBtn.textContent = '+';
                newBtn.style.gridArea = 'addbtn';
                break; 
            case 4:
                newBtn.id = 'eql-btn';
                newBtn.textContent = '=';
                newBtn.style.gridArea = 'eqlbtn';
                break;
            case 5:
                newBtn.id ='po-btn';
                newBtn.textContent = '(';
                newBtn.style.gridArea = 'pobtn';
                break;
            case 6:
                newBtn.id = 'pc-btn';
                newBtn.textContent = ')';
                newBtn.style.gridArea = 'pcbtn';    
            default:
                break;
        }
        operatorBtns.push(newBtn);
        operators.append(newBtn);
        newBtn.addEventListener('click', () => {
            updateDisplay(newBtn);
        });
    } //operator buttons
    for (let i = 0; i < 5; i++) {
        const newBtn = document.createElement("button");
        newBtn.classList.add('square_btn');
        switch (i) {
            case 0:
                newBtn.id = 'percent-btn';
                newBtn.textContent = '%';
                newBtn.style.gridArea = 'perbtn';
                break;
            case 1:
                newBtn.id = 'square-btn';
                newBtn.textContent = 'x' + decodeURI('%C2%B2');
                newBtn.style.grid = 'sqr-btn';
                break;
            case 2:
                newBtn.id = 'sqr-rt-btn';
                newBtn.textContent = decodeURI('%E2%88%9A');
                newBtn.style.grid = 'srtbtn';
                break;
            case 3:
                newBtn.id = 'undo-btn';
                newBtn.textContent = decodeURI('%E2%86%90');
                newBtn.style.grid = 'undobtn';
                break;
            case 4:
                newBtn.id = 'clr-btn';
                newBtn.textContent = 'C';
                newBtn.style.grid = 'clrbtn';
                break;        
            default:
                break;
        }
        functionBtns.push(newBtn);
        functions.append(newBtn);
        newBtn.addEventListener('click', () => {
            updateDisplay(newBtn);
        });
    } //function butttons

};

createButtons();