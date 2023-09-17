function isAgeValid(input) {
    if (!input.value || !Number.isInteger(+input.value)) {
        console.log(input.value);
        input.value = "Введіть числове значення";
        input.style.border = '1px solid red';
        return true;
    } else if (input.value < 5) {
        input.value = "Діти лише від 5 років";
        input.style.border = '1px solid red';
        return true;
    } else if (input.value > 100) {
        input.value = "Обмеження для вводу - 100 років";
        input.style.border = '1px solid red';
        return true;
    } else {
        input.style.border = '1px solid #ced4da';
        return false;
    }
}

export {isAgeValid};