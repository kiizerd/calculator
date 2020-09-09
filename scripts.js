const elementsNodeList = document.querySelectorAll(".scripted");
const elementsArray = Array.from(elementsNodeList);

const calculator = elementsArray[0];
const display = elementsArray[1];
const functions = elementsArray[5];
const numpad = elementsArray[2];
const operators = elementsArray[3];

const numpadBtns = [];
const operatorBtns = [];
const functionBtns = [];

createButtons = () => {
    for (let i = 0; i < 10; i++) {
        const newBtn = document.createElement("button");
        newBtn.textContent = i;
        newBtn.classList.add('square_btn');
        newBtn.id = 'numpad' +  `${i}`;
        newBtn.style.gridArea = `num${i}`
        numpadBtns.push(newBtn);
        numpad.append(newBtn);
    }

    for (let i = 0; i < 6; i++) {
        const newBtn = document.createElement("button");
        newBtn.classList.add('square_btn');
        switch (i) {
            case 0:
                newBtn.id = 'dot-btn';
                newBtn.textContent = '.';
                newBtn.style.gridArea = 'dotbtn'; 
                break;
            case 1:
                newBtn.id = 'plus-btn';
                newBtn.textContent = '+';
                newBtn.style.gridArea = 'addbtn'; 
                break;
            case 2:
                newBtn.id = 'minus-btn';
                newBtn.textContent = '-';
                newBtn.style.gridArea = 'minbtn'; 
                break;
            case 3:
                newBtn.id = 'times-btn';
                newBtn.textContent = '*';
                newBtn.style.gridArea = 'multbtn'; 
                break;
            case 4:
                newBtn.id = 'divide-btn';
                newBtn.textContent = '/';
                newBtn.style.gridArea = 'divbtn'; 
                break;
            case 5:
                newBtn.id = 'percent-btn';
                newBtn.textContent = '%';
                newBtn.style.gridArea = '=btn'; 
            case 6:
                newBtn.id = 'calculate-btn';
                newBtn.textContent = '=';
                newBtn.style.gridArea = '=btn';    
            default:
                break;
        }
        operatorBtns.push(newBtn);
        operators.append(newBtn);
    }
    }

createButtons();