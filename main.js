let firstOperand = ""
let secondOperand = ""
let currentOperation = null
let shouldResetScreen = false

const numberButton = document.querySelectorAll("[data-number]")
const operatorButton = document.querySelectorAll("[data-operator]")
const equalButton = document.getElementById("equalButton")
const clearButton = document.getElementById("clearButton")
const deleteButton = document.getElementById("deleteButton")
const pointButton = document.getElementById("pointButton")
const lastOperationScreen = document.getElementById("lastOperationScreen")
const currentOperationScreen = document.getElementById("currentOperationScreen")

window.addEventListener("keydown", handleKeyboardInput)
deleteButton.addEventListener("click", deleteNumber)
clearButton.addEventListener("click", clear)
pointButton.addEventListener("click", appendPoint)
equalButton.addEventListener("click", evaluate)

numberButton.forEach((button) => 
    button.addEventListener("click", () => appendNumber(button.textContent))
)

operatorButton.forEach((button) =>
    button.addEventListener("click", () => setOperation(button.textContent))
)

function appendNumber(number) {
    if (currentOperationScreen.textContent === "0" || shouldResetScreen) resetScreen()
    currentOperationScreen.textContent += number
}

function resetScreen() {
    currentOperationScreen.textContent = ""
    shouldResetScreen = false
}

function clear() {
    currentOperationScreen.textContent = "0"
    lastOperationScreen.textContent = ""
    firstOperand = ""
    secondOperand = ""
    currentOperation = null
}

function appendPoint() {
    if (shouldResetScreen) resetScreen()
    if (currentOperationScreen.textContent === "") currentOperationScreen.textContent = "0"
    currentOperationScreen.textContent += "."
}

function deleteNumber() {
    currentOperationScreen.textContent = currentOperationScreen.textContent.toString().slice(0, -1);
}

function setOperation(operator) {
    if (currentOperation !== null) evaluate()
    firstOperand = currentOperationScreen.textContent
    currentOperation = operator
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`
    shouldResetScreen = true
    currentOperationScreen.textContent = ""
}

function evaluate() {
    if (currentOperation === null || shouldResetScreen) return
    if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
        alert("You can't divide by 0!")
        return
    }
    secondOperand = currentOperationScreen.textContent
    currentOperationScreen.textContent = roundResult(operate(currentOperation, firstOperand, secondOperand))
    lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
    currentOperation = null
}

function roundResult(number) {
    return Math.round(number*1000) / 1000
}

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === ".") appendPoint()
    if (e.key === "=" || e.key === "Enter") evaluate()
    if (e.key === "backspace") deleteNumber()
    if (e.key === "Escape") clear()
    if (e.key === "+" || e.key === "%" || e.key === "*" || e.key === "/") setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
    if (keyboardOperator === '%') return '%'
}

function add(a, b) {
    return a + b
}

function substract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b 
}

function modulo(a, b) {
    return a % b
}

function operate(operator, a, b) {
    a = Number(a)
    b = Number(b)
    switch(operator) {
        case "+":
            return add(a, b)
        case "-":
            return substract(a, b)
        case "x":
            return multiply(a, b)
        case "%":
            if (b === 0) return null
            else return modulo(a, b)
        case "÷":
            if (b === 0) return null
            else return divide(a, b)

    }
}