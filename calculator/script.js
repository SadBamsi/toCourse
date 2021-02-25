let calcArea = document.querySelector('.calc-table');
let display = document.querySelector('#display');
let firstMathEl = undefined;
let secondMathEl = undefined;
let operator = undefined;
let result = undefined;

calcArea.addEventListener('click', (e) => {
    let target = e.target;
    
    if (target.classList.contains('number')) {
        display.value === '0' || display.value === 'Error' ? display.value = target.textContent : display.value += Number(target.textContent);
        
    }
    else if (display.value === '0' && target.textContent === '-') {
        display.value = target.textContent;
    }
    else if (target.id === 'decimal') {
        display.value += target.textContent;
    }
    else if ( target.id === 'sqrt' ) {
       display.value = +display.value > 0 ?  Math.sqrt(+display.value) : 'Error';
    }
    else if (target.classList.contains('operator') && target.textContent != '=') {
        firstMathEl = +display.value;
        operator = target.textContent;
        display.value = 0;
    }
    else if (target.classList.contains('number') && operator != undefined) {
        display.value += +target.textContent;
    }
    else if (target.textContent == '=') {
        secondMathEl = +display.value;
        switch (operator) {
            case '+': 
                display.value = +(firstMathEl + secondMathEl).toFixed(5);
                break;
            case '-': 
                display.value = +(firstMathEl - secondMathEl).toFixed(5);
                break;
            case '*': 
                display.value = +(firstMathEl * secondMathEl).toFixed(5);
                break;
            case '/': 
                display.value = +(firstMathEl / secondMathEl).toFixed(5);
                break;
            case 'xn': 
                display.value = +(firstMathEl ** secondMathEl).toFixed(5);
                break;
        }
    } 
    else if ( target.id == 'c' || target.id == 'ce'  ) {
        display.value = 0;
    }
})