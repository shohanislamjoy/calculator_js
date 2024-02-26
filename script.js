document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('input');
    const numbers = document.querySelectorAll('.number:not(.dull)');
    const operators = document.querySelectorAll('.symbol:not(.action)');
    const clear = document.getElementById('clear');
    const equals = document.getElementById('equals');

    let currentInput = '';

    // Function to update the input field
    function updateInput(value) {
        currentInput += value;
        input.textContent = currentInput;
    }

    // Add event listeners to number buttons
    numbers.forEach(number => {
        number.addEventListener('click', function() {
            updateInput(number.textContent);
        });
    });

    // Add event listeners to operator buttons
    operators.forEach(operator => {
        operator.addEventListener('click', function() {
            if (operator.textContent === '÷') {
                updateInput('/');
            } else {
                updateInput(operator.textContent);
            }
        });
    });

    // Clear input field
    clear.addEventListener('click', function() {
        currentInput = '';
        input.textContent = '';
    });

    // Perform calculation
    equals.addEventListener('click', function() {
        try {
            const result = eval(currentInput);
            input.textContent = result;
            currentInput = result.toString();
        } catch (error) {
            input.textContent = 'Error';
            currentInput = '';
        }
    });

    // Keyboard bindings
    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if (!isNaN(key) || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
            updateInput(key);
        } else if (key === 'Enter') {
            equals.click();
        } else if (key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            input.textContent = currentInput;
        } else if (key === 'Escape') {
            clear.click();
        }
    });
});