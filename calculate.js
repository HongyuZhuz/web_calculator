const calculator = document.querySelector('.calculator')
const keys = calculator.querySelector('.calculator__keys')
const display = document.querySelector('.calculator__display')

const calculate = (n1,operator, n2) =>{
    let result = ''

    if(operator === 'add'){
        result = parseFloat(n1)+parseFloat(n2)
    }else if (operator === 'subtract'){
        result = parseFloat(n1)-parseFloat(n2)
    }else if (operator === 'multiply'){
        result = parseFloat(n1)*parseFloat(n2)
    }else if (operator === 'divide'){
        result = parseFloat(n1)/parseFloat(n2)
    }

    return result
}


keys.addEventListener('click', e=>{
    
    if(e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action
        const keyContent = key.textContent
        const displayedNum = display.textContent

        const previousKeyType = calculator.dataset.previousKeyType

        //// Remove is-depressed class from all keys
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))

        

        if(!action){ //if press the number button
            if(displayedNum ==='0' || previousKeyType === 'operator'){
                display.textContent = keyContent; //reset the display number
                calculator.dataset.previousKeyType = ''; // Clear the previousKeyType
            }
            else{
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number'
        };

        if(//if press the operator button
            action ==='add'||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
            ){
                const firstValue = calculator.dataset.firstValue
                const operator = calculator.dataset.operator
                const secondValue = displayedNum

                if(firstValue && operator && previousKeyType !== 'operator' &&previousKeyType !== 'calculate'){
                    const calcValue = calculate(firstValue,operator,secondValue)
                    display.textContent = calcValue
                    calculator.dataset.firstValue = calcValue
                }else{
                    calculator.dataset.firstValue = displayedNum
                }
                key.classList.add('is-depressed')

                calculator.dataset.previousKeyType = 'operator'
                calculator.dataset.operator = action // save the operation key
                console.log(calculator.dataset)
            };
        if (action === 'decimal'){//if press the decimal button
            
            if (previousKeyType === 'operator'){
                display.textContent = '0.'
            }else if(!displayedNum.includes('.')){
                display.textContent = displayedNum + '.'
            }
            calculator.dataset.previousKeyType = 'decimal'
            
        };
        
        if(action === 'clear'){//if press the AC button
            calculator.dataset.previousKeyType = 'clear'
            console.log('clear key!')
        };

        if(action ==='calculate'){//if press the calculate button

            calculator.dataset.previousKeyType = 'calculate'
            const firstValue = calculator.dataset.firstValue;
            const secondValue = displayedNum;
            const operator = calculator.dataset.operator;

            display.textContent = calculate(firstValue,operator, secondValue);
        }
    };
});

