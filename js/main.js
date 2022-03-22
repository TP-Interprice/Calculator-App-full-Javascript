let numbers = document.querySelectorAll('.num')
let sign = document.querySelectorAll('.sign')
let display = document.querySelector('input')
let dot = document.querySelector('.dot')
let equal = document.querySelector('.equal')
let clearButton = document.querySelectorAll('.remove-element')[0]
let removeButton = document.querySelectorAll('.remove-element')[1]
let operator
let bool = true

function concatValue (char) {
    display.value = display.value + char
}
function clearElement() {
    display.value = 0
}
function removeElement() {
    if(display.value.length == 1){
        display.value = 0
    }
    else {
        let clear = display.value.split('')
        clear.pop()
        display.value = clear.join('')
    }    
}
for(let num of sign){
    let string = ''
    num.onclick = (event) => {
        string = display.value
        if(string != '' && check(string)){
            if(string == '0') {
                string = 0
            }
            else {
                concatValue(event.target.textContent)
                operator = event.target.textContent
                bool = true
            }
        }
        else {
            if(string != '' && inspect(string)) {
                removeElement()
                concatValue(event.target.textContent)
                operator = event.target.textContent
            }
        }
    }
}

for(let num of numbers){
    num.onclick = (event) => {
        if(bool) {
            if(display.value == '0') {
                display.value = null
                concatValue(event.target.textContent)
            }
            else if(event.target.textContent != '0'){
                concatValue(event.target.textContent)
            }
            else if(display.value != ''){
                concatValue(event.target.textContent)
            }
        }
        else {
            bool = true
            display.value = null
            concatValue(event.target.textContent)
        }
    }
}

function calculate () {
    let string = display.value
    if(!check(string)){
        bool = false
	    if(operator === '✕') {
            let nums = display.value.split('✕')
            display.value = nums[0] * nums[1]
	    }
        else if(operator === '÷') {
            let nums = display.value.split('÷')
            display.value = nums[0] / nums[1]
        } else {
            display.value = eval(display.value)
	    }
    }
    else alert('Amal kiritmadingiz!')
}

function check(str) {
    if(str.indexOf('+') != -1 || str.indexOf('-') != -1 || str.indexOf('÷') != -1 || str.indexOf('✕') != -1){
        return false
    }
    else return true
}

function inspect(str){
    if(str[str.length-1] == '+' || str[str.length-1] == '-' || str[str.length-1] == '÷' || str[str.length-1] == '✕'){
        return true
    }
    else return false
}

dot.onclick = (event) => {
    if(display.value != '' && !display.value.includes('.')){
        concatValue('.')
    }
    else {
        if(display.value.includes('+') || display.value.includes('-') || display.value.includes('÷') || display.value.includes('✕')) {
            concatValue('.')
        }
    }
}
removeButton.onclick = removeElement
clearButton.onclick = clearElement
equal.onclick = calculate