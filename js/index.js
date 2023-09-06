import logIn from "./functions/logIn.js";

const logInForm = document.querySelector('form');

const LOGIN_URL = "https://ajax.test-danit.com/api/v2/cards/login";


logIn(LOGIN_URL, logInForm);