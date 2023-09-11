import initialRender from "./functions/initialRender.js";
import openModal from "./functions/openModal.js";





const filter = document.querySelector('#filter'),
      btnlogIn = document.querySelector('#logIn');


if (localStorage.getItem('token')) {
    btnlogIn.innerText = 'Створити візит';
    btnlogIn.classList.add('create-btn');
    
    await initialRender();
}

openModal(btnlogIn, filter);