document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0';
    let operator = null;
    let previousInput = null;
    let resetDisplay = false; // Flag to clear display after an operation or equals

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function handleNumberClick(number) {
        if (resetDisplay) {
            currentInput = number;
            resetDisplay = false;
        } else {
            if (currentInput === '0' && number !== '.') {
                currentInput = number;
            } else {
                currentInput += number;
            }
        }
        updateDisplay();
    }

    function handleOperatorClick(nextOperator) {
        if (previousInput === null) {
            previousInput = parseFloat(currentInput);
        } else if (operator) {
            const result = calculate();
            currentInput = String(result);
            previousInput = result;
            updateDisplay();
        }
        operator = nextOperator;
        resetDisplay = true;
    }

    function handleEqualsClick() {
        if (operator === null || previousInput === null) return; // Do nothing if no operation pending

        const result = calculate();
        currentInput = String(result);
        operator = null;
        previousInput = null;
        resetDisplay = true; // Prepare for new input after result
        updateDisplay();
    }

    function calculate() {
        const current = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = previousInput + current;
                break;
            case '-':
                result = previousInput - current;
                break;
            case '*':
                result = previousInput * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Cannot divide by zero!"); // Simple error handling
                    return 0; // Or handle as NaN, etc.
                }
                result = previousInput / current;
                break;
            default:
                return current; // If no operator, just return current input
        }
        return result;
    }

    function handleClearClick() {
        currentInput = '0';
        operator = null;
        previousInput = null;
        resetDisplay = false;
        updateDisplay();
    }

    // Add event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonId = button.id;
            const buttonText = button.textContent;

            if (button.classList.contains('operator')) {
                handleOperatorClick(buttonText);
            } else if (button.classList.contains('clear')) {
                handleClearClick();
            } else if (button.classList.contains('equals')) {
                handleEqualsClick();
            } else { // It's a number or decimal
                handleNumberClick(buttonText);
            }
        });
    });

    updateDisplay(); // Initialize display with '0'
});