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
        if(key.textContent!=='CE'){
            Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
        }
        

        if (action!=='clear'){
            const clearButton = calculator.querySelector('[data-action=clear]')//为什么不在全局定义？
            clearButton.textContent = 'CE'
        }

        

        if(!action){ //if press the number button
            if(displayedNum ==='0' || previousKeyType === 'operator'){
                display.textContent = keyContent //reset the display number
            }else if (previousKeyType ==='calculate'){
                console.log("reset")
                display.textContent = keyContent
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue=''
                calculator.dataset.operator=''
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

                if(firstValue && operator && previousKeyType !=='operator' &&previousKeyType!=='calculate'){
                    
                    const calcValue = calculate(firstValue,operator,secondValue)
                    console.log(calculator.dataset)
                    display.textContent = calcValue
                    calculator.dataset.firstValue = calcValue
                }else{
                    
                    calculator.dataset.firstValue = displayedNum
                }
                calculator.dataset.previousKeyType = 'operator'
                key.classList.add('is-depressed')

                
                calculator.dataset.operator = action // save the operation key
                
            };
        if (action === 'decimal'){//if press the decimal button

            if (previousKeyType ==='operator'){
                display.textContent = '0.'
            }
            else if(previousKeyType==='calculate'){
                display.textContent = '0.'
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue=''
                calculator.dataset.operator=''
            }else if (!displayedNum.includes('.')){
                display.textContent = displayedNum + '.' 
            }
            calculator.dataset.previousKeyType = 'decimal'
            
        };
        
        if(action === 'clear'){//if press the AC button
            if (key.textContent === 'AC'){
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue=''
                calculator.dataset.operator=''
                calculator.dataset.previousKeyType=''
            }else if(previousKeyType==='calculate'){
                calculator.dataset.firstValue = 0
                key.textContent = 'AC'
                console.log(calculator.dataset)
            }
            else{
                key.textContent = 'AC'
            }
            display.textContent = 0
            calculator.dataset.previousKeyType = 'clear'
        };

        if(action ==='calculate'){//if press the calculate button

            
            let firstValue = calculator.dataset.firstValue;
            let secondValue = displayedNum;
            const operator = calculator.dataset.operator;
            

            if(firstValue){//only if the first value exist(the operator button is clicked), the calculating process will happen
                if(previousKeyType === "calculate"||previousKeyType ==='clear'){
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                display.textContent = calculate(firstValue,operator, secondValue)
            }

            //set modValue attribute to remember the secondValue
            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'

            console.log(calculator.dataset)
        }
    };
});

