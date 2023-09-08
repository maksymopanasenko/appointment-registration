import getToken from "../api/getToken.js";

const LOGIN_URL = "https://ajax.test-danit.com/api/v2/cards/login";

function logIn(form, btn) {

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const target = e.target;
        const body = {};
        
        target.querySelectorAll('input').forEach(input => {
            body[input.name] = input.value; 
        });
        
        const token = await getToken(LOGIN_URL, body);

        if (token) {
            localStorage.setItem('token', token);
            
            form.classList.add('d-none');
            btn.innerText = 'Створити візит';
            btn.classList.add('create-btn');
        };

        target.reset();
    });
}

export default logIn;