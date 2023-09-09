import getToken from "../api/getToken.js";
import initialRender from "./initialRender.js";

const LOGIN_URL = "https://ajax.test-danit.com/api/v2/cards/login";

async function logIn(btn, filter) {
    const logInForm = document.querySelector('#formAuthorization');

    logInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const target = e.target;
        const body = {};
        
        target.querySelectorAll('input').forEach(input => {
            body[input.name] = input.value; 
        });
        
        const token = await getToken(LOGIN_URL, body);

        if (token) {
            localStorage.setItem('token', token);

            filter.classList.remove('d-none')
            filter.classList.add('d-block')
            btn.innerText = 'Створити візит';
            btn.classList.add('create-btn');
            document.querySelector('.modal').remove();

            await initialRender();
        };

        target.reset();
    });
}

export default logIn;