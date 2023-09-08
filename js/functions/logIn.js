import getToken from "../api/getToken.js";
import getCards from "../api/getCards.js";

const LOGIN_URL = "https://ajax.test-danit.com/api/v2/cards/login";


async function logIn(form, btn, filter) {

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
            filter.classList.remove('d-none')
            filter.classList.add('d-block')
            btn.innerText = 'Створити візит';
            btn.classList.add('create-btn');

            const cards = await getCards();
            
            if(cards.length !== 0) {
                //render instances of class
                document.getElementById('root').innerHTML = '';
            }
        };

        target.reset();
    });
}

export default logIn;