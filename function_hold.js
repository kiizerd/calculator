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
            return +operand1 * +operand1;
        default:
            break;
    }
};

buttonFunction = (input) => {
    let btnString = input.textContent;
    let btnID = input.id;
    if (operator && operand1 && operand2) {
        switch (btnID) {
            case 'eql-btn':
                updateLog();
                operand1 = '';
                operand2 = '';
                operator = '';
                displayValue.textContent = '';
                break;
            case 'add-btn':
                break;
            case 'min-btn':
                break;
            case 'times-btn':
                break;
            case 'divide-btn':
                break;
            default:
                break;
        }
    } else if (operand1) {
        switch (btnID) {
            case 'eql-btn':
                updateLog();
                operand1 = '';
                operand2 = '';
                operator = '';
                displayValue.textContent = '';
                break;
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
                currentTotal = calculate();
                currentTotalElement.textContent = currentTotal;
                break;
            default:
                break;
        }
        operator ? displayValue.textContent += `  ${btnString}  `: 0;
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
            parentheses = true;
        } else if (btnString === '.') {
            displayValue.textContent += btnString;
            decimal = true
        } else {
            buttonFunction(input);
        }        
    } else if (operator) {
        if (btnString.match(/[0-9]/)) {
            displayValue.textContent += btnString;
            operand2 += btnString;
        } else if (btnString === '(') {
            displayValue.textContent += btnString;
            parentheses = true;
        } else {
            buttonFunction(input);
        }
        currentTotal = calculate();
        currentTotalElement.textContent = currentTotal;
    }

};