import logIn from "./logIn.js";

const createCard = document.querySelector('#createCard');

function openModal(btn, form) {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('create-btn')) {
            //futher code
        } else {
            form.classList.remove('d-none');
            form.classList.add('d-block');
            logIn(form, btn);
        }
    });
}

export default openModal;