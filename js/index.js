import initialRender from "./functions/initialRender.js";
import openModal from "./functions/openModal.js";

const logInForm = document.querySelector('#formAuthorization'),
      filter = document.querySelector('#filter'),
      btnlogIn = document.querySelector('#logIn');


if (localStorage.getItem('token')) {
    logInForm.style.display = 'none';
    btnlogIn.innerText = 'Створити візит';
    btnlogIn.classList.add('create-btn');
    
    await initialRender();
}


openModal(btnlogIn, logInForm, filter);