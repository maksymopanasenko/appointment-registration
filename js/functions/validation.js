function validateInput(input, err, minValue, maxValue, errorMessage) {
    if (!input.value || !Number.isInteger(+input.value) || input.value < 0) {
        err.innerText = "Введіть числове значення більше нуля";
        err.classList.remove('d-none');
        input.style.border = '1px solid red';
        return true;
    } else if (input.value < minValue || input.value > maxValue) {
        err.innerText = errorMessage;
        err.classList.remove('d-none');
        input.style.border = '1px solid red';
        return true;
    } else {
        input.style.border = '1px solid #ced4da';
        err.classList.add('d-none');
        return false;
    }
}

function isAgeValid(input, err) {
    return validateInput(input, err, 5, 100, "Тільки пацієнти у віці 5-100 років");
}

function isPressureValid(input, err) {
    return validateInput(input, err, 50, 160, "Введіть значення в межах 50-160");
}

function isIndexValid(input, err) {
    return validateInput(input, err, 10, 50, "Введіть значення в межах 10-50");
}

function validateDate(input, err) {
    const dateInput = document.getElementById("last-visit").value;
    const enteredDate = new Date(dateInput);
    const currentDate = new Date();

    if (enteredDate > currentDate) {
        err.innerText = "Некоректно обрана дата";
        err.classList.remove('d-none');
        input.style.border = '1px solid red';
        return true;
    } else {
        input.style.border = '1px solid #ced4da';
        err.classList.add('d-none');
        return false;
    }
}

export {isAgeValid, isPressureValid, isIndexValid, validateDate};