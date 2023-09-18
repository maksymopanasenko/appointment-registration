function validateInput(input, minValue, maxValue, errorMessage) {
    if (!input.value || !Number.isInteger(+input.value)) {
        input.value = "Введіть числове значення";
        input.style.border = '1px solid red';
        return true;
    } else if (input.value < minValue || input.value > maxValue) {
        input.value = errorMessage;
        input.style.border = '1px solid red';
        return true;
    } else {
        input.style.border = '1px solid #ced4da';
        return false;
    }
}

function isAgeValid(input) {
    return validateInput(input, 5, 100, "Тільки пацієнти у віці 5-100 років");
}

function isPressureValid(input) {
    return validateInput(input, 50, 160, "Введіть значення в межах 50-160");
}

function isIndexValid(input) {
    return validateInput(input, 10, 50, "Введіть значення в межах 10-50");
}


export {isAgeValid, isPressureValid, isIndexValid};