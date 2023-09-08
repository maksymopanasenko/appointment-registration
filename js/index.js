import openModal from "./functions/openModal.js";

const logInForm = document.querySelector('#formAuthorization'),
    filter = document.querySelector('#filter'),
    btnlogIn = document.querySelector('#logIn');

openModal(btnlogIn, logInForm, filter);