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
const parenthesesArray = [];

let equationLog = [];

let equalBtnElement = {};

let inputList = [];
let lastInput;
let lastOp;
let operand1 = '';
let operand2 = '';
let operator = '';
let currentEval = [];
let currentTotal = '';
let parentheses = false;
let decimal = false;
let longEq = false;


undoLast = () => {
    lastInput = inputList[inputList.length - 1];
    lastOp = lastInput.op;
    //if last op is 1 or 2 displayValue.textContent
    //.slice(indexOf(lastInput.textContext))
    //recalc and reset values 
    //if opr remove opr and slice index of '' display
    //recalc and reset
    //if func remove func text recalc and reset
}


handleInput = (input) => {
    const newEq = document.createElement("li");
    const inputText = input.textContent


    calculate = (input) => {
        if (input) { //if function btn
            let opd = !operand2 ? operand1 : operand2;
            let clrUndo = false;
            switch (input) {
                case functionBtns[0]: //percent
                    opd = opd / 100;
                    break;
                case functionBtns[1]: //square
                    opd = opd * opd;
                    break;
                case functionBtns[2]: //sqr-rt
                    opd = Math.sqrt(opd);
                    break;
                case functionBtns[3]: //undo
                    undoLast();
                    clrUndo = true;
                    break;
                case functionBtns[4]: //clear
                    operand1 = '';
                    operand2 = '';
                    operator = '';
                    equationLog.length = 0;
                    equationLogElement.textContent = '';
                    currentTotal = '';
                    displayValue.textContent = currentTotal;
                    currentTotalElement.textContent = '';
                    clrUndo = true;
                    break;
                default:
                    break;
            }
            if (clrUndo) return;
            else {
                currentTotal = opd;
                operand1 = opd;
                displayValue.textContent += inputText;
                currentTotalElement.textContent = currentTotal;
            }
        } else {
            if (operator === '/' && operand2 === '0') {
                currentTotalElement.textContent = 'CPU melted'
                return
            } else {
                currentTotal = eval(`${operand1}` + `${operator}` + `${operand2}`);
                currentTotalElement.textContent = currentTotal;
                return currentTotal;
            }
        }
    }


    if (!operand2) {
        if (!operator) {
            if (numpadBtns.includes(input)) {
                if (input === numpadBtns[0]) {
                    if (decimal) {
                        return
                    }
                    decimal = true
                } 
                displayValue.textContent += inputText;
                operand1 += inputText
                calculate();
                lastOp = 'op1';
            } else if (parenthesesArray.includes(input) && false) {
                if (input === parenthesesArray[0]) {
                    displayValue.textContent += inputText;
                    parentheses = true;
                } else {
                    displayValue.textContent += inputText;
                    parentheses = false;
                }
            } else if (operatorBtns.includes(input)) {
                displayValue.textContent += '  ' + inputText + '  ';
                operator = inputText;
                lastOp = 'opr';
            } else if (functionBtns.includes(input)) {
                calculate(input);
                lastOp = 'func';
            }
        } else {
            if (numpadBtns.includes(input)) {
                displayValue.textContent += inputText;
                operand2 += inputText;
                calculate();
                lastOp = 'op2';
            } else if (operatorBtns.includes(input)) {
                displayValue.textContent += '  ' + inputText + '  ';
                operator = inputText;
                lastOp = 'opr';
            } else if (functionBtns.includes(input)) {
                calculate(input);
                lastOp = 'func';
            }
        }
    } else {
        if (numpadBtns.includes(input)) {
            displayValue.textContent += inputText;
            operand2 += inputText;
            calculate();
            lastOp = 'op2';
        } else if (operatorBtns.includes(input)) {
            calculate();
            operand1 = currentTotal;
            operand2 = '';
            longEq = true;
            displayValue.textContent += '  ' + inputText + '  ';
            operator = inputText;
            lastOp = 'opr';
        } else if (functionBtns.includes(input)) {
            calculate(input);
            operand1 = currentTotal;
            operand2 = '';
        } else if (input == equalBtnElement) {
            calculate()
            newEq.textContent = displayValue.textContent + ' = ' + `${currentTotal}`;
            if (equationLog.length < 3) {
                equationLogElement.append(newEq);
                equationLog.push(newEq.textContent);
            } else {
                equationLogElement.removeChild(equationLogElement.childNodes[0])
                equationLogElement.append(newEq);
                equationLog.push(newEq.textContent);
            }
            operand1 = currentTotal;
            operand2 = '';
            operator = '';
            lastOp = 'eql';
            displayValue.textContent = operand1;
        }
    }
    inputList.push({
        obj: input,
        op: lastOp,
    })
}


createButtons = () => {
    for (let i = 0; i < 11; i++) {
        const newBtn = document.createElement("button");
        if (i === 0) {
            newBtn.textContent = '.';
            newBtn.id = 'dot-btn';
            newBtn.style.gridArea = 'dotbtn';
        } else {
            newBtn.textContent = i - 1;
            newBtn.id = 'numpad' + `${i - 1}`;
            newBtn.style.gridArea = `num${i - 1}`
        }
        newBtn.classList.add('square_btn');
        numpadBtns.push(newBtn);
        numpad.append(newBtn);
        newBtn.addEventListener('click', () => {
            handleInput(newBtn);
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
                newBtn.id = 'po-btn';
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
        if (i === 5 || i === 6) {
            parenthesesArray.push(newBtn);
        } else if (i === 4) {
            equalBtnElement = newBtn;
        } else {
            operatorBtns.push(newBtn);
        }
        operators.append(newBtn);
        newBtn.addEventListener('click', () => {
            handleInput(newBtn);
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
            handleInput(newBtn);
        });
    } //function butttons
};

createButtons();