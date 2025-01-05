document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('displayer');
    let currentInput = "";
    let operator = "";
    let prevInput = "";

    function handleDigit(digit) {
        currentInput += digit;
        display.value = currentInput;
    }

    function handleOperator(op) {
        if (currentInput === "") return;
        if (prevInput !== "") {
        calculate();
        }
        operator = op;
        prevInput = currentInput;
        currentInput = "";
    }

    function clearDisplay() {
        currentInput = "";
        prevInput = ""; 
        operator = "";
        display.value = "";
    }

    //ACTIVE-OPERATOR CODE

    const operatorButtons = document.querySelectorAll('.operator'); 
    const digitButtons = document.querySelectorAll('.digit');
    let activeOperator = null;

    function setActiveOperator(button) {
        if (activeOperator) { 
            activeOperator.classList.remove('operator-active'); 
        } else {
            activeOperator = button; activeOperator.classList.add('operator-active');
        }
    }

    operatorButtons.forEach(button => { 
        button.addEventListener('click', () => { setActiveOperator(button); }); 
    });

    digitButtons.forEach(button => { 
        button.addEventListener('click', () => { 
            if (activeOperator) { 
                activeOperator.classList.remove('operator-active'); 
                activeOperator = null; 
            } 
        }); 
    });

    function calculate() {
        if (prevInput === "" || currentInput === "") return;
        let result;
        const prev = parseFloat(prevInput);
        const current = parseFloat(currentInput);
    
        switch (operator) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "*":
                result = prev * current;
                break;
            case "/":
                if (current === 0) {
                    alert("Error: Cannot divide by Zero!");
                    display.value = "";
                    return;
                }
                result = prev / current;
                break;       
        }
        currentInput = result.toString();
        operator = "";
        prevInput = "";
        display.value = currentInput;
    }

    document.getElementById("seven").addEventListener('click', () => handleDigit("7"));
    document.getElementById("eight").addEventListener('click', () => handleDigit("8"));
    document.getElementById("nine").addEventListener('click', () => handleDigit("9"));
    document.getElementById("four").addEventListener('click', () => handleDigit("4"));
    document.getElementById("five").addEventListener('click', () => handleDigit("5"));
    document.getElementById("six").addEventListener('click', () => handleDigit("6"));
    document.getElementById("one").addEventListener('click', () => handleDigit("1"));
    document.getElementById("two").addEventListener('click', () => handleDigit("2"));
    document.getElementById("three").addEventListener('click', () => handleDigit("3"));
    document.getElementById("zero").addEventListener('click', () => handleDigit("0"));
    document.getElementById("doubleZ").addEventListener('click', () => handleDigit("00"));
    document.getElementById("decimal").addEventListener('click', () => handleDigit("."));

    document.getElementById('addition').addEventListener('click', () => handleOperator("+"));
    document.getElementById('minus').addEventListener('click', () => handleOperator("-"));
    document.getElementById('multiply').addEventListener('click', () => handleOperator("*"));
    document.getElementById('divide').addEventListener('click', () => handleOperator("/"));

    document.getElementById('clear').addEventListener('click', clearDisplay);
    document.getElementById('equalBtn').addEventListener('click', calculate);

    document.addEventListener('keydown', (e) => {
        const key = e.key;
      
        if ('0123456789'.includes(key)) {
            handleDigit(key);
        } else if (key === ".") {
            handleDigit(".")
        } else if (key === '+') {
            handleOperator('+');
        } else if (key === '-') {
            handleOperator('-');
        } else if (key === '*') {
            handleOperator('*');
        } else if (key === '/') {
            handleOperator('/');
        } else if (key === 'Enter' || key === '=') {
            calculate(); // Handle equals
        } else if (key === 'Backspace' || key === 'Escape') {
            clearDisplay(); // Clear on Backspace or Escape
        }
      });


})

